interface MessageProps {
  isMe: boolean;
  avatarUrl?: string;
  createdAt: string;
  text: string;
}

const Message = ({ isMe, avatarUrl, text, createdAt }: MessageProps) => {
  return (
    <>
      {isMe === true ? (
        <div className="flex flex-row-reverse items-end mb-4">
          <div className="text-sm bg-orange-500 text-white rounded-2xl rounded-tr-none py-2.5 px-3.5">
            <p>{text}</p>
          </div>
          <time className="text-xs text-gray-400 mr-1">{createdAt}</time>
        </div>
      ) : (
        <div className="flex mb-4">
          <img src={avatarUrl} alt="" className="w-8 h-8 border rounded-full mr-2" />
          <div className="text-sm bg-gray-200 rounded-3xl rounded-tl-none py-2.5 px-3.5">
            <p>{text}</p>
          </div>
          <div className="flex items-end">
            <time className="text-xs text-gray-400 ml-1">{createdAt}</time>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
