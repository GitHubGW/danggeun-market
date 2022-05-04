interface RegionProps {
  text?: string | null;
  size: string;
}

const Region = ({ text, size }: RegionProps) => {
  return <span className={`${size} text-[#212529]`}>{text === null || text === undefined ? "비공개" : text}</span>;
};

export default Region;
