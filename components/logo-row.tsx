interface LogoRowProps {
  size: string;
}

const LogoRow = ({ size }: LogoRowProps) => {
  return <img src="/images/logo_main_row.svg" alt="" className={`${size}`} />;
};

export default LogoRow;
