import quizModel from "../models/quizModel.js";

const createQuiz = (req, res) => {
  const { title, questions } = req.body;
  if (!title || !questions || !questions.length) {
    return res.status(400).json({ error: "Title and questions are required" });
  }

  const quiz = quizModel.createQuiz(title, questions);
  res.status(201).json(quiz);
};

const getQuiz = (req, res) => {
  const quiz = quizModel.getQuiz(req.params.id);
  if (!quiz) {
    return res.status(404).json({ error: "Quiz not found" });
  }
  res.status(200).json(quiz);
};

const submitAnswer = (req, res) => {
  const { quizId, questionId, selectedOption, userId } = req.body;
  const result = quizModel.submitAnswer(
    quizId,
    questionId,
    selectedOption,
    userId
  );

  if (!result) {
    return res.status(404).json({ error: "Quiz or question not found" });
  }

  res.status(200).json(result);
};

const getResult = (req, res) => {
  const { quizId, userId } = req.params;
  const result = quizModel.getResult(quizId, userId);

  if (!result) {
    return res.status(404).json({ error: "Result not found" });
  }
  res.status(200).json(result);
};

export default {
  createQuiz,
  getQuiz,
  submitAnswer,
  getResult,
};
