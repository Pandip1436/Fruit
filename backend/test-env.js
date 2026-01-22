import dotenv from "dotenv";

dotenv.config({
  path: "D:/learning/Product2/Fruits/backend/.env"
});

console.log("TEST ENV:", process.env.RAZORPAY_KEY_ID);
