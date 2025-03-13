import React, { useState } from "react";
import "./BurgerMenu.css";
import { Link } from "react-router-dom";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <Link to="/types">

    <div className="relative">
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md border focus:outline-none focus:ring focus:ring-orange-400"
        >
        <div className="space-y-1">
          <div className="w-6 h-0.5 menu-line" />
          <div className="w-6 h-0.5 menu-line" />
          <div className="w-6 h-0.5 menu-line" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 menu-container border rounded-lg shadow-lg p-4 z-10">
          <ul className="space-y-2">
            <li className="menu-item hover:text-orange-500 cursor-pointer">
              Home
            </li>
            <li className="menu-item hover:text-orange-500 cursor-pointer">
              About
            </li>
            <li className="menu-item hover:text-orange-500 cursor-pointer">
              Contact
            </li>
          </ul>
        </div>
      )}
    </div>
      </Link>
  );
}
