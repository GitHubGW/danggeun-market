import "moment/locale/ko";
import moment from "moment";

interface CreatedAtProps {
  date?: Date | string;
  size: string;
}

const CreatedAt = ({ date, size }: CreatedAtProps) => {
  const parsedCreatedAt: string = moment(new Date(String(date)), "YYYYMMDD").fromNow() || "방금 전";
  return <span className={`${size} text-gray-400`}>{parsedCreatedAt}</span>;
};

export default CreatedAt;
