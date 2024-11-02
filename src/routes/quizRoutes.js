import express from "express";
import quizController from "../controllers/quizController.js";

const router = express.Router();

router.post("/quizzes", quizController.createQuiz);
router.get("/quizzes/:id", quizController.getQuiz);
router.post("/quizzes/submit", quizController.submitAnswer);
router.get("/quizzes/:quizId/results/:userId", quizController.getResult);

export default router;
