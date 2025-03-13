import React, { useState } from "react";
import "./BurgerMenu.css";
import { Link } from "react-router-dom";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);



  return (
    <Link to="/types">

    <div className="w-10">
      <img src="/filter.png" alt="" />


    </div>
      </Link>
  );
}
