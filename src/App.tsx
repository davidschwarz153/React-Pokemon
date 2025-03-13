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
import React, { useState } from "react";

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => {
      const newTheme = !prevTheme;
      document.body.classList.toggle("dark-theme", newTheme);
      document.body.classList.toggle("light-theme", !newTheme);
      return newTheme;
    });
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout toggleTheme={toggleTheme} />}>
        <Route index element={<Home />} />
        <Route path="/:name" element={<PokemonCard />} />
      </Route>
    )
  );

  return (
    <div className={isDarkTheme ? "dark-theme" : "light-theme"}>
      <RouterProvider router={router} />
    </div>
  );
}
