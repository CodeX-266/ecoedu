import React, { useState } from "react";
import GameCanvas from "./GameCanvas";
import QuizCard3D from "./QuizCard3D";
import ProgressBar from "./ProgressBar";
import ScoreBoard from "./ScoreBoard";

// Mock Quiz Data with 10 questions
const mockQuiz = [
  { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Rome"], correct: 0 },
  { question: "2 + 2 equals?", options: ["3", "4", "5", "6"], correct: 1 },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], correct: 1 },
  { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], correct: 2 },
  { question: "Who wrote 'Romeo and Juliet'?", options: ["Shakespeare", "Dickens", "Hemingway", "Tolkien"], correct: 0 },
  { question: "Which gas do plants absorb?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correct: 1 },
  { question: "What is the square root of 64?", options: ["6", "7", "8", "9"], correct: 2 },
  { question: "Which element has the symbol 'O'?", options: ["Oxygen", "Gold", "Iron", "Helium"], correct: 0 },
  { question: "How many continents are there?", options: ["5", "6", "7", "8"], correct: 2 },
  { question: "Which planet is closest to the Sun?", options: ["Mercury", "Venus", "Earth", "Mars"], correct: 0 }
];

function StudentQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (selected) => {
    if (selected === mockQuiz[currentIndex].correct) {
      setScore(score + 1);
    }
    setCurrentIndex((prev) => Math.min(prev + 1, mockQuiz.length - 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-cyan-900 to-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Quiz Game</h1>

      <ScoreBoard score={score} total={mockQuiz.length} />
      <ProgressBar progress={(currentIndex / mockQuiz.length) * 100} />

      <div className="mt-8 flex justify-center">
        <GameCanvas>
          <QuizCard3D
            question={mockQuiz[currentIndex]}
            onAnswer={handleAnswer}
          />
        </GameCanvas>
      </div>

      {currentIndex === mockQuiz.length - 1 && (
        <p className="mt-6 text-center text-lg">
          Quiz Finished! Your Score: {score}/{mockQuiz.length}
        </p>
      )}
    </div>
  );
}

export default StudentQuiz;
