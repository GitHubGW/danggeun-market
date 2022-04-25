interface LogoColumnProps {
  size: string;
}

const LogoColumn = ({ size }: LogoColumnProps) => {
  return <img src="/images/logo_main_column.png" alt="" className={`${size}`} />;
};

export default LogoColumn;
