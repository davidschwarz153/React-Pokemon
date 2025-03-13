import { useContext } from "react";
import { mainContext } from "../../context/MainProvider";
import { typeColors } from "../../components/typeColors/typeColors";
import { Link } from "react-router-dom";

export default function Types() {
  const { filteredPokemon, selectedType, setSelectedType } = useContext(mainContext) as any;

  const pokemonTypes = Object.keys(typeColors);

  const handleTypeClick = (type: string) => {
    setSelectedType(type === selectedType ? "" : type);
  };

  return (
    <div className="min-h-screen p-4 max-w-6xl mx-auto">
      <h2 className="text-center text-3xl font-bold text-orange-600 mb-6 tracking-wide drop-shadow">
        Pokémon Types
      </h2>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {pokemonTypes.map((type) => (
          <button
            key={type}
            onClick={() => handleTypeClick(type)}
            className={`px-5 py-2 rounded-full font-semibold uppercase text-white transition-all duration-200 shadow-sm hover:scale-105 ${
              typeColors[type]
            } ${selectedType === type ? "ring-4 ring-yellow-300" : ""}`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="text-center text-lg font-semibold mb-6 flex items-center justify-center gap-4">
        {selectedType ? (
          <>
            <span className="text-gray-700">
              Showing: <span className="uppercase font-bold text-orange-600">{selectedType}</span>
            </span>
            <button
              onClick={() => setSelectedType("")}
              className="text-sm bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition-all"
            >
              ✕ Clear
            </button>
          </>
        ) : (
          <span className="text-gray-600">Showing All Pokémon</span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredPokemon.map((p: any) => (
          <Link key={p.name} to={`/pokemon/${p.name}`}>
            <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center hover:scale-105 hover:shadow-xl transition-all duration-300">
              <img
                src={p.sprites.other?.home?.front_default}
                alt={p.name}
                className="w-24 h-24 mb-3 object-contain"
              />
              <h4 className="capitalize font-bold text-lg mb-2 text-gray-800">{p.name}</h4>
              <div className="text-sm flex flex-wrap justify-center gap-2">
                {p.types.map((t: any) => (
                  <span
                    key={t.slot}
                    className={`px-3 py-1 text-xs rounded-full font-medium text-white ${typeColors[t.type.name]}`}
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
