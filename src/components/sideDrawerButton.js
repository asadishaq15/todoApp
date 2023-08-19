import React from "react";

const SideDrawerButton = ({ onClick }) => {
  return (
    <button className="hamburger-button" onClick={onClick}>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </button>
  );
};

export default SideDrawerButton;
