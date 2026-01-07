import express from "express";
import User from "../models/User.js";

const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

/* LOGIN */
router.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);
  if (!user) return res.status(401).json({ message: "Invalid login" });
  res.json(user);
});



/* GET USERS */
router.get("/", async (req, res) => {
  res.json(await User.find());
});

/* ADD USER (ADMIN) */
router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

/* UPDATE USER */
router.put("/:id", async (req, res) => {
  const updated = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

/* DELETE USER */
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
