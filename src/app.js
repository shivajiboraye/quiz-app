import express from "express";
import quizRoutes from "./routes/quizRoutes.js";

const app = express();
app.use(express.json());
app.use("/api", quizRoutes);

export default app;
