import React from "react";
import { Link } from "react-router-dom";

const Help = () => {
  return (
    <div className="help-container">
      <h2>Getting Started with the Todo App</h2>
      <p>
        Welcome to the Todo App! This app is designed to help you organize and
        manage your tasks efficiently. Here's a step-by-step guide to using the app:
      </p>
      
      <h3>1. Account Creation or Login</h3>
      <p>
        If you're a new user, start by creating an account:
      </p>
      <ol>
        <li>Click on the "Sign Up" button to create an account.</li>
        <li>Provide your email and choose a secure password.</li>
        <li>Once registered, you can log in with your credentials.</li>
      </ol>
      <p>
        If you already have an account, simply log in with your existing credentials.
      </p>

      <h3>2. Creating a Task</h3>
      <p>To create a new task, follow these steps:</p>
      <ol>
        <li>Click on the "Add Task" button on the dashboard.</li>
        <li>Enter the task description in the input field.</li>
        <li>Click the "Add" button to add the task to your list.</li>
      </ol>

    

      <h3>3. Resetting Your Password</h3>
      <p>If you forget your password, you can reset it:</p>
      <ol>
        <li>Go to the "Reset Password" page from the sign-in screen.</li>
        <li>Enter your email address and click "Reset Password".</li>
        <li>Check your email for instructions on how to reset your password.</li>
      </ol>

      <p>
        That's it! You're ready to start managing your tasks and staying
        organized with the Todo App.
      </p>

      <Link to="/signin" className="back-to-login">
        Back to Login
      </Link>
    </div>
  );
};

export default Help;
