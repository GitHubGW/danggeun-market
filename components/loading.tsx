import Image from "next/image";
import loadingOrange from "public/images/loading_orange.gif";
import loadingWhite from "public/images/loading_white.gif";

interface LoadingProps {
  color: string;
}

const Loading = ({ color }: LoadingProps) => {
  return <>{color === "orange" ? <Image width={20} height={20} src={loadingOrange} alt="" /> : <Image width={20} height={20} src={loadingWhite} alt="" />}</>;
};

export default Loading;
