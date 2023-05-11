import Input from "@/components/Input";
import Navbar from "../components/Navbar";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import RuleModal from "@/components/RuleModal";
import Button from "@/components/Button";
import Confetti from "react-confetti";

// --- Color Pallet ---
// Navber: blue-900
// Button: blue-600 / blue-100
// Button: yellow-400 / yellow-500
// Score:  cyan-400
// BG:     green-100/50

export interface GuessedState {
  guessed: boolean;
  key: string;
}
const Home = () => {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [states, setStates] = useState<GuessedState[]>([]);
  const [score, setScore] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // CHECK IF ALL LETTER OF THE NAME IS GUESSED
  const isCompleted = states.every((state) => state.guessed);

  //HANDLE CLICK BUTTON TO DISPLAY NEXT POKEMON
  const handleNext = () => {
    fetchPokemon();
  };

  // OPEN | CLOSE RULE-MODAL
  const toggleModal = () => {
    setIsOpen((preClick) => !preClick);
  };

  // INITIAL STATE
  const fetchPokemon = async () => {
    try {
      const randomId = Math.floor(Math.random() * 100);
      const url = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
      const res = await fetch(url);
      const data = await res.json();
      // console.log(data);
      const pokeName = data.name;
      const pokeImg = data.sprites.other.home.front_default;
      setName(pokeName);
      setImg(pokeImg);
      setStates(deriveInitialState(pokeName));
      console.log(pokeName);
    } catch (error) {
      console.error(`⚠️ERROR⚠️${error}`);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const deriveInitialState = (name: string) => {
    let arr = name.split(""); //==>turns "pikachu" into ['p', 'i', 'k', 'a', 'c', 'h', 'u']
    const initialGameState = arr.map((letter) => {
      return {
        guessed: false,
        key: letter,
      };
    });
    return initialGameState;
  };

  // WHEN A KEY IS PRESSED
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      console.log(e.key);

      const positions: number[] = checkKeyInName(e.key, name); //==>[2,4] Index of the pressed Key in the name
      displayCorrectKeys(positions); //==>(states.guessed → true) if it's correctly guessed
      updateScore(positions); //==>Update score
      // console.log(positions);
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [name]);

  //==>Index of the pressed Key in the name (ex)[2, 4]
  const checkKeyInName = (pressedKey: string, name: string) => {
    const positionsArr = [];
    let position: number = name.indexOf(pressedKey); //==>Check index of the pressed key in the name (Not: -1)
    // console.log(pressedKey, name);
    while (position !== -1) {
      positionsArr.push(position);
      position = name.indexOf(pressedKey, position + 1); //==>indexOf(searchElement, fromIndex):at which to start searching
    }

    return positionsArr;
  };

  //==>Switch (states.guessed → true) if it's correctly guessed
  const displayCorrectKeys = (positions: number[]) => {
    const copyOfStates = [...states];
    if (positions.length > 0) {
      positions.forEach((index) => {
        copyOfStates[index].guessed = true;
      });
    }
    setStates(copyOfStates);
  };
  // console.log(states);

  //==>Update score correct:+10 / wrong:-15
  const updateScore = (positions: number[]) => {
    console.log(isCompleted);
    //TODO: How to disable to update score when "isCompleted"?
    //TODO: How to awards 20Pts when all letter is guessed?
    if (!isCompleted) {
      positions.length > 0
        ? setScore((preScore) => preScore + 10)
        : setScore((preScore) => preScore - 15);
    } else {
      return;
    }
  };

  return (
    <>
      <Head>
        <title>Pokémon App</title>
      </Head>
      <Navbar />
      <main className="bg-green-100/50 flex flex-col items-center min-h-screen">
        {/* CONTAINER */}
        <div className="w-fit md:w-1/2 md:max-w-screen-sm flex flex-col items-center">
          {isCompleted && <Confetti />}
          <button
            onClick={toggleModal}
            className=" w-fit text-sm px-3 py-1 mt-3 mb-1 md:my-4 bg-yellow-400 hover:bg-yellow-500 text-blue-600 rounded-full"
          >
            LEARN THE RULES
          </button>
          {isOpen && <RuleModal toggleModal={toggleModal} />}
          <h1 className="font-bold text-3xl md:text-4xl">Guess the Pokémon!</h1>
          {/* SCORE & NEXT BTN */}
          <div className="mt-5 flex flex-col md:flex-row items-center gap-4 md:gap-13">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white border-[14px]  border-cyan-400/40 flex justify-center items-center">
              <span className="font-bold text-4xl md:text-5xl text-cyan-400">
                {score}
              </span>
            </div>
            {isCompleted && (
              <Button onClick={handleNext}>
                <span>Next!</span>
                <IoIosArrowDroprightCircle size={25} />
              </Button>
            )}
          </div>
          {/* POKEMON */}
          <div className="w-64 md:w-80 mb-3 flex items-center justify-center">
            {img.length > 0 && (
              <Image
                priority={true}
                src={img}
                alt={name}
                width={300}
                height={300}
              />
            )}
          </div>
          <Input states={states} />
        </div>
      </main>
    </>
  );
};

export default Home;
