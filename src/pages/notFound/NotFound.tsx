import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function NotFound() {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handleBidizaClick = () => {
    setClicked(true);
    setTimeout(() => {
      navigate("/pokemon/bidoof"); // kleine Überraschung 🎁
    }, 1600);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gradient-to-br from-yellow-100 to-orange-100">
      <div className="relative">
        <img
          src="https://img.pokemondb.net/artwork/large/bidoof.jpg"
          alt="Bidiza"
          className={`w-64 h-64 object-contain mb-6 transition-transform duration-700 ${
            clicked ? "rotate-[720deg] scale-110" : "hover:scale-105"
          } cursor-pointer drop-shadow-xl`}
          onClick={handleBidizaClick}
          title="Klick mich 🐾"
        />
        {clicked && (
          <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-600 animate-bounce">
            ...Bidiza leitet dich weiter 👀
          </p>
        )}
      </div>

      <h1 className="text-5xl font-bold text-orange-600 mb-3 drop-shadow">404 - Not Found</h1>
      <p className="text-lg text-gray-700 mb-6 max-w-md">
        Huch! Die Seite gibt's nicht. Bidiza hat sich wohl verlaufen... 🥺
      </p>

      <Link
        to="/"
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold shadow-md transition duration-300"
      >
        Zurück zur Startseite
      </Link>

      <p className="mt-4 text-sm text-gray-500 italic">Tipp: Klick mal auf Bidiza 😏</p>
    </section>
  );
}
