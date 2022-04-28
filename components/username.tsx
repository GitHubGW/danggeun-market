interface UsernameProps {
  text: string;
  size: string;
  textDecoration: boolean;
}

const Username = ({ text, size, textDecoration }: UsernameProps) => {
  return <span className={`${size} ${textDecoration === true ? "hover:underline" : ""} font-medium cursor-pointer`}>{text}</span>;
};

export default Username;
