import { v4 as uuidv4 } from "uuid";

const quizzes = new Map();
const results = new Map();

const createQuiz = (title, questions) => {
  const quiz = {
    id: uuidv4(),
    title,
    questions: questions.map((q, index) => ({
      id: uuidv4(),
      text: q.text,
      options: q.options,
      correctOption: q.correctOption,
    })),
  };
  quizzes.set(quiz.id, quiz);
  return quiz;
};

const getQuiz = (quizId) => {
  const quiz = quizzes.get(quizId);
  if (!quiz) return null;

  // Return quiz without the correct answer
  return {
    id: quiz.id,
    title: quiz.title,
    questions: quiz.questions.map(({ id, text, options }) => ({
      id,
      text,
      options,
    })),
  };
};

const submitAnswer = (quizId, questionId, selectedOption, userId) => {
  const quiz = quizzes.get(quizId);
  if (!quiz) return null;

  const question = quiz.questions.find((q) => q.id === questionId);
  if (!question) return null;

  const isCorrect = question.correctOption === selectedOption;
  const answer = { questionId, selectedOption, isCorrect };

  let userResult = results.get(userId + quizId);
  if (!userResult) {
    userResult = { quizId, userId, score: 0, answers: [] };
    results.set(userId + quizId, userResult);
  }

  userResult.answers.push(answer);
  if (isCorrect) userResult.score += 1;

  return { isCorrect, correctOption: question.correctOption };
};

const getResult = (quizId, userId) => {
  return results.get(userId + quizId) || null;
};

export default {
  createQuiz,
  getQuiz,
  submitAnswer,
  getResult,
};
