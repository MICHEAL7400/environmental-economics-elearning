// client/src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Quiz = () => {
  const { courseId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/quizzes/${courseId}`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
        // Fallback to mock questions
        setQuestions([
          {
            id: 1,
            question: 'What is environmental economics?',
            options: [
              'The study of how economic activities affect the environment',
              'The study of environmental science only',
              'The study of animal economics',
              'None of the above'
            ],
            correctAnswer: 0
          },
          {
            id: 2,
            question: 'Which of these is an example of an environmental economic policy?',
            options: [
              'Carbon tax',
              'Speed limits',
              'School curriculum',
              'All of the above'
            ],
            correctAnswer: 0
          }
        ]);
      }
    };

    fetchQuestions();
  }, [courseId]);

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
  };

  if (questions.length === 0) {
    return <div className="container">Loading...</div>;
  }

  if (showResult) {
    return (
      <div className="quiz">
        <div className="container">
          <div className="quiz-card">
            <h1>Quiz Completed! 🎉</h1>
            <p>Your score: {score} out of {questions.length}</p>
            <p>Percentage: {((score / questions.length) * 100).toFixed(0)}%</p>
            <button className="nav-button" onClick={handleRestart}>
              Restart Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="quiz">
      <div className="container">
        <h1>Environmental Economics Quiz</h1>
        <div className="quiz-card">
          <div className="quiz-progress">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <div className="quiz-question">{question.question}</div>
          <div className="quiz-options">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`quiz-option ${selectedOption === index ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(index)}
              >
                {option}
              </div>
            ))}
          </div>
          <div className="quiz-navigation">
            <button 
              className="nav-button" 
              onClick={handleNext}
              disabled={selectedOption === null}
            >
              {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;