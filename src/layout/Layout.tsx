import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";


  interface LayoutProps {
    toggleTheme: () => void;
  }
  
  export default function Layout({ toggleTheme }: LayoutProps) {
    return (
      <div className="min-h-screen">
        <Header toggleTheme={toggleTheme} />
        <Outlet />
      </div>
    );
  }
