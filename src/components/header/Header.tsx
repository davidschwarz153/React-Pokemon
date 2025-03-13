import { Link, useLocation, useNavigate } from "react-router-dom";
import BurgerMenu from "../burgerMenu/BurgerMenu";
import SearchInput from "../searchInput/SearchInput";
import ThemeToggleButton from "../ThemeToggleButton";
import "./Header.css";

interface HeaderProps {
  toggleTheme: () => void;
}

export default function Header({ toggleTheme }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isDetailPage = location.pathname !== "/";

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
      <div className="flex justify-center items-center gap-6 mb-4">
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
      </div>
    </div>
  );
}
