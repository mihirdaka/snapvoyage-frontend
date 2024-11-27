import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Updated for React Router v6
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';  // Updated for Firebase v9+
//import './Login.css'; // Add your CSS if any
import '../styles/auth.css';
import PinterestLoginButton from '../components/PinterestLoginButton.js';


const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate for page navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleFirebaseLogin = async (e) => {
    e.preventDefault();

    const auth = getAuth(); // Initialize Firebase Auth

    try {
      // Attempt to log in the user
      await signInWithEmailAndPassword(auth, email, password);
      // If login is successful, redirect to dashboard (or other page)
      navigate('/dashboard');
    } catch (error) {
      // Handle any errors during login (e.g., incorrect credentials)
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login to SnapVoyage Via Pinterest</h2>
      {error && <p className="error-message">{error}</p>}
      <PinterestLoginButton />
      {/* <form onSubmit={handleFirebaseLogin}>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
       

        {/* <button type="submit" className="login-btn">Login</button> */}
    
       <p>Don't have an account? <a href="/register">Sign up</a></p>
    </div>
  );
};

export default Login;
