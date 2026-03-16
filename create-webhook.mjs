// Run with: node create-webhook.mjs
// Replace the key below with your NEW Production secret key

const SECRET_KEY = "sk_43fa7VEUU9BPR-qdCmTDAOIzBsp7bjVVt4NIoqkRl6v_2e0XOdl8mB50QhhrwlD_";

const res = await fetch("https://merchant.revolut.com/api/1.0/webhooks", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${SECRET_KEY}`,
    "Content-Type": "application/json",
  },


  body: JSON.stringify({
    url: "https://csyga.org/api/revolut-webhook",
    events: ["ORDER_COMPLETED"],
  }),
});

const data = await res.json();
console.log("Status:", res.status);
console.log("Response:", JSON.stringify(data, null, 2));
