import { Router } from "express";
import Post from "../models/Post.js";
import auth from "../middleware/auth.js";

const router = Router();

// Create post
router.post("/", auth, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content || !content.trim()) return res.status(400).json({ message: "Content required" });
    const post = await Post.create({ user: req.user.id, content });
    const populated = await post.populate("user", "name email");
    res.status(201).json(populated);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Get all posts (newest first)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(posts);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Get posts by user
router.get("/user/:id", async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id }).populate("user", "name email").sort({ createdAt: -1 });
    res.json(posts);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
