import { GuessedState } from "@/pages";
import React from "react";

interface InputProps {
  states: GuessedState[];
  blink: boolean;
}

const Input: React.FC<InputProps> = ({ states, blink }) => {
  const borderColor = blink ? "border-cyan-400" : "border-blue-900";
  return (
    <div
      className={`${borderColor} border-2 w-3/4 py-2 lg:py-3 text-2xl lg:text-4xl font-bold flex items-center justify-center rounded-3xl bg-white uppercase`}
    >
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
