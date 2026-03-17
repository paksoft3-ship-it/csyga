import { kv } from "@vercel/kv";
import { put } from "@vercel/blob";
import { randomUUID } from "crypto";

const REVOLUT_BASE = process.env.REVOLUT_MODE === "sandbox"
    ? "https://sandbox-merchant.revolut.com/api"
    : "https://merchant.revolut.com/api";

export async function POST(request) {
    try {
        const formData = await request.formData();

        const name               = formData.get("name")               || "";
        const email              = formData.get("email")              || "";
        const phone              = formData.get("phone")              || "";
        const city               = formData.get("city")               || "";
        const nationality        = formData.get("nationality")        || "";
        const passportNumber     = formData.get("passportNumber")     || "";
        const dob                = formData.get("dob")                || "";
        const gender             = formData.get("gender")             || "";
        const isStudent          = formData.get("isStudent")          || "";
        const hasVolunteerExp    = formData.get("hasVolunteerExp")    || "";
        const organizations      = formData.get("organizations")      || "";
        const statementOfPurpose = formData.get("statementOfPurpose") || "";
        const socialCauses       = formData.get("socialCauses")      || "";
        const headshotFile       = formData.get("headshot");
        const resumeFile         = formData.get("resume");
        const plan               = formData.get("plan") || "";

        const pendingId = randomUUID();

        // ── Upload files to Vercel Blob ────────────────────────────────────────
        let headshotUrl = null;
        let headshotName = null;
        let resumeUrl = null;
        let resumeName = null;

        if (headshotFile instanceof Blob && headshotFile.size > 0) {
            const ext = headshotFile.name?.split(".").pop() || "jpg";
            const blob = await put(
                `pending/${pendingId}/headshot.${ext}`,
                headshotFile,
                { access: "public", contentType: headshotFile.type || "image/jpeg" }
            );
            headshotUrl = blob.url;
            headshotName = headshotFile.name || `headshot.${ext}`;
            console.log("[blob] headshot uploaded:", headshotUrl);
        }

        if (resumeFile instanceof Blob && resumeFile.size > 0) {
            const ext = resumeFile.name?.split(".").pop() || "pdf";
            const blob = await put(
                `pending/${pendingId}/resume.${ext}`,
                resumeFile,
                { access: "public", contentType: resumeFile.type || "application/pdf" }
            );
            resumeUrl = blob.url;
            resumeName = resumeFile.name || `resume.${ext}`;
            console.log("[blob] resume uploaded:", resumeUrl);
        }

        // ── Store pending application in KV (24hr TTL) ─────────────────────────
        const pendingApp = {
            name, email, phone, city, nationality, passportNumber, dob, gender,
            isStudent, hasVolunteerExp, organizations, statementOfPurpose, socialCauses,
            headshotUrl, headshotName,
            resumeUrl, resumeName,
            plan,
            createdAt: Date.now(),
        };

        await kv.set(`pending:${pendingId}`, JSON.stringify(pendingApp), { ex: 86400 });
        console.log("[kv] stored pending app:", pendingId);

        // ── Create Revolut order ───────────────────────────────────────────────
        const orderRes = await fetch(`${REVOLUT_BASE}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.REVOLUT_API_SECRET}`,
                "Revolut-Api-Version": "2024-09-01",
            },
            body: JSON.stringify({
                amount: plan === "installment" ? 10000 : plan === "access" ? 40000 : plan === "experience" ? 70000 : 999,
                currency: "USD",
                merchant_order_ext_ref: pendingId,
                description: plan === "installment"
                    ? "Digital Diplomacy Summit 2026 — Progressive Enrollment Plan (Step 1)"
                    : plan === "access"
                    ? "Digital Diplomacy Summit 2026 — Summit Access Pass"
                    : plan === "experience"
                    ? "Digital Diplomacy Summit 2026 — Complete Summit Experience"
                    : "Digital Diplomacy Summit 2026 — Istanbul Fully Funded Scholarship",
            }),
        });

        if (!orderRes.ok) {
            const errText = await orderRes.text();
            console.error("[revolut] order creation failed:", errText);
            return Response.json({ success: false, error: "Failed to create payment order." }, { status: 502 });
        }

        const order = await orderRes.json();
        console.log("[revolut] order created:", order.id);

        return Response.json({
            success: true,
            token: order.token,
            orderId: order.id,
            pendingId,
        });

    } catch (err) {
        console.error("[create-revolut-order] error:", err.message);
        return Response.json({ success: false, error: err.message }, { status: 500 });
    }
}
