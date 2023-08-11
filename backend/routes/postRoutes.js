import express from "express";

import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../controllers/postControllers";
import { adminGuard, authGuard } from "../middleware/authMiddleware";
import multer from "../middleware/uploadPictureMiddleware";

const router = express.Router();

router.route("/").post(authGuard, adminGuard, createPost).get(getAllPosts);
router
  .route("/:slug")
  .put(authGuard, adminGuard, multer.single("file"), updatePost)
  .delete(authGuard, adminGuard, deletePost)
  .get(getPost);

export default router;
