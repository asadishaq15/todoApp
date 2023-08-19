import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, setPersistence } from "firebase/auth";
import { browserSessionPersistence } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setAuthenticated } from "../actions/todos";
import { useDispatch } from "react-redux";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User signed in successfully
        const user = userCredential.user;
        console.log("Sign In success:", user);
   
        navigate("/dashboard");
       
        // Redirect to the dashboard using useNavigate
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        // User signed in with Google successfully
        const user = userCredential.user;
        console.log("Sign In with Google success:", user);
        
        navigate("/dashboard");
       
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="signin-container">
      <h2 className="signin-heading">Sign In</h2>
      {error && <div className="error-message">{error}</div>}
      <input
        className="signin-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className="signin-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className="signin-button" onClick={handleSignIn}>
        Sign In
      </button>
      <button className="signin-google-button" onClick={handleSignInWithGoogle}>
        Sign In with Google
      </button>
      <Link className="reset-password-link" to="/reset-password">
        Forgot Password?
      </Link>
      <br/>
      <Link className="signup-link" to="/signup">
        Don't have an account? Sign Up
      </Link>
    </div>
  );
};

export default SignIn;
