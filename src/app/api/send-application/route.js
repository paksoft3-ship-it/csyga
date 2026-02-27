import { google } from "googleapis";
import nodemailer from "nodemailer";

const SHEET_HEADERS = [
    "Timestamp", "Full Name", "Email", "Phone", "City", "Nationality",
    "Passport / ID No.", "Date of Birth", "Gender", "Currently a Student?",
    "Volunteer Experience?", "Organizations", "Social Causes",
    "Statement of Purpose", "Headshot Attached", "Resume Attached",
];

// ─── Reliable File → Buffer conversion ───────────────────────────────────────
async function fileToBuffer(file) {
    const arrayBuffer = await file.arrayBuffer();
    return Buffer.from(new Uint8Array(arrayBuffer));
}

// ─── Gmail transporter ────────────────────────────────────────────────────────
function getTransporter() {
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });
}

// ─── Google Sheets (only runs if service account is configured) ───────────────
function isGoogleConfigured() {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "";
    return email && !email.includes("your-service-account");
}

async function appendToSheet(sheetId, row) {
    const auth = new google.auth.JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });

    // Add headers if sheet is empty
    const existing = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId, range: "Sheet1!A1:A1",
    });
    if (!existing.data.values?.length) {
        await sheets.spreadsheets.values.update({
            spreadsheetId: sheetId, range: "Sheet1!A1",
            valueInputOption: "RAW",
            requestBody: { values: [SHEET_HEADERS] },
        });
    }

    await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId, range: "Sheet1!A:P",
        valueInputOption: "RAW",
        requestBody: { values: [row] },
    });
}

