import { kv } from "@vercel/kv";
import { del } from "@vercel/blob";
import { createHmac, timingSafeEqual } from "crypto";
import { sendApplicationEmail } from "@/lib/sendApplicationEmail";

// Revolut sends files as public URLs — fetch them into Buffers for email attachments
async function fetchFileAsBuffer(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch file from blob: ${url}`);
    const arrayBuffer = await res.arrayBuffer();
    return Buffer.from(new Uint8Array(arrayBuffer));
}



// Verify the Revolut-Signature HMAC-SHA256 header
function verifySignature(rawBody, signatureHeader, secret) {
    // Header format: "v1=<timestamp>.<signature>"
    // Multiple signatures separated by comma are possible
    const parts = signatureHeader.split(",");
    for (const part of parts) {
        const match = part.trim().match(/^v1=(\d+)\.(.+)$/);
        if (!match) continue;
        const [, timestamp, sig] = match;

        // Reject if timestamp is more than 5 minutes old
        const age = Date.now() / 1000 - parseInt(timestamp, 10);
        if (age > 300) {
            console.warn("[webhook] signature timestamp too old:", age, "seconds");
            continue;
        }

        const payload = `${timestamp}.${rawBody}`;
        const expected = createHmac("sha256", secret).update(payload).digest("hex");

        try {
            if (timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
                return true;
            }
        } catch {
            // timingSafeEqual throws if buffers have different lengths
        }
    }
    return false;
}

export async function POST(request) {
    try {
        const rawBody = await request.text();
        const signatureHeader = request.headers.get("Revolut-Signature") || "";

        // ── Signature verification ─────────────────────────────────────────────
        const webhookSecret = process.env.REVOLUT_WEBHOOK_SECRET;
        if (!webhookSecret) {
            console.error("[webhook] REVOLUT_WEBHOOK_SECRET not set");
            return new Response("Webhook not configured", { status: 500 });
        }

        if (!verifySignature(rawBody, signatureHeader, webhookSecret)) {
            console.warn("[webhook] invalid signature — ignoring");
            return new Response("Unauthorized", { status: 401 });
        }

        const event = JSON.parse(rawBody);
        console.log("[webhook] event type:", event.event);

        // ── Only handle ORDER_COMPLETED ────────────────────────────────────────
        if (event.event !== "ORDER_COMPLETED") {
            return new Response("OK", { status: 200 });
        }

        const order = event.order;
        const pendingId = order?.merchant_order_ext_ref;

        if (!pendingId) {
            console.warn("[webhook] no merchant_order_ext_ref on order:", order?.id);
            return new Response("OK", { status: 200 });
        }

        // ── Look up pending application ────────────────────────────────────────
        const raw = await kv.get(`pending:${pendingId}`);
        if (!raw) {
            // Already processed (webhook fired twice or verify-and-submit ran first)
            console.log("[webhook] pending app not found (already processed?):", pendingId);
            return new Response("OK", { status: 200 });
        }

        const app = typeof raw === "string" ? JSON.parse(raw) : raw;
        console.log("[webhook] processing application for:", app.email);

        // ── Build email attachments from Blob URLs ─────────────────────────────
        const attachments = [];

        if (app.headshotUrl) {
            try {
                const buf = await fetchFileAsBuffer(app.headshotUrl);
                const ext = app.headshotName?.split(".").pop() || "jpg";
                attachments.push({
                    filename: app.headshotName || `headshot.${ext}`,
                    content: buf,
                    contentType: `image/${ext === "jpg" ? "jpeg" : ext}`,
                });
            } catch (e) {
                console.error("[webhook] failed to fetch headshot:", e.message);
            }
        }

        if (app.resumeUrl) {
            try {
                const buf = await fetchFileAsBuffer(app.resumeUrl);
                attachments.push({
                    filename: app.resumeName || "resume.pdf",
                    content: buf,
                    contentType: "application/pdf",
                });
            } catch (e) {
                console.error("[webhook] failed to fetch resume:", e.message);
            }
        }

        // ── Send email + log to Sheets ─────────────────────────────────────────
        await sendApplicationEmail({
            name: app.name,
            email: app.email,
            phone: app.phone,
            city: app.city,
            nationality: app.nationality,
            passportNumber: app.passportNumber,
            dob: app.dob,
            gender: app.gender,
            isStudent: app.isStudent,
            hasVolunteerExp: app.hasVolunteerExp,
            organizations: app.organizations,
            statementOfPurpose: app.statementOfPurpose,
            socialCauses: app.socialCauses,
            attachments,
            headshotAttached: !!app.headshotUrl,
            resumeAttached: !!app.resumeUrl,
        });

        // ── Cleanup: delete KV record + Blob files ─────────────────────────────
        await kv.del(`pending:${pendingId}`);
        console.log("[webhook] KV record deleted:", pendingId);

        const blobsToDelete = [app.headshotUrl, app.resumeUrl].filter(Boolean);
        if (blobsToDelete.length > 0) {
            try {
                await del(blobsToDelete);
                console.log("[webhook] blob files deleted:", blobsToDelete.length);
            } catch (e) {
                console.error("[webhook] blob cleanup error:", e.message);
            }
        }

        return new Response("OK", { status: 200 });

    } catch (err) {
        console.error("[revolut-webhook] error:", err.message);
        // Return 200 to prevent Revolut from retrying indefinitely on permanent errors
        return new Response("Error", { status: 500 });
    }
}
