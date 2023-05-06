import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-900 h-11 flex justify-between items-center px-6">
      {/* LOGO */}
      <div className="">
        <span className="text-yellow-400 font-extrabold">Pokémon </span>
        <span className="text-white font-extrabold">App</span>
      </div>
      {/* LINK ITEMS */}
      <div>
        <ul className="flex justify-end gap-4">
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
    </nav>
  );
};

export default Navbar;
