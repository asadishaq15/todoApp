import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const SideDrawer = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && !event.target.closest(".side-drawer")) {
        onClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  const handleNavLinkClick = () => {
    onClose();
  };

  return (
    <div>
      {isOpen && (
        <div className={`side-drawer ${isOpen ? "open" : ""}`}>
          <div className="navbar-nav">
            <div className="nav-item">
              <Link
                to="/"
                className="nav-link button-link"
                onClick={handleNavLinkClick}
              >
                Home
              </Link>
            </div>
            <div className="nav-item">
              <Link
                to="/about"
                className="nav-link button-link"
                onClick={handleNavLinkClick}
              >
                About
              </Link>
            </div>
            <div className="nav-item">
              <Link
                to="/signin"
                className="nav-link button-link"
                onClick={handleNavLinkClick}
              >
                Login
              </Link>
            </div>
            <div className="nav-item">
              <Link
                to="/signup"
                className="nav-link button-link"
                onClick={handleNavLinkClick}
              >
                Create new account
              </Link>
            </div>
            <div className="nav-item">
              <Link
                to="/help"
                className="nav-link button-link"
                onClick={handleNavLinkClick}
              >
                Help?
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideDrawer;
