import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="page-content">
      <h1 className="greeting">Welcome to the Todo App</h1>
      <p>
        Manage your tasks efficiently with this simple todo application built
        with Love.
      </p>
      <p>Here's what you can do:</p>
      <ul>
        <li>Create new tasks and keep track of them.</li>
        <li>Edit or update existing tasks as needed.</li>
        <li>Mark tasks as completed once you're done.</li>
        <li>Delete tasks when they are no longer needed.</li>
      </ul>
      <p>Start organizing your tasks and enhancing your productivity!</p>
      <Link to="/signin">
        <button className="continue-button">Continue Using the App</button>
      </Link>
    </div>
  );
};

export default Home;
