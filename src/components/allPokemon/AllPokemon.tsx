import { useContext } from "react";
import { mainContext } from "../../context/MainProvider";
import { Link } from "react-router-dom";

export default function AllPokemon() {
  const { pkmn, pokemon, searchTerm, setSearchTerm } = useContext(mainContext) as any;

  const filtered = pkmn.filter((p: any) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <section className="flex flex-col items-center gap-8 mt-10">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-4 py-2 rounded w-64"
      />
      <div className="grid grid-cols-2 gap-10">
        {filtered.map((p: any) => {
          const pokeDetail = pokemon.find((detail: any) => detail.name === p.name);
          return (
            <Link key={p.name} to={`/${p.name}`} className="text-center">
              <div>
                <h2 className="text-xl font-bold uppercase">{p.name}</h2>
                {pokeDetail && (
                  <>
                    <img
                      src={pokeDetail?.sprites?.other?.home?.front_default}
                      alt={p.name}
                      className="w-32 mx-auto"
                    />
                    <p>ID: {pokeDetail.order}</p>
                  </>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
