import { kv } from "@vercel/kv";
import { del } from "@vercel/blob";
import { sendApplicationEmail } from "@/lib/sendApplicationEmail";

const REVOLUT_BASE = process.env.REVOLUT_MODE === "sandbox"
    ? "https://sandbox-merchant.revolut.com/api"
    : "https://merchant.revolut.com/api";

async function fetchFileAsBuffer(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch file from blob: ${url}`);
    const arrayBuffer = await res.arrayBuffer();
    return Buffer.from(new Uint8Array(arrayBuffer));
}

export async function POST(request) {
    try {
        const { orderId, pendingId } = await request.json();

        if (!orderId || !pendingId) {
            return Response.json({ success: false, error: "Missing orderId or pendingId." }, { status: 400 });
        }

        // ── Verify order state with Revolut ───────────────────────────────────
        const orderRes = await fetch(`${REVOLUT_BASE}/orders/${orderId}`, {
            headers: {
                "Authorization": `Bearer ${process.env.REVOLUT_API_SECRET}`,
                "Revolut-Api-Version": "2024-09-01",
            },
        });

        if (!orderRes.ok) {
            const errText = await orderRes.text();
            console.error("[verify] Revolut order fetch failed:", errText);
            return Response.json({ success: false, error: "Could not verify payment." }, { status: 502 });
        }

        const order = await orderRes.json();
        console.log("[verify] order state:", order.state, "id:", orderId);

        if (order.state !== "COMPLETED") {
            return Response.json({ success: false, error: `Payment not completed. State: ${order.state}` }, { status: 402 });
        }

        // ── Look up pending application ────────────────────────────────────────
        const raw = await kv.get(`pending:${pendingId}`);
        if (!raw) {
            // Webhook already processed this — still return success to the user
            console.log("[verify] pending app already processed:", pendingId);
            return Response.json({ success: true, alreadyProcessed: true });
        }

        const app = typeof raw === "string" ? JSON.parse(raw) : raw;
        console.log("[verify] processing application for:", app.email);

        // ── Build email attachments ────────────────────────────────────────────
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
                console.error("[verify] failed to fetch headshot:", e.message);
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
                console.error("[verify] failed to fetch resume:", e.message);
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

        // ── Cleanup ────────────────────────────────────────────────────────────
        await kv.del(`pending:${pendingId}`);
        console.log("[verify] KV record deleted:", pendingId);

        const blobsToDelete = [app.headshotUrl, app.resumeUrl].filter(Boolean);
        if (blobsToDelete.length > 0) {
            try {
                await del(blobsToDelete);
                console.log("[verify] blob files deleted:", blobsToDelete.length);
            } catch (e) {
                console.error("[verify] blob cleanup error:", e.message);
            }
        }

        return Response.json({ success: true });

    } catch (err) {
        console.error("[verify-and-submit] error:", err.message);
        return Response.json({ success: false, error: err.message }, { status: 500 });
    }
}
