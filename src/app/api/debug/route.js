import { kv } from "@vercel/kv";
import { put, del } from "@vercel/blob";
import { google } from "googleapis";
import nodemailer from "nodemailer";

export async function GET() {
    const results = {};

    // ── 1. Environment variables ───────────────────────────────────────────
    results.env = {
        REVOLUT_API_SECRET:           !!process.env.REVOLUT_API_SECRET,
        REVOLUT_MODE:                 process.env.REVOLUT_MODE || "(not set — defaults to prod)",
        KV_REST_API_URL:              !!process.env.KV_REST_API_URL,
        KV_REST_API_TOKEN:            !!process.env.KV_REST_API_TOKEN,
        BLOB_READ_WRITE_TOKEN:        !!process.env.BLOB_READ_WRITE_TOKEN,
        GMAIL_USER:                   process.env.GMAIL_USER || "(not set)",
        GMAIL_APP_PASSWORD:           !!process.env.GMAIL_APP_PASSWORD,
        GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "(not set)",
        GOOGLE_PRIVATE_KEY:           !!process.env.GOOGLE_PRIVATE_KEY,
        GOOGLE_SHEET_ID:              process.env.GOOGLE_SHEET_ID || "(not set)",
    };

    // ── 2. Revolut API ────────────────────────────────────────────────────
    try {
        const base = process.env.REVOLUT_MODE === "sandbox"
            ? "https://sandbox-merchant.revolut.com/api"
            : "https://merchant.revolut.com/api";
        const res = await fetch(`${base}/orders?count=1`, {
            headers: {
                "Authorization": `Bearer ${process.env.REVOLUT_API_SECRET}`,
                "Revolut-Api-Version": "2024-09-01",
            },
        });
        results.revolut = res.ok
            ? { ok: true, status: res.status }
            : { ok: false, status: res.status, body: await res.text() };
    } catch (e) {
        results.revolut = { ok: false, error: e.message };
    }

    // ── 3. KV (Upstash Redis) ─────────────────────────────────────────────
    try {
        await kv.set("debug:test", "ok", { ex: 10 });
        const val = await kv.get("debug:test");
        await kv.del("debug:test");
        results.kv = { ok: val === "ok" };
    } catch (e) {
        results.kv = { ok: false, error: e.message };
    }

    // ── 4. Vercel Blob ────────────────────────────────────────────────────
    try {
        const blob = await put("debug/test.txt", "debug ok", { access: "public", contentType: "text/plain" });
        await del(blob.url);
        results.blob = { ok: true };
    } catch (e) {
        results.blob = { ok: false, error: e.message };
    }

    // ── 5. Gmail (SMTP connect only — no email sent) ──────────────────────
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });
        await transporter.verify();
        results.gmail = { ok: true };
    } catch (e) {
        results.gmail = { ok: false, error: e.message };
    }

    // ── 6. Google Sheets ──────────────────────────────────────────────────
    try {
        const auth = new google.auth.JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });
        const sheets = google.sheets({ version: "v4", auth });
        await sheets.spreadsheets.get({ spreadsheetId: process.env.GOOGLE_SHEET_ID });
        results.googleSheets = { ok: true };
    } catch (e) {
        results.googleSheets = { ok: false, error: e.message };
    }

    // ── Summary ───────────────────────────────────────────────────────────
    const allOk = results.revolut.ok && results.kv.ok && results.blob.ok && results.gmail.ok && results.googleSheets.ok;

    return Response.json({
        summary: allOk ? "✅ All systems OK" : "❌ One or more services failed — check details below",
        results,
    }, { status: 200 });
}
