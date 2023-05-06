import React from "react";
import { BiMenu } from "react-icons/bi";
// 15:05
const Navbar = () => {
  return (
    <nav className="bg-blue-900 h-11 flex justify-between items-center px-6">
      {/* LOGO */}
      <div className="">
        <span className="text-yellow-400 font-extrabold">Pokémon </span>
        <span className="text-white font-extrabold">App</span>
      </div>
      {/* LINK ITEMS */}
      <div className="md:static absolute bg-blue-900 bg-opacity-90 md:min-h-fit min-h-[60vh] left-0 top-[44px] w-full md:w-auto flex items-center px-5">
        <ul className="flex flex-col md:flex-row md:items-center justify-end gap-8 md:gap-4">
          <li>
            <a
              className="text-white rounded-full py-1 px-2 hover:border-2 active:border-2 active:border-cyan-400"
              href="#"
            >
              Guess Pokémon
            </a>
          </li>
          <li>
            <a
              className="text-white rounded-full py-1 px-2 hover:border-2 active:border-2 active:border-cyan-400"
              href="#"
            >
              Search
            </a>
          </li>
        </ul>
      </div>
      {/* MENU ICON */}
      <div className="md:hidden">
        <BiMenu color="white" size={28} />
      </div>
    </nav>
  );
};

export default Navbar;
