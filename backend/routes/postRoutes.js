import express from "express";

import {
  createPost,
  deletePost,
  getPost,
  updatePost,
} from "../controllers/postControllers";
import { adminGuard, authGuard } from "../middleware/authMiddleware";
import multer from "../middleware/uploadPictureMiddleware";

const router = express.Router();

router.post("/", authGuard, adminGuard, createPost);
router
  .route("/:slug")
  .put(authGuard, adminGuard, multer.single("file"), updatePost)
  .delete(authGuard, adminGuard, deletePost)
  .get(getPost);

export default router;
