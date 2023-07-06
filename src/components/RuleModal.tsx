import React from "react";
import { AiOutlineClose } from "react-icons/ai";

interface RuleModalProps {
  toggleModal: () => void;
}
const RuleModal: React.FC<RuleModalProps> = ({ toggleModal }) => {
  return (
    <>
      <div
        className="
      justify-center
      items-center
      flex
      overflow-x-hidden
      overflow-y-auto
      fixed
      inset-0
      z-50
      outline-none
      focus:outline-none
      bg-neutral-700
      bg-opacity-70
      "
      >
        <div
          className="
        relative
        w-full
        md:w-3/6
        my-6
        mx-auto
        md:max-w-3xl
        h-hull
        md:h-auto
        "
        >
          {/* Content */}
          <div
            className="
          h-full
          md:h-auto
          rounded-lg
          shadow-lg
          relative
          flex
          flex-col
          w-full
          bg-blue-700/80
          outline-none
          focus:outline-none
          "
          >
            {/* Header */}
            <div
              className="
            flex
            items-center
            justify-between
            p-10
            rounded-t
            "
            >
              <h3 className="text-3xl font-bold text-yellow-400">
                Rule of the game
              </h3>
              <button
                onClick={toggleModal}
                className="
              p-1
              ml-auto
              border-2
              border-white
              hover:opacity-70
              text-white
              rounded-full
              transition
              "
              >
                <AiOutlineClose size={25} />
              </button>
            </div>
            {/* Body */}
            <div
              className="
              text-white
              relative
            pb-10
            flex
            justify-center
            "
            >
              <ul className="list-disc text-2xl">
                <li className="pb-2">
                  <p>You guess the Pokémon name</p>
                </li>
                <li className="pb-2">
                  <p>Every correct guess awards 10 Pts</p>
                </li>
                <li className="pb-2">
                  <p>Solving award 20 Pts</p>
                </li>
                <li className="pb-2">
                  <p>Every mistake deducts 15 Pts</p>
                </li>
                <li>
                  <p>Have fun playing!</p>
                </li>
              </ul>
            </div>
            {/* FOOTER */}
          </div>
        </div>
      </div>
    </>
  );
};

export default RuleModal;
