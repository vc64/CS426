import express, { Request, Response } from "express";
import User from "../models/User.js";
import auth from "../middleware/auth.js";
import { IUser } from "../types/models.js";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, email, password, userType } = req.body;

    // Check if user exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user
    user = new User({
      username,
      email,
      password,
      userType,
    });

    // Save user to database
    await user.save();

    // Return user ID as auth token (simple approach)
    res.json({
      token: user._id,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        userType: user.userType,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Return user ID as auth token (simple approach)
    res.json({
      token: user._id,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        userType: user.userType,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/me", auth, async (req: Request, res: Response) => {
  try {
    // User is guaranteed to exist due to auth middleware
    const currentUser = req.user as IUser;

    // Get user from database (exclude password)
    const user = await User.findById(currentUser._id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;
