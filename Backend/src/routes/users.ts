import express, { Request, Response } from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js";
import { IUser, IProfileInfo } from "../types/models.js";

const router = express.Router();

router.get("/", auth, async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/:id", auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    if (
      err instanceof Error &&
      "kind" in err &&
      (err as any).kind === "ObjectId"
    ) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(500).send("Server error");
  }
});

router.put("/profile", auth, async (req: Request, res: Response) => {
  try {
    const currentUser = req.user as IUser;
    const { name, phone, location } = req.body;

    const profileFields: IProfileInfo = {};
    if (name) profileFields.name = name;
    if (phone) profileFields.phone = phone;
    if (location) profileFields.location = location;

    const user = await User.findByIdAndUpdate(
      currentUser._id,
      { $set: { profileInfo: profileFields } },
      { new: true }
    ).select("-password");

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
