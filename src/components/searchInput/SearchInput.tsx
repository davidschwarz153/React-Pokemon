import { useContext } from "react";
import { mainContext } from "../../context/MainProvider";

export default function SearchInput() {
  const { searchTerm, setSearchTerm } = useContext(mainContext) as any;

  return (
    <input
      type="text"
      placeholder="Search Pokémon..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border px-4 py-2 rounded-2xl w-64 shadow-2xl"
    />
  );
}
