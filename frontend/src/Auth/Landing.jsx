import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Student from '../Components/Student';

function Landing({ user, onLogout }) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState({
    opt1: '',
    opt2: '',
    opt3: '',
    opt4: ''
  });
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [newQuestions, setNewQuestions] = useState([]);
  const [existingQuestions, setExistingQuestions] = useState([]); // Initialize as an empty array
  const [finalOptions, setFinaloptions] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8000/quiz')
      .then((response) => {
        console.log(response);
        setExistingQuestions(response.data.questions);
      })
      .catch((error) => {
        console.error('Error loading questions:', error);
      });
  },);

  const handleSaveQuestions = (e) => {
 e.preventDefault();
    axios.post('http://localhost:8000/update_questions', { ...options, opt1: options.opt1, opt2: options.opt2, opt3: options.opt3, opt4: options.opt4, question, correctAnswer })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error('Error saving questions:', error);
      });
  };
  return (
    <div>
      <div className='bg-dark text-light py-3 d-flex align-items-center justify-content-between px-2'>
        <h1 className=''>Welcome, {user.username}!</h1>
        <button className='btn btn-danger' onClick={onLogout}>Log Out</button>
      </div>
      <div className='w-100 d-flex justify-content-center align-items-center p-3 fs-4 fw-bold'>
        User role: {user.role}
      </div>
      {user.role === 'admin' && (
        <div className='p-4 container'>
          <form className='card px-4 py-2 shadow bg-light mb-4'>
            <div>
              <h2>Add New Question</h2>
              <div className='mb-3'>
                <label>Question:</label>
                <input
                  type='text'
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className='form-control'
                />
              </div>
              <div className='mb-3'>
                <label>Options:</label>
                <input type='text' className='form-control mb-1' onChange={e => setOptions({ ...options, opt1: e.target.value })} />
                <input type='text' className='form-control mb-1' onChange={e => setOptions({ ...options, opt2: e.target.value })} />
                <input type='text' className='form-control mb-1' onChange={e => setOptions({ ...options, opt3: e.target.value })} />
                <input type='text' className='form-control mb-1' onChange={e => setOptions({ ...options, opt4: e.target.value })} />
              </div>

            </div>
            <div className='mb-3'>
              <label>Correct Answer:</label>
              <input
                type='text'
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                className='form-control'
              />
            </div>
            <div className='d-flex align-items-center justify-content-start'>
              <button className='btn btn-success ms-3' onClick={handleSaveQuestions}>
                Save Questions
              </button>
            </div>
          </form>
          <h2>Questions</h2>
          <ul>
            {existingQuestions.map((question, index) => (
              <li key={index} className='card bg-light shadow py-2 px-4 mb-3'>
                <div className='alert alert-warning my-0 p-1'>
                  <strong className='p-1'>Question:</strong> {question.question}<br />
                </div>
                <strong className='card-body bg-white'>Options:</strong>
                <ul className='bg-white'>
                  {question.options && question.options.map((opt, i) => (
                    <li key={i} className=''>{opt}</li>
                  ))}
                </ul>
                <div className='card-footer d-flex align-items-center'>
                  <strong className='alert alert-success p-1 my-0 me-3'>Correct Answer is:</strong>
                  {question.answer}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {user.role === 'student' && (
        <Student user={user} onLogout={onLogout}/>
      )}

    </div>
  );
}

export default Landing;
