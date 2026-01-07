import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

/* CREATE ORDER */
router.post("/", async (req, res) => {
  const order = await Order.create(req.body);
  res.json(order);
});

/* GET ALL ORDERS */
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

/* UPDATE STATUS */
router.put("/:id", async (req, res) => {
  const updated = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(updated);
});

export default router;
