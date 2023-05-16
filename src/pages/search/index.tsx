// import React from "react";
// import Button from "@/components/Button";
// import { NextPage } from "next";
// import Image from "next/image";
// import { useState } from "react";
// import { HiMagnifyingGlass } from "react-icons/hi2";
// import {
//   IoIosArrowDroprightCircle,
//   IoIosArrowDropleftCircle,
// } from "react-icons/io";

// interface SearchProps {
//   pokemon: Array<{
//     id: number;
//     name: string;
//     // Add other props from API
//   }>;
//   next: string;
//   prev: string;
// }

// const Search: NextPage<SearchProps> = ({ pokemon, next, prev }) => {
//   const [inputvalue, setInputValue] = useState("");

//   return (
//     <div className="bg-green-100/50 flex flex-col items-center min-h-screen">
//       {/* CONTEINER */}
//       <div className="border-2 overflow-hidden w-full md:w-9/12 md:max-w-screen-lg flex flex-col">
//         {/* INPUT FORM */}
//         <form className="my-4 pr-3 w-10/12 h-16 mx-auto flex gap-3 justify-center items-center bg-white rounded-xl">
//           <label className="relative block">
//             <span className="absolute inset-y-0 left-0 flex items-center pl-5">
//               <HiMagnifyingGlass size={20} color="#64748b" />
//             </span>
//           </label>
//           <input
//             className="h-12 pl-10 w-full rounded-xl bg-slate-200 px-3 focus:outline-blue-900 focus:outline-8"
//             placeholder="Pokémon name or keywords..."
//             value={inputvalue}
//             onChange={(e) => {
//               setInputValue(e.target.value);
//             }}
//           />
//           <button className="h-12 px-3 bg-blue-950 rounded-xl text-white hover:opacity-70">
//             Search
//           </button>
//         </form>
//         {/* CARD CONTAINER */}
//         <div className="border-2 max-w-xl md:max-w-full mx-auto mt-4 h-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 md:gap-10 lg:gap-8">
//           {/* CARD */}
//           {pokemon.map((pokemon) => {
//             return (
//               <div key={pokemon.id} className=" h-fit bg-white rounded-lg">
//                 <div className="bg-slate-200 rounded-t-lg">
//                   <Image
//                     src="https://bulbapedia.bulbagarden.net/wiki/File:0025Pikachu.png"
//                     alt="pikachu"
//                     width={500}
//                     height={500}
//                   />
//                 </div>
//                 <div className="h-16">{pokemon.name}</div>
//               </div>
//             );
//           })}
//         </div>
//         {/* ARROW BUTTON */}
//         <div className="p-5 flex justify justify-between">
//           <Button onClick={() => {}} className="">
//             <IoIosArrowDropleftCircle />
//             <span>Previous</span>
//           </Button>

//           <Button onClick={() => {}} className="">
//             <span>Next</span>
//             <IoIosArrowDroprightCircle />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Search;

// // Static Generation
// export async function getStaticProps() {
//   const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
//   const data = await response.json();
//   console.log(data);
//   return {
//     props: {
//       pokemon: data.results,
//       next: data.next,
//       prev: data.previous,
//     },
//   };
// }

import React from "react";

const Search = () => {
  return (
    <div className="bg-green-100/50 flex flex-col items-center min-h-screen">
      <div className="bg-white overflow-hidden w-full md:w-9/12 md:max-w-screen-lg flex flex-col justify-center items-center h-screen gap-3 md:gap-5">
        <h1 className="text-3xl md:text-4xl font-bold">
          This page is under construction
        </h1>
        <p className="md:text-lg">We are working on it!</p>
      </div>
    </div>
  );
};

export default Search;
