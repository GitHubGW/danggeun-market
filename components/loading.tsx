interface LoadingProps {
  color: string;
}

const Loading = ({ color }: LoadingProps) => {
  return <>{color === "orange" ? <img src="/images/loading_orange.gif" alt="" className="w-5" /> : <img src="/images/loading_white.gif" alt="" className="w-5" />}</>;
};

export default Loading;
