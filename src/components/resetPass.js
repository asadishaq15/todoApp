import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";


const PasswordResetForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const auth = getAuth();
  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage("Password reset email sent successfully!");
      })
      .catch((error) => {
        setMessage(`Password reset error: invalid email `);
      });
  };

  return (
    <div className="password-reset-container">
      <h2 className="password-reset-heading">Reset Password</h2>
      {message && <p className="password-reset-message">{message}</p>}
      <input
        className="password-reset-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button
        className="password-reset-button"
        onClick={handleResetPassword}
      >
        Reset Password
      </button>
      <Link className="password-reset-back-link" to="/signin">
        Back to login
      </Link>
    </div>
  );
};

export default PasswordResetForm;
