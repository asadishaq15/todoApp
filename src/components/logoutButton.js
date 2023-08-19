import React from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../actions/auth";
import { Navigate, useNavigate } from "react-router-dom";
const LogoutButton = () => {
const dispatch = useDispatch();
const naviagte=useNavigate();
  const handleLogout = () => {
    dispatch(signOut());
    console.log("logout success:");
    naviagte("/signin")
  };

  return (
  
  
  <div>
    
  <button onClick={handleLogout}>Logout</button>
  </div>
  )
};

export default LogoutButton;
