interface CreatedAtProps {
  text: string;
  size: string;
}

const CreatedAt = ({ text, size }: CreatedAtProps) => {
  return <span className={`${size} text-gray-400`}>{text}</span>;
};

export default CreatedAt;
