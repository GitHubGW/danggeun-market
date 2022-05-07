import { FaCrown } from "react-icons/fa";

interface StreamMessageProps {
  username: string;
  avatarUrl: string | null;
  text: string;
  isMe: boolean;
}

const StreamMessage = ({ username, avatarUrl, text, isMe }: StreamMessageProps) => {
  return (
    <div className="flex items-center mb-3">
      <img src={avatarUrl ? avatarUrl : "/images/basic_user.png"} alt="" className="w-8 h-8 border rounded-full" />
      <div className="text-[13px] text-gray-500 ml-1.5 mr-2 flex items-center">
        <span className="text-[10px] text-orange-500 mr-0.5">{isMe === true ? <FaCrown /> : null}</span>
        <span>{username}</span>
      </div>
      <div className="text-[14px] rounded-3xl">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default StreamMessage;
