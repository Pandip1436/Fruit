import express from "express";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

const router = express.Router();

/* ADMIN DASHBOARD STATS */
router.get("/stats", async (req, res) => {
  try {
    const users = await User.countDocuments();
    const products = await Product.countDocuments();
    const orders = await Order.countDocuments();

    const revenueAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);

    const revenue = revenueAgg[0]?.total || 0;

    res.json({
      users,
      products,
      orders,
      revenue
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to load stats" });
  }
});

export default router;
