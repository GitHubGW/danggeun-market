import Image from "next/image";
import loadingWhite from "public/images/loading_white.gif";
import loadingOrange from "public/images/loading_orange.gif";

interface LoadingProps {
  color: string;
  size: number;
}

const Loading = ({ color, size }: LoadingProps) => {
  return <>{color === "orange" ? <Image width={size} height={size} src={loadingOrange} alt="" /> : <Image width={size} height={size} src={loadingWhite} alt="" />}</>;
};

export default Loading;
