import React from "react";
import { Link } from "react-router-dom";

interface EvolutionStage {
  name: string;
  evolvesTo?: string;
  trigger?: string;
  minLevel?: number;
  item?: string;
}

interface EvolutionCardProps {
  chain: EvolutionStage[];
}

export default function EvolutionCard({ chain }: EvolutionCardProps) {
  const getTriggerInfo = (trigger?: string, minLevel?: number, item?: string) => {
    if (!trigger && !minLevel && !item) return null;
    const parts = [];
    if (trigger === "level-up") parts.push("🎯 Level-Up");
    if (minLevel) parts.push(`Lv. ${minLevel}`);
    if (trigger === "use-item") parts.push("💎 Use Item");
    if (item) parts.push(`Item: ${item}`);
    if (trigger === "trade") parts.push("🔁 Trade");
    return parts.join(" • ");
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {chain.map((evo, index) =>
        evo.evolvesTo ? (
          <div
            key={index}
            className="flex items-center justify-center gap-6 bg-white/30 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 shadow-md w-full hover:scale-[1.01] transition-all"
          >
            <Link to={`/pokemon/${evo.name}`} className="flex flex-col items-center">
              <img
                src={`https://img.pokemondb.net/artwork/${evo.name}.jpg`}
                alt={evo.name}
                className="w-24 h-24 object-contain rounded-xl mb-1 shadow"
              />
              <p className="capitalize text-lg font-bold">{evo.name}</p>
            </Link>

            <div className="flex flex-col items-center text-center text-sm text-gray-700">
              <div className="text-xl">➡️</div>
              <div>{getTriggerInfo(evo.trigger, evo.minLevel, evo.item)}</div>
            </div>

            <Link to={`/pokemon/${evo.evolvesTo}`} className="flex flex-col items-center">
              <img
                src={`https://img.pokemondb.net/artwork/${evo.evolvesTo}.jpg`}
                alt={evo.evolvesTo}
                className="w-24 h-24 object-contain rounded-xl mb-1 shadow"
              />
              <p className="capitalize text-lg font-bold">{evo.evolvesTo}</p>
            </Link>
          </div>
        ) : null
      )}
    </div>
  );
}
