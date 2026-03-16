// Tests that your live webhook endpoint is reachable and signature verification works.
// Run: node test-webhook.mjs

import { createHmac } from "crypto";

const WEBHOOK_SECRET = "wsk_QA4mkRrgAY1993aBttLOruK4ODATayAg";
const WEBHOOK_URL = "https://csyga.org/api/revolut-webhook";

const body = JSON.stringify({
  event: "ORDER_COMPLETED",
  order: {
    id: "test-order-123",
    merchant_order_ext_ref: "test-pending-id-that-does-not-exist",
    state: "COMPLETED",
  },
});

const timestamp = Math.floor(Date.now() / 1000);
const payload = `${timestamp}.${body}`;
const sig = createHmac("sha256", WEBHOOK_SECRET).update(payload).digest("hex");
const signatureHeader = `v1=${timestamp}.${sig}`;

console.log("Sending test webhook to:", WEBHOOK_URL);

const res = await fetch(WEBHOOK_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Revolut-Signature": signatureHeader,
  },
  body,
});

console.log("Status:", res.status);
const text = await res.text();
console.log("Response:", text);

if (res.status === 200) {
  console.log("\n✓ Webhook endpoint is working correctly.");
  console.log("  (The 'pending app not found' message in Vercel logs is expected for this test)");
} else if (res.status === 401) {
  console.log("\n✗ Signature verification failed — check REVOLUT_WEBHOOK_SECRET in Vercel.");
} else {
  console.log("\n✗ Unexpected status. Check Vercel function logs for details.");
}
