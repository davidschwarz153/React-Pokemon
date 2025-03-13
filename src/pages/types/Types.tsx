import { useContext } from "react";
import { mainContext } from "../../context/MainProvider";
import { typeColors } from "../../components/typeColors/typeColors";
import { Link } from "react-router-dom";

export default function Types() {
  const {
    filteredPokemon,
    selectedType,
    setSelectedType,
  } = useContext(mainContext) as any;

  const pokemonTypes = Object.keys(typeColors);

  const handleTypeClick = (type: string) => {
    setSelectedType(type === selectedType ? "" : type);
  };

  return (
    <div className="min-h-screen p-4 relative">
      <h2 className="text-center text-2xl font-bold text-blue-700 mb-4">TYPE</h2>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {pokemonTypes.map((type) => (
          <button
            key={type}
            onClick={() => handleTypeClick(type)}
            className={`px-4 py-2 rounded-md font-semibold uppercase ${typeColors[type]} ${
              selectedType === type ? "ring-4 ring-black ring-opacity-40" : ""
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="text-center text-lg font-semibold mb-4 flex items-center justify-center gap-4">
        {selectedType ? (
          <>
            <span>Showing: {selectedType.toUpperCase()}</span>
            <button
              onClick={() => setSelectedType("")}
              className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Clear ✕
            </button>
          </>
        ) : (
          "Showing All Pokémon"
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {filteredPokemon.map((p: any) => (
          <Link key={p.name} to={`/pokemon/${p.name}`}>

          <div
            key={p.id}
            className="bg-white rounded-lg shadow p-3 w-40 flex flex-col items-center text-center"
            >
            <img
              src={p.sprites.other?.home?.front_default}
              alt={p.name}
              className="w-20 h-20 mb-2 hover:scale-110 transform transition duration-300"
              />
            <h4 className="capitalize font-bold mb-1">{p.name}</h4>
            <div className="text-sm flex flex-wrap justify-center gap-1">
              {p.types.map((t: any) => (
                <span
                key={t.slot}
                className={`px-2 py-1 text-xs rounded-full ${typeColors[t.type.name]}`}
                >
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>
              </Link>
        ))}
      </div>
    </div>
  );
}
