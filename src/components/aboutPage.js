import React from "react";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div className="page-content">
      <h1>About Todo App</h1>
      <p>
        The Todo App is a simple yet powerful tool designed to help you stay
        organized and manage your tasks efficiently.
      </p>
      <p>
        With the Todo App, you can create, track, and prioritize your tasks to
        ensure that you never miss an important deadline or forget a crucial
        to-do item again.
      </p>
      <h2>Key Features</h2>
      <ul>
        <li>Create new todo items quickly and easily.</li>
        <li>Edit and update existing todo items to reflect changes.</li>
        <li>Delete completed or unnecessary todo items.</li>
        <li>Mark tasks as completed to track your progress.</li>
        <li>Intuitive and user-friendly interface for seamless task management.</li>
      </ul>
      <h2>Who Can Benefit</h2>
      <p>
        Whether you're a student juggling assignments, a professional managing
        projects, or anyone looking to streamline your daily tasks, the Todo App
        is here to help you stay productive and organized.
      </p>
      <p>Start managing your todos with ease and enhance your day-to-day productivity!</p>
      <Link to="/signin">
        <button className="continue-button">Start Using App Now!</button>
      </Link>
    </div>
  );
};

export default About;
