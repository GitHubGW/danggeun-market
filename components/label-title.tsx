interface LabelTitleProps {
  text: string;
}

const LabelTitle = ({ text }: LabelTitleProps) => {
  return <h2 className="label-title">{text}</h2>;
};

export default LabelTitle;
