import express from "express";

import { createComment } from "../controllers/commentControllers";
import { adminGuard, authGuard } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authGuard, createComment);

export default router;
