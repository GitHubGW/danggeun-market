interface ButtonProps {
  text: string;
  size?: string;
}

const Button = ({ text, size }: ButtonProps) => {
  return (
    <button type="button" className={`${size} cursor-pointer px-4 py-2 rounded-[4px] text-white bg-orange-400 hover:bg-orange-500`}>
      {text}
    </button>
  );
};

export default Button;
