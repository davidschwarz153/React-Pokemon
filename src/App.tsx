import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Layout from './layout/Layout'
import PokemonCard from './pages/pokemonCard/PokemonCard'


export default function App() {

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route index element={<Home/>} />
      <Route path="/:name" element={<PokemonCard />} />
    </Route>
))

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}


