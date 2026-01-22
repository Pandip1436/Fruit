import dotenv from "dotenv";

dotenv.config({
  path: "D:/learning/Product2/Fruits/backend/.env"
});

console.log("BOOT ENV:", process.env.RAZORPAY_KEY_ID);

// ⬇️ IMPORTANT: dynamic import AFTER env is loaded
await import("./app.js");
