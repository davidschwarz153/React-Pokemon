import { useContext, useEffect, useState, useRef } from "react";
import { mainContext } from "../../context/MainProvider";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AllPokemon() {
  const { allPokemon, pokemon, searchTerm } = useContext(mainContext) as any;
  const [displayCount, setDisplayCount] = useState(0);
  const [cardsPerRow, setCardsPerRow] = useState(2);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      if (width >= 1536) setCardsPerRow(6);
      else if (width >= 1280) setCardsPerRow(5);
      else if (width >= 1024) setCardsPerRow(4);
      else if (width >= 640) setCardsPerRow(3);
      else setCardsPerRow(2);
    };
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  useEffect(() => {
    const rowsToShow = 3;
    setDisplayCount(cardsPerRow * rowsToShow);
  }, [cardsPerRow]);

  const filtered = allPokemon.filter((p: any) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedPokemon = filtered.slice(0, displayCount);

  const handleImageLoad = (name: string) => {
    setLoadedImages((prev) => [...prev, name]);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setDisplayCount((prev) => prev + cardsPerRow * 2);
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [cardsPerRow]);

  return (
    <section className="flex flex-col items-center gap-10 mt-6 px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-12 w-full max-w-[1400px]">
        {displayedPokemon.map((p: any, index: number) => {
          const pokeDetail = pokemon.find((detail: any) => detail.name === p.name);
          if (!pokeDetail) return null;
          const isLoaded = loadedImages.includes(p.name);
          const imageSrc = pokeDetail?.sprites?.other?.home?.front_default;

          return (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
            >
              <Link to={`/pokemon/${p.name}`} className="text-center">
                <div className="flex flex-col items-center hover:scale-105 transition-transform duration-300">
                  <div className="relative w-40 h-40 rounded-t-3xl bg-gradient-to-b from-yellow-300 via-amber-300 to-orange-300">
                    {!isLoaded && (
                      <div className="absolute w-full h-full flex items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-full animate-pulse opacity-70" />
                      </div>
                    )}
                    <img
                      loading="lazy"
                      src={imageSrc}
                      alt={p.name}
                      onLoad={() => handleImageLoad(p.name)}
                      className={`absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-32 object-contain z-10 transition-opacity duration-500 ${
                        isLoaded ? "opacity-100" : "opacity-0"
                      }`}
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
            </motion.div>
          );
        })}
      </div>

      <div ref={loaderRef} className="h-10 mt-10" />
    </section>
  );
}
