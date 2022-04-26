import Avatar from "../../components/avatar";
import ChatLayout from "../../components/layouts/chat-layout";
import Message from "../../components/message";
import Username from "../../components/username";

const ChatDetail = () => {
  return (
    <ChatLayout>
      <div className="h-full pb-3">
        <div className="h-[calc(100%_-_110px)]">
          <div className="flex items-center space-x-2 px-3 border-b max-h-[61px] h-[61px]">
            <Avatar
              avatarUrl="https://d1unjqcospf8gs.cloudfront.net/assets/users/default_profile_256_disabled-97ac2510cb2860b9e37caf23beb1e8e0ca130152a119b65402c4673af18bf2a1.png"
              size="w-9"
            />
            <Username text="포켓몬" size="text-base" />
          </div>
          <div className="h-full pb-16">
            <div className="px-3 h-full overflow-auto pt-4">
              <Message isMe={true} text="안녕하세요" createdAt="오후 7:00" />
              <Message
                isMe={false}
                text="안녕하세요"
                createdAt="오후 7:10"
                avatarUrl="https://d1unjqcospf8gs.cloudfront.net/assets/users/default_profile_256_disabled-97ac2510cb2860b9e37caf23beb1e8e0ca130152a119b65402c4673af18bf2a1.png"
              />
            </div>
          </div>
        </div>
        <form className="px-3">
          <div className="relative w-full border px-2.5 py-2 rounded-md outline-none h-[110px] max-h-28 bg-white">
            <textarea rows={2} maxLength={190} placeholder="메세지를 입력해주세요." className="resize-none text-[15px] outline-none w-full placeholder:text-gray-300" />
            <div className="absolute right-2 bottom-2 flex items-end">
              <div className="text-sm text-gray-300 mr-3 mb-1">
                <span>0</span>/190
              </div>
              <button type="submit" className="px-4 py-1.5 rounded-md bg-orange-400 hover:bg-orange-500 text-sm text-white">
                전송
              </button>
            </div>
          </div>
        </form>
      </div>
    </ChatLayout>
  );
};

export default ChatDetail;