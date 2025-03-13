import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BurgerMenu from "../burgerMenu/BurgerMenu";
import SearchInput from "../searchInput/SearchInput";
import ThemeToggleButton from "../ThemeToggleButton";
import { mainContext } from "../../context/MainProvider";
import "./Header.css";

interface HeaderProps {
  toggleTheme: () => void;
}

export default function Header({ toggleTheme }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isDetailPage = location.pathname !== "/";
  const { myTeam } = useContext(mainContext) as any;

  return (
    <div className="flex flex-col gap-6 items-center">
      <Link to="/">
        <div className="pt-10 flex justify-center">
          <img
            className="hover:scale-110 transform transition duration-300"
            src="/logo.png"
            alt="Logo"
          />
        </div>
      </Link>

      <div className="flex justify-center items-center gap-6">
        {isDetailPage ? (
          <button onClick={() => navigate(-1)} className="back-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
        ) : (
          <BurgerMenu />
        )}

        <SearchInput />


        <ThemeToggleButton toggleTheme={toggleTheme} />


        {/* My Team Button */}
      </div>
        <Link to="/my-team" className="relative group mb-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all shadow-md">
            {/* Pokéball SVG Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                d="M12 2C6.5 2 2 6.5 2 12h5a5 5 0 0 1 10 0h5c0-5.5-4.5-10-10-10zm0 20c5.5 0 10-4.5 10-10h-5a5 5 0 0 1-10 0H2c0 5.5 4.5 10 10 10zm0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
              />
            </svg>
            <span className="font-semibold text-sm">My Team</span>
          </div>

          {/* Badge – Team Count */}
          <div className="absolute -top-2 -right-2 bg-white text-red-500 font-bold text-xs px-2 py-0.5 rounded-full border border-red-500 shadow-md">
            {myTeam.length}/6
          </div>
        </Link>
    </div>
  );
}
