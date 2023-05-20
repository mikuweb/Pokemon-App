import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} px-3 py-1 text-base md:text-lg flex items-center justify-center gap-1 font-semibold border-2 border-blue-600 bg-white hover:bg-blue-100 active:border-cyan-400 text-blue-600 rounded-full`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
