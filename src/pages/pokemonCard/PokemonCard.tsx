import { useContext } from "react";
import { useParams } from "react-router-dom";
import { mainContext } from "../../context/MainProvider";
import { typeColors } from "../../components/typeColors/typeColors";

export default function PokemonCard() {
  const { pokemon } = useContext(mainContext) as any;
  const { name } = useParams();

  const selectedPokemon = pokemon.find((p: any) => p.name === name);




  return (
    <section className="flex justify-center mt-10">
      {selectedPokemon ? (
        <div className="text-center space-y-4">

          <img
            src={selectedPokemon?.sprites?.other?.home?.front_default || "/fallback.png"}
            alt={selectedPokemon.name}
            className="w-48 mx-auto"
          />
            
          <p className="text-lg">ID: {selectedPokemon.order}</p>
          <h2 className="text-2xl font-bold uppercase">{selectedPokemon.name}</h2>
          
          

          <div className="flex justify-center gap-3 flex-wrap mt-4">
            {selectedPokemon.types.map((t: any) => {
              const typeName = t.type.name;
              const bgColor = typeColors[typeName] || "bg-gray-200 text-black";
              return (
                <p
                  key={typeName}
                  className={`px-4 py-1 rounded-full font-semibold capitalize ${bgColor}`}
                >
                  {typeName}
                </p>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-center text-lg">Loading or Pokémon not found...</p>
      )}
    </section>
  );
}
