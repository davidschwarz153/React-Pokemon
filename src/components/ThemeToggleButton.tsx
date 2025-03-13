import React from "react";
import "./ThemeToggleButton.css";
import modeIcon from "../assets/img/mode.png";

interface ThemeToggleButtonProps {
  toggleTheme: () => void;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  toggleTheme,
}) => {
  return (
    <button onClick={toggleTheme} className="icon-button">
      <img src={modeIcon} alt="Toggle Theme" />
    </button>
  );
};

export default ThemeToggleButton;
