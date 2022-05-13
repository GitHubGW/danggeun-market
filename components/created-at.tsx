import "moment/locale/ko";
import moment from "moment";

interface CreatedAtProps {
  date?: Date | string;
  size: string;
  style?: string;
}

const CreatedAt = ({ date, size, style }: CreatedAtProps) => {
  const parsedCreatedAt: string = moment(new Date(String(date)), "YYYYMMDD").fromNow() || "방금 전";
  return <span className={`${size} ${style} text-gray-400`}>{parsedCreatedAt}</span>;
};

export default CreatedAt;
