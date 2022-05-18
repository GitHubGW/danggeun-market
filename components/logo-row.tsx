import Image from "next/image";
import logoMainRow from "public/images/logo_main_row.png";

interface LogoRowProps {
  size: string;
}

const LogoRow = ({ size }: LogoRowProps) => {
  return <Image width={120} height={34} src={logoMainRow} alt="" className={`${size}`} />;
};

export default LogoRow;