// ─── Main handler ─────────────────────────────────────────────────────────────
export async function POST(request) {
    try {
        // Parse form fields
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
        const socialCauses       = formData.get("socialCauses")       || "";
        const headshotFile       = formData.get("headshot");
        const resumeFile         = formData.get("resume");

        // ── Build attachments ──────────────────────────────────────────────────
        const attachments = [];

        if (headshotFile instanceof Blob && headshotFile.size > 0) {
            console.log("[attach] headshot:", headshotFile.name, headshotFile.size, "bytes");
            const buffer = await fileToBuffer(headshotFile);
            console.log("[attach] headshot buffer length:", buffer.length);
            attachments.push({
                filename: headshotFile.name || `headshot-${name.replace(/\s+/g, "-")}.jpg`,
                content: buffer,
                contentType: headshotFile.type || "image/jpeg",
            });
        } else {
            console.log("[attach] no headshot received — type:", typeof headshotFile, "size:", headshotFile?.size);
        }

        if (resumeFile instanceof Blob && resumeFile.size > 0) {
            console.log("[attach] resume:", resumeFile.name, resumeFile.size, "bytes");
            const buffer = await fileToBuffer(resumeFile);
            console.log("[attach] resume buffer length:", buffer.length);
            attachments.push({
                filename: resumeFile.name || `resume-${name.replace(/\s+/g, "-")}.pdf`,
                content: buffer,
                contentType: resumeFile.type || "application/pdf",
            });
        } else {
            console.log("[attach] no resume received — type:", typeof resumeFile, "size:", resumeFile?.size);
        }

        console.log("[attach] total attachments to send:", attachments.length);

        // ── Guard: Gmail credentials ───────────────────────────────────────────
        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
            return Response.json(
                { success: false, error: "Email service is not configured." },
                { status: 500 }
            );
        }

        // ── Send email ─────────────────────────────────────────────────────────
        const transporter = getTransporter();
        await transporter.sendMail({
            from: `"CSYGA Applications" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,
            replyTo: email,
            subject: `New Application – ${name}`,
            html: `
                <div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;color:#111;">
                    <div style="background:#195eb3;padding:24px 32px;border-radius:8px 8px 0 0;">
                        <h1 style="color:#fff;margin:0;font-size:22px;">New Application Received</h1>
                    </div>
                    <div style="border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px;padding:32px;">
                        <h2 style="color:#195eb3;margin-top:0;">Personal Information</h2>
                        <table style="width:100%;border-collapse:collapse;">
                            <tr><td style="padding:8px 0;font-weight:bold;width:200px;">Full Name</td><td>${name}</td></tr>
                            <tr style="background:#f6f7f8;"><td style="padding:8px 4px;font-weight:bold;">Email</td><td>${email}</td></tr>
                            <tr><td style="padding:8px 0;font-weight:bold;">Phone</td><td>${phone}</td></tr>
                            <tr style="background:#f6f7f8;"><td style="padding:8px 4px;font-weight:bold;">City</td><td>${city}</td></tr>
                            <tr><td style="padding:8px 0;font-weight:bold;">Nationality</td><td>${nationality}</td></tr>
                            <tr style="background:#f6f7f8;"><td style="padding:8px 4px;font-weight:bold;">Passport / ID</td><td>${passportNumber}</td></tr>
                            <tr><td style="padding:8px 0;font-weight:bold;">Date of Birth</td><td>${dob}</td></tr>
                            <tr style="background:#f6f7f8;"><td style="padding:8px 4px;font-weight:bold;">Gender</td><td>${gender}</td></tr>
                        </table>

                        <h2 style="color:#195eb3;margin-top:28px;">Journey & Impact</h2>
                        <table style="width:100%;border-collapse:collapse;">
                            <tr><td style="padding:8px 0;font-weight:bold;width:200px;">Currently a Student?</td><td>${isStudent}</td></tr>
                            <tr style="background:#f6f7f8;"><td style="padding:8px 4px;font-weight:bold;">Volunteer Experience?</td><td>${hasVolunteerExp}</td></tr>
                            ${organizations ? `<tr><td style="padding:8px 0;font-weight:bold;">Organizations</td><td>${organizations}</td></tr>` : ""}
                            <tr style="background:#f6f7f8;"><td style="padding:8px 4px;font-weight:bold;vertical-align:top;">Social Causes</td><td>${socialCauses}</td></tr>
                        </table>

                        <h2 style="color:#195eb3;margin-top:28px;">Statement of Purpose</h2>
                        <p style="background:#f6f7f8;padding:16px;border-radius:6px;line-height:1.6;">${statementOfPurpose}</p>

                        <div style="margin-top:20px;padding:12px 16px;border-radius:8px;background:${attachments.length > 0 ? '#e8f5e9' : '#fff3e0'};border:1px solid ${attachments.length > 0 ? '#a5d6a7' : '#ffcc80'};">
                            <strong>${attachments.length > 0 ? `📎 ${attachments.length} file(s) attached:` : '⚠️ No files attached'}</strong>
                            ${attachments.length > 0 ? `<ul style="margin:8px 0 0;padding-left:20px;">${attachments.map(a => `<li>${a.filename} (${a.contentType})</li>`).join("")}</ul>` : ""}
                        </div>

                        <hr style="border:none;border-top:1px solid #e0e0e0;margin:28px 0;" />
                        <p style="color:#888;font-size:13px;">Automatically generated from the CSYGA application form.</p>
                    </div>
                </div>
            `,
            attachments,
        });

        console.log("[email] sent successfully to", process.env.GMAIL_USER);

        // ── Google Sheets (optional) ───────────────────────────────────────────
        if (isGoogleConfigured()) {
            try {
                const timestamp = new Date().toLocaleString("en-GB", { timeZone: "UTC" }) + " UTC";
                await appendToSheet(process.env.GOOGLE_SHEET_ID, [
                    timestamp, name, email, phone, city, nationality,
                    passportNumber, dob, gender, isStudent, hasVolunteerExp,
                    organizations, socialCauses, statementOfPurpose,
                    headshotFile?.size > 0 ? "Yes" : "No",
                    resumeFile?.size > 0 ? "Yes" : "No",
                ]);
            } catch (err) {
                console.error("[sheets] error:", err.message);
                // Don't fail the request over Sheets error
            }
        }

        return Response.json({ success: true });

    } catch (err) {
        console.error("[api] error:", err.message);
        return Response.json({ success: false, error: err.message }, { status: 500 });
    }
}
