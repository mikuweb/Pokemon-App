import { GuessedState } from "@/pages";
import React from "react";

interface InputProps {
  states: GuessedState[];
}

const Input: React.FC<InputProps> = ({ states }) => {
  return (
    //TODO How to blink border color when key is pressed
    <div className="w-3/4 py-2 lg:py-3 text-2xl lg:text-4xl font-bold flex items-center justify-center rounded-3xl bg-white border-2 border-blue-900 uppercase">
      {states.map((state, index) =>
        state.guessed ? (
          <span key={index}>{state.key}</span>
        ) : (
          <span key={index}>__</span>
        )
      )}
    </div>
  );
};

export default Input;
