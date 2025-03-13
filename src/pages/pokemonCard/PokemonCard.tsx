import { useContext } from "react";
import { useParams } from "react-router-dom";
import { mainContext } from "../../context/MainProvider";
import { typeColors } from "../../components/typeColors/typeColors";

export default function PokemonCard() {
  const { pokemon } = useContext(mainContext) as any;
  const { name } = useParams();

  const selectedPokemon = pokemon.find((p: any) => p.name === name);

  return (
    <section className="flex flex-col items-center">
      <div className="w-full max-w-md  min-h-screen relative">
        {selectedPokemon ? (
          <div className="px-4 pt-4">
            <div className="relative mb-20">
              <div className="w-full h-36 bg-gradient-to-b from-yellow-300 to-orange-400 rounded-3xl" />
              <img
                src={
                  selectedPokemon?.sprites?.other?.home?.front_default ||
                  "/fallback.png"
                }
                alt={selectedPokemon.name}
                className="absolute left-1/2 -translate-x-1/2 -bottom-12 w-48 h-48 hover:scale-110 transform transition duration-300"
              />
            </div>

            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">
                #{selectedPokemon.order?.toString().padStart(3, "0")}{" "}
                {selectedPokemon.name}
              </h1>

              <div className="flex justify-center gap-3 mb-8">
                {selectedPokemon.types.map((t: any) => {
                  const typeName = t.type.name;
                  const bgColor =
                    typeColors[typeName] || "bg-gray-200 text-black";
                  return (
                    <span
                      key={typeName}
                      className={`px-6 py-1 rounded-full font-medium capitalize ${bgColor}`}
                    >
                      {typeName}
                    </span>
                  );
                })}
              </div>

            </div>
          </div>
        ) : (
          <p className="text-center text-lg p-4">
            Loading or Pokémon not found...
          </p>
        )}
      </div>
    </section>
  );
}
