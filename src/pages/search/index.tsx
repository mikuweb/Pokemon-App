import { NextPage } from "next";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

interface SearchProps {
  pokemon: Array<{
    id: number;
    name: string;
    sprites: {
      other: {
        home: {
          front_default: string;
        };
      };
    };
    // Add other props from API
  }>;
}

const Search: NextPage<SearchProps> = ({ pokemon }) => {
  const [inputvalue, setInputValue] = useState("");

  return (
    <div className="bg-green-100/50 flex flex-col items-center min-h-screen">
      {/* CONTEINER */}
      <div className="border-2 overflow-hidden w-full md:w-9/12 md:max-w-screen-lg flex flex-col">
        {/* INPUT FORM */}
        <form className="my-4 pr-3 w-10/12 h-16 mx-auto flex gap-3 justify-center items-center bg-white rounded-xl">
          <label className="relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-5">
              <HiMagnifyingGlass size={20} color="#64748b" />
            </span>
          </label>
          <input
            className="h-12 pl-10 w-full rounded-xl bg-slate-200 px-3 focus:outline-blue-900 focus:outline-8"
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
        <div className="border-2 max-w-xl md:max-w-full mx-auto mt-4 h-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 md:gap-10 lg:gap-8">
          {/* CARD */}
          {pokemon.map((pokemon) => {
            return (
              <div key={pokemon.id} className=" h-fit bg-white rounded-lg">
                <div className="bg-slate-200 rounded-t-lg">
                  <Image
                    src={pokemon.sprites.other.home.front_default}
                    alt="pikachu"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="h-16">{pokemon.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;

// Static Generation
export async function getStaticProps() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
  const data = await response.json();
  console.log(data);
  return {
    props: {
      pokemon: data.results,
    },
  };
}
