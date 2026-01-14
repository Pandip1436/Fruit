import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

/* ---------------- SUBMIT FEEDBACK ---------------- */
router.post("/", async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: "Failed to submit feedback" });
  }
});

/* ---------------- GET APPROVED FEEDBACK ---------------- */
router.get("/", async (req, res) => {
  const feedbacks = await Feedback.find({ approved: true }).sort({ createdAt: -1 });
  res.json(feedbacks);
});

/* ---------------- GET ALL (ADMIN) ---------------- */
router.get("/admin", async (req, res) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 });
  res.json(feedbacks);
});

/* ---------------- APPROVE FEEDBACK ---------------- */
router.put("/:id/approve", async (req, res) => {
  await Feedback.findByIdAndUpdate(req.params.id, { approved: true });
  res.json({ message: "Approved" });
});

/* ---------------- DELETE FEEDBACK ---------------- */
router.delete("/:id", async (req, res) => {
  await Feedback.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
