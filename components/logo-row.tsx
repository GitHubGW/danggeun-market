import Image from "next/image";
import logoMainRow from "public/images/logo_main_row.svg";

interface LogoRowProps {
  size: string;
}

const LogoRow = ({ size }: LogoRowProps) => {
  return <Image src={logoMainRow} alt="" className={`${size}`} />;
};

export default LogoRow;
