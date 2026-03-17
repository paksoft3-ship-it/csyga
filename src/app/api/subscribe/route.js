import { google } from "googleapis";
import nodemailer from "nodemailer";

async function appendSubscriber(email) {
    const auth = new google.auth.JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });

    // Check if header row exists
    const existing = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: "Newsletter!A1:A1",
    });
    if (!existing.data.values?.length) {
        await sheets.spreadsheets.values.update({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "Newsletter!A1",
            valueInputOption: "RAW",
            requestBody: { values: [["Timestamp", "Email"]] },
        });
    }

    const timestamp = new Date().toLocaleString("en-GB", { timeZone: "UTC" }) + " UTC";
    await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: "Newsletter!A:B",
        valueInputOption: "RAW",
        requestBody: { values: [[timestamp, email]] },
    });
}

export async function POST(request) {
    try {
        const { email } = await request.json();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return Response.json({ success: false, error: "Invalid email address." }, { status: 400 });
        }

        // Log to Google Sheets
        await appendSubscriber(email);
        console.log("[subscribe] new subscriber:", email);

        // Send confirmation email to subscriber
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: `"CSYGA" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "You're subscribed to CSYGA updates!",
            html: `
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#111;">
                    <div style="background:#195eb3;padding:24px 32px;border-radius:8px 8px 0 0;">
                        <h1 style="color:#fff;margin:0;font-size:22px;">You're subscribed!</h1>
                    </div>
                    <div style="border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px;padding:32px;">
                        <p style="font-size:16px;">Thank you for subscribing to CSYGA updates.</p>
                        <p style="color:#555;font-size:14px;">You'll be the first to hear about our upcoming events, programmes, and strategic insights.</p>
                        <p style="color:#555;font-size:14px;margin-top:28px;">Best regards,<br/><strong>The CSYGA Team</strong></p>
                        <hr style="border:none;border-top:1px solid #e0e0e0;margin:24px 0;"/>
                        <p style="color:#aaa;font-size:11px;">CENTER FOR STRATEGIC YOUTH AND GLOBAL AFFAIRS LTD · Northampton, United Kingdom · Istanbul, Turkiye</p>
                    </div>
                </div>
            `,
        });

        // Notify admin
        await transporter.sendMail({
            from: `"CSYGA Newsletter" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,
            subject: `New Newsletter Subscriber: ${email}`,
            html: `<p>New subscriber: <strong>${email}</strong></p><p>Added to Google Sheets — Newsletter tab.</p>`,
        });

        return Response.json({ success: true });
    } catch (err) {
        console.error("[subscribe] error:", err.message);
        return Response.json({ success: false, error: "Something went wrong. Please try again." }, { status: 500 });
    }
}
