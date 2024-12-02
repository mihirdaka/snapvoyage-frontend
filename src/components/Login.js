import React, { useEffect, useState } from 'react';
import '../styles/auth.css';
import PinterestLoginButton from '../components/PinterestLoginButton';

const Login = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode state from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    document.body.classList.toggle('dark-mode', savedMode);
  }, []);

  // Toggle dark mode and save the state to localStorage
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle('dark-mode', newMode);
    localStorage.setItem('darkMode', newMode); // Persist state
  };

  return (
    <div className="login-page">
      {/* Dark Mode Toggle Button Outside the Container */}
      <div className="dark-mode-switch">
        <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span className="slider"></span>
        </label>
      </div>

      {/* Login Container */}
      <div className="login-container">
        {/* App Name Inside the Container */}
        <header className="app-header">
          <h1>SnapVoyage</h1>
        </header>

        {/* Login Button */}
        <PinterestLoginButton />
      </div>

      {/* Footer Outside the Container */}
      <footer className="app-footer">
        <p>&copy; 2024 SnapVoyage. All Rights Reserved.</p>
        <p>
          <a href="#">Pinterest</a> | <a href="#">Terms of Use</a> | <a href="#">Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
};

export default Login;
