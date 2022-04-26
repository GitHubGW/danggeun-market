interface StreamMessageProps {
  isMe: boolean;
  avatarUrl: string;
  text: string;
}

const StreamMessage = ({ isMe, avatarUrl, text }: StreamMessageProps) => {
  return (
    <div className="flex items-center mb-3">
      <img src={avatarUrl} alt="" className="w-8 h-8 border rounded-full mr-2" />
      <div className={`text-sm py-2 px-3 rounded-3xl ${isMe === true ? "bg-orange-500 text-white" : "bg-gray-200"}`}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default StreamMessage;
