interface RegionProps {
  text?: string | null;
  size: string;
}

const Region = ({ text, size }: RegionProps) => {
  const gu = text?.split(" ")[2];
  const dong = text?.split(" ")[3];

  return <span className={`${size} text-[#212529]`}>{text === null || text === undefined ? "비공개" : `${gu} ${dong}`}</span>;
};

export default Region;
