import Input from "@/components/Input";
import Navbar from "../components/Navbar";
import { BsArrowRightShort } from "react-icons/bs";
import { useEffect, useState } from "react";
import Image from "next/image";

// --- Color Pallet ---
// Navber: blue-900
// Button: blue-600 / blue-100
// Button: yellow-400 / yellow-500
// Score:  cyan-400
// BG:     green-100/50

interface GuessedState {
  guessed: boolean;
  key: string;
}

const Home = () => {
  const [name, setName] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [states, setStates] = useState<GuessedState[] | undefined>([]);

  // INITIAL STATE
  const fetchPokemon = async () => {
    const randomId = Math.floor(Math.random() * 100);
    const url = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    const pokeName = data.name;
    const pokeImg = data.sprites.other.home.front_default;
    setName(pokeName);
    setImg(pokeImg);
    setStates(deriveInitialState(name));
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const deriveInitialState = (name: string): GuessedState[] => {
    let arr = name.split(""); // turns "pikachu" into ['p', 'i', 'k', 'a', 'c', 'h', 'u']
    const initialGameState = arr.map((letter) => {
      return {
        guessed: false,
        key: letter,
      };
    });
    console.log(arr);
    return initialGameState;
  };

  return (
    <>
      <Navbar />
      <main className="bg-green-100/50 flex flex-col items-center min-h-screen">
        {/* CONTAINER */}
        <div className="w-fit md:w-1/2 md:max-w-screen-sm flex flex-col items-center">
          <button className=" w-fit text-sm px-3 py-1 mt-3 mb-1 md:my-4 bg-yellow-400 hover:bg-yellow-500 text-blue-600 rounded-full">
            LEARN THE RULES
          </button>
          <h1 className="font-bold text-3xl md:text-4xl">Guess the Pokémon!</h1>
          {/* SCORE & NEXT BTN */}
          <div className="mt-5 flex flex-col md:flex-row items-center gap-4 md:gap-13">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white border-[14px]  border-cyan-400/40 flex justify-center items-center">
              <span className="font-bold text-4xl md:text-5xl text-cyan-400">
                10
              </span>
            </div>
            <button className="px-3 py-1 text-lg md:text-xl flex items-center gap-1 font-semibold border-2 border-blue-600 bg-white hover:bg-blue-100 transition text-blue-600 rounded-full">
              <span>Next</span>
              <BsArrowRightShort size={25} />
            </button>
          </div>
          {/* POKEMON */}
          <div className="w-64 md:w-80 mb-3">
            <Image src={img} alt={name} width={500} height={500} />
          </div>
          <Input />
        </div>
      </main>
    </>
  );
};

export default Home;
