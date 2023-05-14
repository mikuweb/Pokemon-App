import React from "react";
import { useState } from "react";

// TODO:HOW TO PUT MAGNIFY GLASS ICON IN INPUT
const Search = () => {
  const [inputvalue, setInputValue] = useState("");
  return (
    <div className="bg-green-100/50 flex flex-col items-center min-h-screen">
      {/* CONTEINER */}
      <div className="border-2 overflow-hidden w-full md:w-9/12 md:max-w-screen-lg">
        <form className=" mt-4 w-10/12 h-16 mx-auto px-4 gap-3 flex justify-between items-center bg-white rounded-xl">
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
      </div>
    </div>
  );
};

export default Search;
