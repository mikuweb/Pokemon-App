import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="animate-bounce px-3 py-1 text-lg md:text-xl flex items-center justify-center gap-1 font-semibold border-2 border-blue-600 bg-white hover:bg-blue-100 text-blue-600 rounded-full"
    >
      {children}
    </button>
  );
};

export default Button;
