import { google } from "googleapis";
import nodemailer from "nodemailer";
import { Readable } from "stream";

const SHEET_HEADERS = [
    "Timestamp",
    "Full Name",
    "Email",
    "Phone",
    "City",
    "Nationality",
    "Passport / ID No.",
    "Date of Birth",
    "Gender",
    "Currently a Student?",
    "Volunteer Experience?",
    "Organizations",
    "Social Causes",
    "Statement of Purpose",
    "Headshot Attached",
    "Resume Attached",
];

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

// ─── Google Sheets (optional – only runs if service account is configured) ────
function isGoogleConfigured() {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "";
    return email && !email.includes("your-service-account");
}

function getGoogleAuth() {
    return new google.auth.JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
}

async function ensureHeaders(sheets, sheetId) {
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: "Sheet1!A1:P1",
    });
    const firstRow = res.data.values?.[0];
    if (!firstRow || firstRow.length === 0) {
        await sheets.spreadsheets.values.update({
            spreadsheetId: sheetId,
            range: "Sheet1!A1",
            valueInputOption: "RAW",
            requestBody: { values: [SHEET_HEADERS] },
        });
    }
}

async function appendToSheet(auth, sheetId, row) {
    const sheets = google.sheets({ version: "v4", auth });
    await ensureHeaders(sheets, sheetId);
    await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: "Sheet1!A:P",
        valueInputOption: "RAW",
        requestBody: { values: [row] },
    });
}

// ─── Main handler ─────────────────────────────────────────────────────────────
export async function POST(request) {
    const errors = [];

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
        const socialCauses       = formData.get("socialCauses")       || "";
        const headshot           = formData.get("headshot");
        const resume             = formData.get("resume");

        // Build email attachments from uploaded files
        const attachments = [];

        if (headshot && headshot.size > 0) {
            const buffer = await headshot.arrayBuffer();
            attachments.push({
                filename: headshot.name,
                content: Buffer.from(buffer),
                contentType: headshot.type || "application/octet-stream",
            });
        }

        if (resume && resume.size > 0) {
            const buffer = await resume.arrayBuffer();
            attachments.push({
                filename: resume.name,
                content: Buffer.from(buffer),
                contentType: resume.type || "application/octet-stream",
            });
        }

        // Guard: Gmail credentials must be set
        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
            return Response.json(
                { success: false, error: "Email service is not configured. Please contact the administrator." },
                { status: 500 }
            );
        }

        // Send full application email with files attached
        try {
            const transporter = getTransporter();
            await transporter.verify(); // confirm credentials work before sending
            await transporter.sendMail({
                from: `"CSYGA Applications" <${process.env.GMAIL_USER}>`,
                to: process.env.GMAIL_USER,
                replyTo: email,
                subject: `New Application – ${name}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; color: #111;">
                        <div style="background: #195eb3; padding: 24px 32px; border-radius: 8px 8px 0 0;">
                            <h1 style="color: #fff; margin: 0; font-size: 22px;">New Application Received</h1>
                        </div>
                        <div style="border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px; padding: 32px;">

                            <h2 style="color: #195eb3; margin-top: 0;">Personal Information</h2>
                            <table style="width:100%; border-collapse:collapse;">
                                <tr><td style="padding:8px 0;font-weight:bold;width:200px;">Full Name</td><td style="padding:8px 0;">${name}</td></tr>
                                <tr style="background:#f6f7f8;"><td style="padding:8px 4px;font-weight:bold;">Email</td><td style="padding:8px 4px;">${email}</td></tr>
                                <tr><td style="padding:8px 0;font-weight:bold;">Phone</td><td style="padding:8px 0;">${phone}</td></tr>
                                <tr style="background:#f6f7f8;"><td style="padding:8px 4px;font-weight:bold;">City</td><td style="padding:8px 4px;">${city}</td></tr>
                                <tr><td style="padding:8px 0;font-weight:bold;">Nationality</td><td style="padding:8px 0;">${nationality}</td></tr>
                                <tr style="background:#f6f7f8;"><td style="padding:8px 4px;font-weight:bold;">Passport / ID No.</td><td style="padding:8px 4px;">${passportNumber}</td></tr>
                                <tr><td style="padding:8px 0;font-weight:bold;">Date of Birth</td><td style="padding:8px 0;">${dob}</td></tr>
                                <tr style="background:#f6f7f8;"><td style="padding:8px 4px;font-weight:bold;">Gender</td><td style="padding:8px 4px;">${gender}</td></tr>
                            </table>

                            <h2 style="color: #195eb3; margin-top: 28px;">Journey & Impact</h2>
                            <table style="width:100%; border-collapse:collapse;">
                                <tr><td style="padding:8px 0;font-weight:bold;width:200px;">Currently a Student?</td><td style="padding:8px 0;">${isStudent}</td></tr>
                                <tr style="background:#f6f7f8;"><td style="padding:8px 4px;font-weight:bold;">Volunteer Experience?</td><td style="padding:8px 4px;">${hasVolunteerExp}</td></tr>
                                ${organizations ? `<tr><td style="padding:8px 0;font-weight:bold;">Organizations</td><td style="padding:8px 0;">${organizations}</td></tr>` : ""}
                                <tr style="background:#f6f7f8;"><td style="padding:8px 4px;font-weight:bold;vertical-align:top;">Social Causes</td><td style="padding:8px 4px;">${socialCauses}</td></tr>
                            </table>

                            <h2 style="color: #195eb3; margin-top: 28px;">Statement of Purpose</h2>
                            <p style="background:#f6f7f8;padding:16px;border-radius:6px;line-height:1.6;">${statementOfPurpose}</p>

                            ${attachments.length > 0
                                ? `<p style="color:#555;margin-top:16px;">
                                    <strong>Attached files (${attachments.length}):</strong>
                                    ${attachments.map(a => a.filename).join(", ")}
                                   </p>`
                                : `<p style="color:#999;margin-top:16px;">No files attached.</p>`
                            }

                            <hr style="border:none;border-top:1px solid #e0e0e0;margin:28px 0;" />
                            <p style="color:#888;font-size:13px;">Automatically generated from the CSYGA application form.</p>
                        </div>
                    </div>
                `,
                attachments,
            });
        } catch (err) {
            console.error("Gmail error:", err);
            return Response.json(
                { success: false, error: "Failed to send email: " + err.message },
                { status: 500 }
            );
        }

        // Save to Google Sheets (only if service account is configured)
        if (isGoogleConfigured()) {
            try {
                const auth = getGoogleAuth();
                const timestamp = new Date().toLocaleString("en-GB", { timeZone: "UTC" }) + " UTC";
                await appendToSheet(auth, process.env.GOOGLE_SHEET_ID, [
                    timestamp, name, email, phone, city, nationality,
                    passportNumber, dob, gender, isStudent, hasVolunteerExp,
                    organizations, socialCauses, statementOfPurpose,
                    headshot?.size > 0 ? "Yes" : "No",
                    resume?.size > 0 ? "Yes" : "No",
                ]);
            } catch (err) {
                errors.push("Sheets append failed: " + err.message);
                console.error("Sheets error:", err);
            }
        }

        return Response.json({ success: true, errors });

    } catch (err) {
        console.error("API error:", err);
        return Response.json({ success: false, error: err.message }, { status: 500 });
    }
}
