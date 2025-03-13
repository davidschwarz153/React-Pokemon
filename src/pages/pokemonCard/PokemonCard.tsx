import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mainContext } from "../../context/MainProvider";
import { typeColors } from "../../components/typeColors/typeColors";
import EvolutionCard from "../../components/evolutionCard/EvolutionCard";
import axios from "axios";

interface EvolutionStage {
  name: string;
  evolvesTo?: string;
  trigger?: string;
  minLevel?: number;
  item?: string;
}

export default function PokemonCard() {
  const { pokemon, addToTeam } = useContext(mainContext) as any;
  const { name } = useParams();
  const [evolutionChain, setEvolutionChain] = useState<EvolutionStage[]>([]);
  const [loadingEvo, setLoadingEvo] = useState(true);
  const [showShiny, setShowShiny] = useState(false);

  const selectedPokemon = pokemon.find((p: any) => p.name === name);

  const handleAddToTeam = () => {
    addToTeam(selectedPokemon);
  };

  const parseEvolutionChain = (chain: any): EvolutionStage[] => {
    const result: EvolutionStage[] = [];
    const traverse = (node: any) => {
      const from = node.species.name;
      node.evolves_to.forEach((evo: any) => {
        const to = evo.species.name;
        const details = evo.evolution_details[0] || {};
        result.push({
          name: from,
          evolvesTo: to,
          trigger: details.trigger?.name || "",
          minLevel: details.min_level || null,
          item: details.item?.name || null,
        });
        traverse(evo);
      });
    };
    traverse(chain);
    return result;
  };

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      if (!name) return;
      try {
        setLoadingEvo(true);
        const speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
        const evoUrl = speciesRes.data.evolution_chain.url;
        const evoRes = await axios.get(evoUrl);
        const parsed = parseEvolutionChain(evoRes.data.chain);
        setEvolutionChain(parsed);
      } catch (err) {
        setEvolutionChain([]);
      } finally {
        setLoadingEvo(false);
      }
    };
    fetchEvolutionChain();
  }, [name]);

  return (
    <section className="flex flex-col items-center">
      <div className="w-full max-w-md min-h-screen relative">
        {selectedPokemon ? (
          <div className="px-4 pt-4">
            <div className="relative mb-20">
              <div className="w-full h-36 bg-gradient-to-b from-yellow-300 to-orange-400 rounded-3xl shadow-lg" />
              <img
                src={
                  showShiny
                    ? selectedPokemon?.sprites?.other?.home?.front_shiny
                    : selectedPokemon?.sprites?.other?.home?.front_default
                }
                alt={selectedPokemon.name}
                className="absolute left-1/2 -translate-x-1/2 -bottom-12 w-48 h-48 hover:scale-110 transform transition duration-300"
              />
            </div>

            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">
                #{selectedPokemon.order?.toString().padStart(3, "0")} {selectedPokemon.name}
              </h1>

              <div className="flex justify-center gap-3 mb-6">
                {selectedPokemon.types.map((t: any) => {
                  const typeName = t.type.name;
                  const bgColor = typeColors[typeName] || "bg-gray-200 text-black";
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

              <div className="flex justify-center gap-3 mb-6">
                <button
                  onClick={() => setShowShiny((prev) => !prev)}
                  className={`px-4 py-2 rounded-full font-semibold shadow-md transition ${
                    showShiny
                      ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                      : "bg-gray-700 hover:bg-gray-800 text-white"
                  }`}
                >
                  {showShiny ? "✨ Show Default" : "✨ Show Shiny"}
                </button>

                <button
                  onClick={handleAddToTeam}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full shadow-md transition duration-300"
                >
                  ➕ Add to My Team
                </button>
              </div>

              <div className="mb-6">
                <h2 className="font-semibold text-lg mb-2">Evolution Chain</h2>
                {loadingEvo ? (
                  <p>Loading evolution data...</p>
                ) : evolutionChain.length > 0 ? (
                  <EvolutionCard chain={evolutionChain} />
                ) : (
                  <p>No evolution data available.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-lg p-4">Loading or Pokémon not found...</p>
        )}
      </div>
    </section>
  );
}
