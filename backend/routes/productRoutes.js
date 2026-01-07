import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

/* GET ALL */
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

/* ADD */
router.post("/", async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// UPDATE PRODUCT
router.put("/:id", async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE ALL PRODUCTS
router.delete("/", async (req, res) => {
  await Product.deleteMany();
  res.json({ success: true });
});
router.get("/featured", async (req, res) => {
  const products = await Product.find().limit(6);
  res.json(products);
});


export default router;
