import React, { useState } from "react";
import { auth, db } from "../services/authService"; // Ensure correct import
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import '../styles/auth.css';
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [facebookId, setFacebookId] = useState("");
  const [consent, setConsent] = useState(false);

  const navigate = useNavigate(); // Navigation hook for redirection

  // Handle user registration
  const handleSignUp = (e) => {
    e.preventDefault();

    if (!consent) {
      alert("You must consent to the terms and conditions.");
      return;
    }

    // Register user with email and password using Firebase Authentication
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User registered:", user);

        // Store additional user data (name, email, facebookId) in Firestore
        return setDoc(doc(db, "users", user.uid), {
          name,
          email,
          facebookId,
        });
      })
      .then(() => {
        // After storing user data in Firestore, show success alert
        alert("User registered successfully!");
        setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error during registration:", errorCode, errorMessage);
        alert(`Error during registration: ${errorMessage}`);
      });
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Facebook ID"
          value={facebookId}
          onChange={(e) => setFacebookId(e.target.value)}
        />
        <div className="consent">
          <input
            type="checkbox"
            id="consent"
            checked={consent}
            onChange={() => setConsent(!consent)}
          />
          <label htmlFor="consent">
            I consent to the terms and conditions
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
