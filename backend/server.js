import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
const logger = require("morgan");
import {
  errorResponseHandler,
  invalidPathHandler,
} from "./middleware/errorHandler";

//Routes
import userRoutes from "./routes/userRoutes";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(logger("dev"));

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/users", userRoutes);

app.use(invalidPathHandler);
app.use(errorResponseHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
