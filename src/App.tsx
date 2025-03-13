import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Layout from "./layout/Layout";
import PokemonCard from "./pages/pokemonCard/PokemonCard";
import Types from "./pages/types/Types";
import MyTeam from "./pages/myTeam/MyTeam";
import NotFound from "./pages/notFound/NotFound"; 

import { useState } from "react";

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => {
      const newTheme = !prev;
      document.body.classList.toggle("dark-theme", newTheme);
      document.body.classList.toggle("light-theme", !newTheme);
      return newTheme;
    });
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout toggleTheme={toggleTheme} />}>
        <Route index element={<Home />} />
        <Route path="pokemon/:name" element={<PokemonCard />} />
        <Route path="types" element={<Types />} />
        <Route path="my-team" element={<MyTeam />} />
        <Route path="*" element={<NotFound />} /> 
      </Route>
    )
  );

  return (
    <div className={isDarkTheme ? "dark-theme" : "light-theme"}>
      <RouterProvider router={router} />
    </div>
  );
}
