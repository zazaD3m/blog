import express from "express";
import {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  updateProfilePicture,
} from "../controllers/userControllers";
import { authGuard } from "../middleware/authMiddleware";
import multer from "../middleware/uploadPictureMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authGuard, userProfile);
router.put("/updateProfile", authGuard, updateProfile);
router.put(
  "/updateProfilePicture",
  authGuard,
  multer.single("file"),
  updateProfilePicture
);

export default router;
