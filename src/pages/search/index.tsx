import Image from "next/image";
import React from "react";
import { useState } from "react";

// TODO:HOW TO PUT MAGNIFY GLASS ICON IN INPUT
const Search = () => {
  const [inputvalue, setInputValue] = useState("");
  return (
    <div className="bg-green-100/50 flex flex-col items-center min-h-screen">
      {/* CONTEINER */}
      <div className="border-2 overflow-hidden w-full md:w-9/12 md:max-w-screen-lg flex flex-col">
        {/* INPUT FORM */}
        <form className=" my-4 w-10/12 h-16 mx-auto px-4 gap-3 flex justify-between items-center bg-white rounded-xl">
          <input
            className=" h-12 w-full rounded-xl bg-slate-200 px-3 focus:outline-slate-400"
            placeholder="Pokémon name or keywords..."
            value={inputvalue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button className="h-12 px-3 bg-blue-950 rounded-xl text-white hover:opacity-70">
            Search
          </button>
        </form>
        {/* CARD CONTAINER */}
        <div className="max-w-xl md:max-w-full mx-auto bg-blue-500 mt-4 h-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 md:gap-10 lg:gap-8">
          {/* CARD */}
          <div className=" h-fit bg-white rounded-lg">
            <div className="bg-slate-200 rounded-t-lg">
              <Image
                src="https://bulbapedia.bulbagarden.net/wiki/File:0025Pikachu.png"
                alt="pikachu"
                width={500}
                height={500}
              />
            </div>
            <div className="h-16">content</div>
          </div>
          <div className=" h-fit bg-white rounded-lg">
            <div className="bg-slate-200 rounded-t-lg">
              <Image
                src="https://bulbapedia.bulbagarden.net/wiki/File:0025Pikachu.png"
                alt="pikachu"
                width={500}
                height={500}
              />
            </div>
            <div className="h-16">content</div>
          </div>
          <div className=" h-fit bg-white rounded-lg">
            <div className="bg-slate-200 rounded-t-lg">
              <Image
                src="https://bulbapedia.bulbagarden.net/wiki/File:0025Pikachu.png"
                alt="pikachu"
                width={500}
                height={500}
              />
            </div>
            <div className="h-16">content</div>
          </div>
          <div className=" h-fit bg-white rounded-lg">
            <div className="bg-slate-200 rounded-t-lg">
              <Image
                src="https://bulbapedia.bulbagarden.net/wiki/File:0025Pikachu.png"
                alt="pikachu"
                width={500}
                height={500}
              />
            </div>
            <div className="h-16">content</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
