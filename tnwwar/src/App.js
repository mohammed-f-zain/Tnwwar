import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash screen after 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div>
        {showSplash ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h1>HIIIIII</h1>
          </div>
        ) : (
          <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
