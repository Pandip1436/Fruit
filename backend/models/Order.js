import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: String,
  items: Array,
  shippingAddress: Object,
  total: Number,
  paymentId: String,
  orderId: String,
  signature: String,
  paymentMethod: String,
  payment: Object,
  status: { type: String, default: "Pending" },
  date: String
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
