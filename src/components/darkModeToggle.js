import React from 'react';

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className="dark-mode-toggle">
    <input
      type="checkbox"
      checked={isDarkMode}
      onChange={toggleDarkMode}
      className="toggle-checkbox"
      id="darkModeToggle"
    />
    <label className="toggle-label" htmlFor="darkModeToggle">
      <span className="toggle-inner" />
      <span className="toggle-switch" />
    </label>
  </div>
  );
};

export default DarkModeToggle;
