import React, { useState } from 'react';
import Login from './Auth/Login';
import Landing from './Auth/Landing';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (authenticatedUser) => {
    setUser(authenticatedUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={user ? (
            <Landing user={user} onLogout={handleLogout} />
          ) : (
            <Login onLogin={handleLogin} />
          )} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
