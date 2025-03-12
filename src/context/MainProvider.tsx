import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const mainContext = createContext({});

export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pkmn, setPkmn] = useState<any[]>([]);
  const [pokemon, setPokemon] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        
        const res = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=107&offset=386"
        );
        setPkmn(res.data.results);

        const pokemonDetails = await Promise.all(
          res.data.results.map(async (p: any) => {
            const detailRes = await axios.get(p.url);
            return detailRes.data;
          })
        );

        setPokemon(pokemonDetails);
      } catch (err) {
        console.error("Fetch failed: ", err);
      }
    };

    getData();
  }, []);

  return (
    <mainContext.Provider value={{ pkmn, pokemon, searchTerm, setSearchTerm }}>
      {children}
    </mainContext.Provider>
  );
}
