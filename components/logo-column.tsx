import Image from "next/image";
import logoMainColumn from "public/images/logo_main_column.png";

interface LogoColumnProps {
  size: string;
}

const LogoColumn = ({ size }: LogoColumnProps) => {
  return <Image src={logoMainColumn} alt="" className={`${size}`} />;
};

export default LogoColumn;
