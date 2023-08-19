import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link,  useNavigate } from "react-router-dom";
import { setAuthenticated } from "../actions/todos";
import { browserSessionPersistence } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setPersistence } from "firebase/auth";
import SignIn from "./signInForm";
import { signInWithPopup } from "firebase/auth";
import { provider } from "../firebaseConfig";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // State variable for success message
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGotoLogin = () => {
    navigate("/signin");
 
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User created and signed in successfully
        const user = userCredential.user;
        console.log("Sign Up success:", user);
        
        navigate("/dashboard");
      
       
      
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
    <div className="signup-container">
      <h2 className="signup-heading">Sign Up</h2>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <input
        className="signup-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className="signup-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button className="signup-button" onClick={handleSignUp}>
        Sign Up
      </button>
      <button className="signin-google-button" onClick={handleSignInWithGoogle}>
        Sign up with Google
      </button>
      <Link className="signin-link" to="/signin">
        Already have an account?
      </Link>
    </div>
  );
};

export default SignUp;
