import { useContext } from "react";
import { mainContext } from "../../context/MainProvider";
import { Link } from "react-router-dom";

export default function AllPokemon() {
  const { pkmn, pokemon, searchTerm, setSearchTerm } = useContext(mainContext) as any;

  const filtered = pkmn.filter((p: any) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="flex flex-col items-center gap-8 mt-6">
      
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-4 py-2 rounded-2xl w-64 shadow-2xl mb-4 "
      />

      
      <div className="grid grid-cols-2 gap-10">
        {filtered.map((p: any) => {
          const pokeDetail = pokemon.find((detail: any) => detail.name === p.name);
          if (!pokeDetail) return null;

          return (
            <Link key={p.name} to={`/${p.name}`} className="text-center">
              <div className="flex flex-col items-center hover:scale-110 transform transition duration-300 ">
                
                <div className="relative w-40 h-40 rounded-t-3xl bg-gradient-to-b from-yellow-300 via-amber-300 to-orange-300">
                  
                  <img
                    src={pokeDetail?.sprites?.other?.home?.front_default}
                    alt={p.name}
                    className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-32 object-contain z-10"
                  />
                </div>

                
                <div className="bg-white w-40 rounded-b-3xl pt-6 pb-8 shadow-lg -mt-20 z-1">
                  <p className="text-gray-600 text-sm font-mono">
                    #{pokeDetail.order?.toString().padStart(3, "0")}
                  </p>
                  <p className="text-gray-800 font-semibold capitalize">
                    {p.name}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
