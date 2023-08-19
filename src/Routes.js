import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import { setAuthenticated } from "./actions/todos";
import SignInForm from "./components/signInForm";
import SignUpForm from "./components/signUpForm";
import ProfileForm from "./components/profileForm";
import Home from "./components/home";
import About from "./components/aboutPage";
import SideDrawerButton from "./components/sideDrawerButton";
import SideDrawer from "./components/showSideDrawer";
import UserProfile from "./components/userProfile";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import Dashboard from "./components/dashBoard"; 
import Help from "./components/help"; 
import "./App.css";
import PasswordResetForm from "./components/resetPass"; 
import DarkModeToggle from "./components/darkModeToggle";
const App = () => {
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = auth.user; 

  // Check authentication status on app load
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
       // Dispatch the action to set authenticated state
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const toggleSideDrawer = () => {
    setIsSideDrawerOpen((prevState) => !prevState);
  };

  const closeSideDrawer = () => {
    setIsSideDrawerOpen(false);
  };

  //darkmode implementation

  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    setIsDarkMode(savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };


  return (
    <Router>
      <div id="todo-list">
        <SideDrawerButton onClick={toggleSideDrawer} /> 
        <DarkModeToggle
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/profile" element={<ProfileForm />} />
          <Route path="/reset-password" element={<PasswordResetForm />} /> 
          <Route path="/help" element={<Help />} /> 
          <Route path="/user-Profile" element={<UserProfile/>} />
        </Routes>
        <SideDrawer isOpen={isSideDrawerOpen} onClose={closeSideDrawer} /> 
      </div>
    </Router>
  );
};

export default App;
