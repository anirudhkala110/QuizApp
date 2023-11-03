import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Student({ user, onLogout }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const [questions, setQuestions] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/quiz')
      .then((response) => {
        // Shuffle the questions array to randomize the order
        const shuffledQuestions = shuffleArray(response.data.questions);
        setQuestions(shuffledQuestions);
      })
      .catch((error) => {
        console.error('Error loading questions:', error);
      });
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAnswerQuestion = () => {
    const currentQuestion = questions[questionIndex];
    if (selectedOption === currentQuestion.answer) {
      setCorrectAnswers(correctAnswers + 1);
    }

    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);
      setSelectedOption('');
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    // Shuffle the questions again for a new random order
    const shuffledQuestions = shuffleArray(questions);
    setQuestions(shuffledQuestions);

    setQuestionIndex(0);
    setSelectedOption('');
    setCorrectAnswers(0);
    setQuizFinished(false);
  };

  return (
    <div>
      {user.role === 'student' && !quizFinished && questions.length > 0 && (
        <div className='p-4 container vh-100' style={{ maxWidth: "800px", maxHeight: "600px", height: "50vh" }}>
          <h2>Question {questionIndex + 1} of {questions.length}</h2>
          <div className='card bg-light shadow py-2 px-4 mb-3'>
            <div className='alert alert-warning my-0 p-1'>
              <strong className='p-1'>Question:</strong> {questions[questionIndex].question}<br />
            </div>
            <strong className='card-body bg-white'>Options:</strong>
            <ul className='bg-white'>
              {questions[questionIndex].options && questions[questionIndex].options.map((opt, i) => (
                <li key={i} className=''>
                  <input
                    type='radio'
                    name='option'
                    value={opt}
                    checked={selectedOption === opt}
                    onChange={() => setSelectedOption(opt)}
                  />
                  {opt}
                </li>
              ))}
            </ul>
            <button className='btn btn-primary' onClick={handleAnswerQuestion}>
              Next
            </button>
          </div>
        </div>
      )}
      {quizFinished && (
        <div className='p-4 container'>
          <h2>Quiz Finished</h2>
          <p>Your Score: {correctAnswers} / {questions.length}</p>
          <button className='btn btn-primary' onClick={handleRestartQuiz}>
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default Student;
