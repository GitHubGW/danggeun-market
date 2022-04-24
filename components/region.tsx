interface RegionProps {
  text: string;
  size: string;
}

const Region = ({ text, size }: RegionProps) => {
  return <span className={`${size} text-[#212529]`}>{text}</span>;
};

export default Region;
