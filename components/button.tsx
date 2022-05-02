import React from "react";
import Loading from "./loading";

interface ButtonProps {
  loading: boolean;
  type: "button" | "submit" | "reset" | undefined;
  text?: string;
  size?: string;
}

const Button = ({ loading, type, text, size }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${size} flex justify-center items-center cursor-pointer px-4 py-2.5 h-[44px] max-h-[44px] rounded-[4px] text-white bg-orange-400 hover:bg-orange-500`}
    >
      {loading === true ? <Loading color="white" /> : text}
    </button>
  );
};

export default Button;
