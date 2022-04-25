interface ButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  text: string;
  size?: string;
}

const Button = ({ type, text, size }: ButtonProps) => {
  return (
    <button type={type} className={`${size} cursor-pointer px-4 py-2 rounded-[4px] text-white bg-orange-400 hover:bg-orange-500`}>
      {text}
    </button>
  );
};

export default Button;
