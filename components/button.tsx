import React from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  text?: string;
  size?: string;
  children?: React.ReactNode;
}

const Button = ({ type, text, size, children }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${size} flex justify-center items-center cursor-pointer px-4 py-2.5 h-[44px] max-h-[44px] rounded-[4px] text-white bg-orange-400 hover:bg-orange-500`}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
