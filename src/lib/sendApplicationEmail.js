import { google } from "googleapis";
import nodemailer from "nodemailer";

const SHEET_HEADERS = [
    "Timestamp", "Full Name", "Email", "Phone", "City", "Nationality",
    "Passport / ID No.", "Date of Birth", "Gender", "Currently a Student?",
    "Volunteer Experience?", "Organizations", "Social Causes",
    "Statement of Purpose", "Headshot Attached", "Resume Attached",
];

function getTransporter() {
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });
}

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

/**
 * Send application email + confirmation to applicant + log to Google Sheets.
 */
export async function sendApplicationEmail(data) {
    const {
        name, email, phone, city, nationality, passportNumber, dob, gender,
        isStudent, hasVolunteerExp, organizations, statementOfPurpose, socialCauses,
        headshotUrl = null,
        headshotName = null,
        resumeUrl = null,
        resumeName = null,
    } = data;

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        throw new Error("Email service is not configured.");
    }

    const transporter = getTransporter();

    // ── Confirmation email to applicant ───────────────────────────────────
    await transporter.sendMail({
        from: `"CSYGA" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "Your Application Has Been Received — CSYGA Digital Diplomacy Summit 2026",
        html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#111;">
                <div style="background:#195eb3;padding:24px 32px;border-radius:8px 8px 0 0;">
                    <h1 style="color:#fff;margin:0;font-size:22px;">Application Received!</h1>
                </div>
                <div style="border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px;padding:32px;">
                    <p style="font-size:16px;">Dear <strong>${name}</strong>,</p>
                    <p>Thank you for applying to the <strong>Digital Diplomacy Summit 2026</strong> — Istanbul Fully Funded Scholarship programme. Your application and payment have been successfully received.</p>
                    <div style="background:#e8f5e9;border:1px solid #a5d6a7;border-radius:8px;padding:16px;margin:20px 0;">
                        <strong>✅ Application confirmed</strong><br/>
                        <span style="color:#555;font-size:14px;">Our team will review your application and results will be announced after application deadline.</span>
                    </div>
                    <p style="color:#555;font-size:14px;">If you have any questions in the meantime, feel free to reply to this email or contact us at <a href="mailto:info@csyga.org" style="color:#195eb3;">info@csyga.org</a>.</p>
                    <p style="color:#555;font-size:14px;margin-top:28px;">Best regards,<br/><strong>The CSYGA Team</strong></p>
                    <hr style="border:none;border-top:1px solid #e0e0e0;margin:24px 0;"/>
                    <p style="color:#aaa;font-size:11px;">CENTER FOR STRATEGIC YOUTH AND GLOBAL AFFAIRS LTD · Northampton, United Kingdom · Istanbul, Turkiye</p>
                </div>
            </div>
        `,
    });
    console.log("[email] confirmation sent to applicant:", email);

    // ── Internal notification email to admin ──────────────────────────────
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

                    <h2 style="color:#195eb3;margin-top:28px;">Journey &amp; Impact</h2>
                    <table style="width:100%;border-collapse:collapse;">
                        <tr><td style="padding:8px 0;font-weight:bold;width:200px;">Currently a Student?</td><td>${isStudent}</td></tr>
                        <tr style="background:#f6f7f8;"><td style="padding:8px 4px;font-weight:bold;">Volunteer Experience?</td><td>${hasVolunteerExp}</td></tr>
                        ${organizations ? `<tr><td style="padding:8px 0;font-weight:bold;">Organizations</td><td>${organizations}</td></tr>` : ""}
                        <tr style="background:#f6f7f8;"><td style="padding:8px 4px;font-weight:bold;vertical-align:top;">Social Causes</td><td>${socialCauses}</td></tr>
                    </table>

                    <h2 style="color:#195eb3;margin-top:28px;">Statement of Purpose</h2>
                    <p style="background:#f6f7f8;padding:16px;border-radius:6px;line-height:1.6;">${statementOfPurpose}</p>

                    <div style="margin-top:20px;padding:12px 16px;border-radius:8px;background:#e8f5e9;border:1px solid #a5d6a7;">
                        <strong>📎 Uploaded Files:</strong>
                        <ul style="margin:8px 0 0;padding-left:20px;">
                            ${headshotUrl ? `<li>Headshot: <a href="${headshotUrl}">${headshotName || "view file"}</a></li>` : "<li>Headshot: not provided</li>"}
                            ${resumeUrl ? `<li>Resume: <a href="${resumeUrl}">${resumeName || "view file"}</a></li>` : "<li>Resume: not provided</li>"}
                        </ul>
                    </div>
                    <div style="margin-top:12px;padding:12px 16px;border-radius:8px;background:#e3f2fd;border:1px solid #90caf9;">
                        <strong>✅ Payment verified automatically via Revolut Merchant API</strong>
                    </div>

                    <hr style="border:none;border-top:1px solid #e0e0e0;margin:28px 0;" />
                    <p style="color:#888;font-size:13px;">Automatically generated from the CSYGA application form.</p>
                </div>
            </div>
        `,
    });

    console.log("[email] admin notification sent to", process.env.GMAIL_USER);

    if (isGoogleConfigured()) {
        try {
            const timestamp = new Date().toLocaleString("en-GB", { timeZone: "UTC" }) + " UTC";
            await appendToSheet(process.env.GOOGLE_SHEET_ID, [
                timestamp, name, email, phone, city, nationality,
                passportNumber, dob, gender, isStudent, hasVolunteerExp,
                organizations, socialCauses, statementOfPurpose,
                headshotUrl || "No",
                resumeUrl || "No",
            ]);
        } catch (err) {
            console.error("[sheets] error:", err.message);
        }
    }
}
