import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cors from "cors";
const logger = require("morgan");
import {
  errorResponseHandler,
  invalidPathHandler,
} from "./middleware/errorHandler";

//Routes
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoures from "./routes/commentRoutes";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use(logger("dev"));

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoures);

app.use(invalidPathHandler);
app.use(errorResponseHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
