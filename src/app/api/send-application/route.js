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
    "Headshot (Drive Link)",
    "Resume (Drive Link)",
];

function getGoogleAuth() {
    return new google.auth.JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        scopes: [
            "https://www.googleapis.com/auth/spreadsheets",
            "https://www.googleapis.com/auth/drive.file",
        ],
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

async function uploadToDrive(drive, file, folderId) {
    const buffer = await file.arrayBuffer();
    const stream = Readable.from(Buffer.from(buffer));

    const response = await drive.files.create({
        requestBody: {
            name: file.name,
            parents: [folderId],
        },
        media: {
            mimeType: file.type || "application/octet-stream",
            body: stream,
        },
        fields: "id, webViewLink",
    });

    // Make file readable by anyone with the link
    await drive.permissions.create({
        fileId: response.data.id,
        requestBody: { role: "reader", type: "anyone" },
    });

    return response.data.webViewLink;
}

async function appendToSheet(sheets, sheetId, row) {
    await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: "Sheet1!A:P",
        valueInputOption: "RAW",
        requestBody: { values: [row] },
    });
}

async function sendNotification(name, email, sheetId) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

    const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}`;

    await transporter.sendMail({
        from: `"CSYGA Applications" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        subject: `New Application – ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px;">
                <div style="background: #195eb3; padding: 20px 28px; border-radius: 8px 8px 0 0;">
                    <h2 style="color: #fff; margin: 0;">New Application Received</h2>
                </div>
                <div style="border: 1px solid #e0e0e0; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
                    <p style="margin: 0 0 8px;"><strong>Name:</strong> ${name}</p>
                    <p style="margin: 0 0 20px;"><strong>Email:</strong> ${email}</p>
                    <a href="${sheetUrl}"
                       style="background: #2ec27e; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
                        View All Applications →
                    </a>
                    <p style="color: #888; font-size: 12px; margin-top: 20px;">
                        Files (headshot & resume) are saved in your Google Drive folder.
                    </p>
                </div>
            </div>
        `,
    });
}

export async function POST(request) {
    const errors = [];

    try {
        const formData = await request.formData();

        const name              = formData.get("name")              || "";
        const email             = formData.get("email")             || "";
        const phone             = formData.get("phone")             || "";
        const city              = formData.get("city")              || "";
        const nationality       = formData.get("nationality")       || "";
        const passportNumber    = formData.get("passportNumber")    || "";
        const dob               = formData.get("dob")               || "";
        const gender            = formData.get("gender")            || "";
        const isStudent         = formData.get("isStudent")         || "";
        const hasVolunteerExp   = formData.get("hasVolunteerExp")   || "";
        const organizations     = formData.get("organizations")     || "";
        const statementOfPurpose = formData.get("statementOfPurpose") || "";
        const socialCauses      = formData.get("socialCauses")      || "";
        const headshot          = formData.get("headshot");
        const resume            = formData.get("resume");

        const auth  = getGoogleAuth();
        const drive = google.drive({ version: "v3", auth });
        const sheets = google.sheets({ version: "v4", auth });

        const sheetId   = process.env.GOOGLE_SHEET_ID;
        const folderId  = process.env.GOOGLE_DRIVE_FOLDER_ID;

        // Upload files to Google Drive
        let headshotLink = "";
        let resumeLink   = "";

        if (headshot && headshot.size > 0) {
            try {
                headshotLink = await uploadToDrive(drive, headshot, folderId);
            } catch (err) {
                errors.push("Headshot upload failed: " + err.message);
            }
        }

        if (resume && resume.size > 0) {
            try {
                resumeLink = await uploadToDrive(drive, resume, folderId);
            } catch (err) {
                errors.push("Resume upload failed: " + err.message);
            }
        }

        // Append row to Google Sheets
        const timestamp = new Date().toLocaleString("en-GB", { timeZone: "UTC" }) + " UTC";
        const row = [
            timestamp,
            name,
            email,
            phone,
            city,
            nationality,
            passportNumber,
            dob,
            gender,
            isStudent,
            hasVolunteerExp,
            organizations,
            socialCauses,
            statementOfPurpose,
            headshotLink,
            resumeLink,
        ];

        try {
            await ensureHeaders(sheets, sheetId);
            await appendToSheet(sheets, sheetId, row);
        } catch (err) {
            errors.push("Sheets append failed: " + err.message);
            console.error("Sheets error:", err);
        }

        // Send Gmail notification
        try {
            await sendNotification(name, email, sheetId);
        } catch (err) {
            errors.push("Gmail notification failed: " + err.message);
            console.error("Gmail error:", err);
        }

        return Response.json({ success: true, errors });

    } catch (err) {
        console.error("API error:", err);
        return Response.json({ success: false, error: err.message }, { status: 500 });
    }
}
