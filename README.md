# Quiz App API

This is a RESTful API for a quiz application, built with Node.js and Express. The API allows users to create quizzes, answer questions, and retrieve feedback and results.

## Features

- Create a new quiz with multiple questions.
- Fetch a quiz by ID (without revealing the correct answers).
- Submit answers for quiz questions and receive immediate feedback.
- Retrieve results for a specific quiz, including the user's score and answer summary.

## Project Structure

```bash
quiz-app/
├── src/
│ ├── controllers/ # API controllers for handling requests
│ ├── models/ # In-memory data models for quizzes and results
│ ├── routes/ # Define API routes
│ ├── app.js # Express app setup
│ ├── index.js # Entry point of the application
│
├── package.json # Project dependencies and scripts
├── README.md # Project documentation
└── Dockerfile # Docker configuration file (optional)

```

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shivajiboraye/quiz-app.git
   cd quiz-app

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Start the server:

   ```bash
   npm start

   ```

   The server should now be running on http://localhost:3000.

### To run the application using Docker:

1. Build the Docker image:

   ```bash
   docker build -t quiz-app .

   ```

2. Run the Docker container:

   ```bash
   docker run -p 3000:3000 quiz-app

   ```

### API Endpoints

1.  Create a Quiz

    - **Endpoint**: `POST /api/quizzes`
    - **Description**: Create a new quiz with a set of questions.
    - **Request Body**:

      ```bash
      {
        "title": "Sample Quiz",
        "questions": [
            { "text": "What is 2 + 2?", "options": ["1", "2", "3", "4"], "correctOption": 3 },
            { "text": "What is the capital of India?", "options": ["New Delhi", "London", "Paris", "Madrid"], "correctOption": 0 }
        ]
      }

      ```

    - **Response**: `201 Created`

      ```bash
      {
        "id": "quiz_id",
        "title": "Sample Quiz",
        "questions": [
            { "id": "question_id", "text": "What is 2 + 2?", "options": ["1", "2", "3", "4"], "correctOption": 3 },
            { "id": "question_id", "text": "What is the capital of India?", "options": ["New Delhi", "London", "Paris", "Madrid"], "correctOption": 0 }
        ]
      }

      ```

2.  Get Quiz by ID

    - **Endpoint**: `GET /api/quizzes/:id`
    - **Description**: Fetch a quiz by its ID without revealing the correct answers.
    - **Response**: `200 OK`

      ```bash
      {
        "id": "quiz_id",
        "title": "Sample Quiz",
        "questions": [
            { "id": "question_id", "text": "What is 2 + 2?", "options": ["1", "2", "3", "4"] },
            { "id": "question_id", "text": "What is the capital of India?", "options": ["New Delhi", "London", "Paris", "Madrid"] }
        ]
      }

      ```

3.  Submit Answer

    - **Endpoint**: `POST /api/quizzes/submit`
    - **Description**: Submit an answer for a specific question in a quiz.
    - **Request Body**:

      ```bash
      {
        "quizId": "quiz_id",
        "questionId": "question_id",
        "selectedOption": 3,
        "userId": "user123"
      }

      ```

    - **Response**: `200 OK`

      ```bash
      {
        "isCorrect": true,
        "correctOption": 3
      }

      ```

4.  Get Results

    - **Endpoint**: `GET /api/quizzes/:quizId/results/:userId`
    - **Description**: Retrieve results for a specific quiz, including the user's score and answer summary.
    - **Response**: `200 OK`

      ```bash
      {
        "quizId": "quiz_id",
        "userId": "user123",
        "score": 1,
        "answers": [
            { "questionId": "question_id", "selectedOption": 3, "isCorrect": true }
        ]
      }

      ```

### Known Issues and Limitations

- Currently uses in-memory storage for quizzes and results. Restarting the server will reset the data.
- Limited validation for simplicity; consider expanding validation in production.

### License

This project is licensed under the MIT License.

### Author

Created by `Shivaji Boraye`
