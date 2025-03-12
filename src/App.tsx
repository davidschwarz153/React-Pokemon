import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Layout from './layout/Layout'
import PokemonCard from './pages/pokemonCard/PokemonCard'
import { useState } from 'react'
import ThemeToggleButton from './components/ThemeToggleButton'



export default function App() {
  
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
    document.body.classList.toggle("dark-theme", !isDarkTheme);
    
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/:name" element={<PokemonCard />} />
      </Route>
    )
  );

  return (
    <>
      <ThemeToggleButton toggleTheme={toggleTheme} />
      <RouterProvider router={router} />
    </>
  );
}
