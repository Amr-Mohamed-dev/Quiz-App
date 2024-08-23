import React, { useState, useEffect } from "react";

const Quiz = ({ studentInfo, onTestCompleted }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const questions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Paris", "Rome"],
      answer: "Paris",
    },
    {
      question: "What is the color of the sky?",
      options: ["Blue", "Green", "Red"],
      answer: "Blue",
    },
  ];

  useEffect(() => {
    setStartTime(Date.now());
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
      setCorrectAnswers(correctAnswers + 1);
    }

    setSelectedAnswer("");
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const finalResult = {
        ...studentInfo,
        score: correctAnswers,
        totalQuestions: questions.length,
        timeElapsed,
      };
      onTestCompleted(finalResult);
    }
  };

  return (
    <div className="quiz-container max-w-xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg text-white">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">
          Question {currentQuestionIndex + 1}
        </h2>
        <p className="text-lg">{questions[currentQuestionIndex].question}</p>
      </div>

      <div className="options mb-6 space-y-4">
        {questions[currentQuestionIndex].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            className={`w-full p-3 rounded-md ${
              selectedAnswer === option
                ? "bg-blue-600"
                : "bg-gray-700 hover:bg-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold">
          Time Elapsed: {timeElapsed} seconds
        </span>
        <button
          onClick={handleNextQuestion}
          className="bg-blue-600 p-3 rounded-md text-white font-semibold hover:bg-blue-700 transition"
        >
          {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
