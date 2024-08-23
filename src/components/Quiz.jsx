import { useState, useEffect, useRef } from "react";
import { questions } from "../db";

// eslint-disable-next-line react/prop-types
function Quiz({ studentInfo, onTestCompleted }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [showReview, setShowReview] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    setStartTime(new Date());
    timerRef.current = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion].selectedOption = selectedOption;

    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption("");
    } else {
      clearInterval(timerRef.current);
      setShowScore(true);
    }
  };

  const getFormattedTime = () => {
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    return `${minutes}m ${seconds}s`;
  };

  const getRating = () => {
    const percentage = (score / questions.length) * 100;

    if (percentage >= 90) {
      return "Excellent";
    } else if (percentage >= 75) {
      return "Very Good";
    } else if (percentage >= 50) {
      return "Good";
    } else {
      return "Needs Improvement";
    }
  };

  useEffect(() => {
    if (showScore) {
      const finalResult = {
        ...studentInfo,
        score,
        wrongAnswers,
        elapsedTime: getFormattedTime(),
        rating: getRating(),
      };
      localStorage.setItem("finalResult", JSON.stringify(finalResult));
    }
  }, [showScore]);

  const handleStartNewTest = () => {
    // Inform parent component to reset state
    onTestCompleted();
  };

  return (
    <div>
      {!showScore && !showReview && (
        <div>
          <h3>Elapsed Time: {getFormattedTime()}</h3>
          <h2>{questions[currentQuestion].question}</h2>
          <div>
            {questions[currentQuestion].options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionChange(option)}
                />
                {option}
              </label>
            ))}
          </div>
          <button onClick={handleNextQuestion} disabled={!selectedOption}>
            Next Question
          </button>
        </div>
      )}
      {showReview ? (
        <div>
          <h2>Review Questions</h2>
          {questions.map((q, index) => (
            <div key={index}>
              <h3>{q.question}</h3>
              <p>Your Answer: {q.selectedOption}</p>
              {q.selectedOption !== q.correctAnswer && (
                <p style={{ color: "red" }}>
                  Correct Answer: {q.correctAnswer}
                </p>
              )}
            </div>
          ))}
          <button onClick={() => setShowReview(false)}>Close Review</button>
          <button onClick={handleStartNewTest}>Start New Test</button>
        </div>
      ) : showScore ? (
        <div>
          <h2>Quiz Completed!</h2>
          <p>
            Your Correct Answers: {score} out of {questions.length}
          </p>
          <p>Number of Mistakes: {wrongAnswers}</p>
          <p>Elapsed Time: {getFormattedTime()}</p>
          <p>Your Rating: {getRating()}</p>
          <button onClick={() => setShowReview(true)}>Review Questions</button>
          <button onClick={handleStartNewTest}>Start New Test</button>
        </div>
      ) : null}
    </div>
  );
}

export default Quiz;
