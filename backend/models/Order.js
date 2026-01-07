import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: String,
  items: Array,
  total: Number,
  payment: String,
  status: { type: String, default: "Pending" },
  date: String
});

export default mongoose.model("Order", orderSchema);
