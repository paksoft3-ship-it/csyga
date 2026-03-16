# Revolut Merchant Dashboard — Setup Guide
### For: CSYGA Website Payment Integration
### Domain: csyga.org

This guide walks you through 3 short tasks inside your Revolut Business account.
Each task takes about 2 minutes. No technical knowledge needed.

---

## Before You Start

Make sure you are logged into your **Revolut Business** account at:
> https://business.revolut.com

Then click **"Merchant"** in the left sidebar (or top navigation) to open the Merchant panel.

---

---

## TASK 1 — Add the Webhook URL

> **What this does:** Revolut will automatically notify your website the moment a payment is completed. This is what triggers the confirmation email to be sent.

### Steps:

1. In the left sidebar of the Merchant panel, click **"Developers"**

2. In the Developers section, click **"Webhooks"**

3. Click the button **"Add webhook"** (or **"+ New webhook"**)

4. You will see a form. Fill it in as follows:

   | Field | Value to enter |
   |-------|---------------|
   | **Webhook URL** | `https://csyga.org/api/revolut-webhook` |
   | **Events** | Tick / select **`ORDER_COMPLETED`** |

5. Click **"Save"** or **"Create"**

6. The webhook will now appear in the list. **Click on it to open it.**

7. You will see a field called **"Signing Secret"** (sometimes shown as a long string starting with `whs_...`)

   > ⚠️ **This is important — you need to copy this value and send it to your developer.**

8. Click **"Reveal"** or the eye icon next to it, then **copy the full value**

9. **Send that copied value** to your developer so they can add it to the website settings.
   Tell them: *"This is the REVOLUT_WEBHOOK_SECRET"*

---

---

## TASK 2 — Allow Your Website Domain for the Payment Widget

> **What this does:** Revolut's payment popup only works on websites you have explicitly approved. This step gives your website permission to open the payment window.

### Steps:

1. In the left sidebar, click **"Developers"**

2. Look for a tab or section called **"Payment Widget"** or **"Web SDK"**
   *(it may also appear under "Integrations" → "Payment Widget")*

3. Find the field labelled **"Allowed domains"** or **"Allowed origins"**

4. Click **"Add domain"** (or the **+** button)

5. Enter exactly:
   ```
   csyga.org
   ```

6. Click **"Save"** or **"Add"**

   > If there is a field asking for both `www` and non-`www`, add both:
   > - `csyga.org`
   > - `www.csyga.org`

---

---

## TASK 3 — Confirm Your API Key is Active (Quick Check)

> **What this does:** Your developer already has an API key configured. This step just confirms it is the live (production) key, not a test key.

### Steps:

1. In the left sidebar, click **"Developers"**

2. Click **"API Keys"**

3. Look at the list of keys. Your developer is using the key that:
   - Is labelled **"Production"** (NOT Sandbox/Test)
   - Has permissions for **"Merchant"** or **"Payments"**

4. If you see only a Sandbox key, you need to create a Production key:
   - Click **"+ New API Key"**
   - Select type: **"Production"**
   - Copy the key value and send it to your developer labelled: *"This is the REVOLUT_API_SECRET (production)"*

5. If a Production key already exists — no action needed. ✅

---

---

## Summary Checklist

Use this to track what you have done:

- [ ] **Task 1** — Added webhook URL `https://csyga.org/api/revolut-webhook` with event `ORDER_COMPLETED`
- [ ] **Task 1** — Copied the **Signing Secret** (`whs_...`) and sent it to your developer
- [ ] **Task 2** — Added `csyga.org` as an allowed domain in Payment Widget settings
- [ ] **Task 3** — Confirmed a Production API key exists (or created one and sent it to your developer)

---

---

## What to Send Your Developer

After completing the tasks, send your developer the following:

```
REVOLUT_WEBHOOK_SECRET = whs_xxxxxxxxxxxxxxxxxxxxxxxxxx
(only needed if Task 3 required a new key)
REVOLUT_API_SECRET = sk_prod_xxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Need Help?

If you cannot find any of the screens mentioned above, try:
- Searching the Revolut Business help centre at: https://help.revolut.com/business/
- Or contact Revolut Business Support via the chat bubble in the bottom-right of your dashboard
