// MainProvider.tsx
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const mainContext = createContext({});

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [allPokemon, setAllPokemon] = useState<any[]>([]);
  const [pokemon, setPokemon] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [myTeam, setMyTeam] = useState<any[]>(() => {
    const stored = localStorage.getItem("myPokemonTeam");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=107&offset=386");
        setAllPokemon(res.data.results);

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

  useEffect(() => {
    localStorage.setItem("myPokemonTeam", JSON.stringify(myTeam));
  }, [myTeam]);

  const filteredPokemon = pokemon.filter((p: any) => {
    const matchesName = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "" || p.types.some((t: any) => t.type.name === selectedType);
    return matchesName && matchesType;
  });

  const addToTeam = (pokemonToAdd: any) => {
    if (myTeam.length >= 6) return alert("You can only have 6 Pokémon in your team!");
    if (myTeam.find((p) => p.name === pokemonToAdd.name)) return;
    setMyTeam((prev) => [...prev, pokemonToAdd]);
  };

  const removeFromTeam = (name: string) => {
    setMyTeam((prev) => prev.filter((p) => p.name !== name));
  };

  return (
    <mainContext.Provider
      value={{
        allPokemon,
        pokemon,
        filteredPokemon,
        searchTerm,
        setSearchTerm,
        selectedType,
        setSelectedType,
        myTeam,
        addToTeam,
        removeFromTeam,
      }}
    >
      {children}
    </mainContext.Provider>
  );
}
