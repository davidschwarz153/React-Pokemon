// src/pages/myTeam/MyTeam.tsx
import { useContext } from "react";
import { mainContext } from "../../context/MainProvider";

export default function MyTeam() {
  const { myTeam, removeFromTeam } = useContext(mainContext) as any;

  return (
    <section className="flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-red-600 mb-10">🎯 My Pokémon Team</h1>

      {myTeam.length === 0 ? (
        <p className="text-gray-600 text-lg">No Pokémon in your team yet. Go catch some!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {myTeam.map((poke: any) => (
            <div
              key={poke.name}
              className="relative w-64 bg-gradient-to-b from-red-500 to-white rounded-3xl border-4 border-red-600 shadow-2xl overflow-hidden transition-transform hover:scale-105 hover:animate-bounce-smooth"
            >
              {/* Pokéball Top Half */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600 rounded-t-3xl z-0" />

              {/* Pokémon Image */}
              <div className="z-10 relative flex flex-col items-center p-4">
                <img
                  src={poke?.sprites?.other?.home?.front_default}
                  alt={poke.name}
                  className="w-32 h-32 object-contain drop-shadow-lg mb-2"
                />

                {/* Name & Pokédex-Nummer */}
                <p className="text-xl font-bold capitalize text-gray-800">{poke.name}</p>
                <p className="text-sm text-gray-500 mb-1">
                  #{poke.order?.toString().padStart(3, "0")}
                </p>

                {/* Types */}
                <div className="flex gap-2 mt-1 flex-wrap justify-center">
                  {poke.types.map((t: any) => (
                    <span
                      key={t.type.name}
                      className="text-xs font-semibold bg-white border border-gray-300 rounded-full px-2 py-0.5 text-gray-700 shadow-sm"
                    >
                      {t.type.name}
                    </span>
                  ))}
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromTeam(poke.name)}
                  className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold transition-all hover:scale-105 active:scale-95"
                >
                  ❌ Remove
                </button>
              </div>

              {/* Pokéball Bottom Divider */}
              <div className="absolute bottom-0 left-0 w-full h-6 bg-gray-300 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full border-2 border-gray-600" />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
