import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setOpenMenu((preClick) => !preClick);
  };

  const handleLink = (link: string) => {
    setOpenMenu(false);
    router.push(link);
  };

  const menuClassName = openMenu ? "top-[44px]" : "top-[-100%]";

  return (
    <nav className="bg-blue-900 h-11 flex justify-between items-center px-6">
      {/* LOGO */}
      <div className="">
        <span className="text-yellow-400 text-2xl font-extrabold">
          Pokémon{" "}
        </span>
        <span className="text-white text-2xl font-extrabold">App</span>
      </div>
      {/* LINK ITEMS */}
      <div
        className={`${menuClassName} duration-500 md:static absolute bg-blue-900 bg-opacity-90 md:min-h-fit min-h-[60vh] left-0 w-full md:w-auto flex items-center px-5`}
      >
        <ul className="flex flex-col md:flex-row md:items-center justify-end gap-8 md:gap-4">
          <li>
            <a
              onClick={() => handleLink("/")}
              className="text-white text-lg rounded-full py-1 px-2 hover:border-2 focus:border-2 focus:border-cyan-400 cursor-pointer"
            >
              Game
            </a>
          </li>
          <li>
            <a
              onClick={() => handleLink("/list/0")}
              className="text-white text-lg rounded-full py-1 px-2 hover:border-2 focus:border-2 focus:border-cyan-400 cursor-pointer"
            >
              Pokémon list
            </a>
          </li>
        </ul>
      </div>
      {/* MENU ICON */}
      <div onClick={toggleMenu} className="md:hidden cursor-pointer">
        {openMenu ? (
          <BiX color="white" size={28} />
        ) : (
          <BiMenu color="white" size={28} />
        )}
      </div>
    </nav>
  );
}
