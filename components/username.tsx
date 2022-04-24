interface UsernameProps {
  text: string;
  size: string;
}

const Username = ({ text, size }: UsernameProps) => {
  return <span className={`${size} font-medium hover:underline cursor-pointer`}>{text}</span>;
};

export default Username;
