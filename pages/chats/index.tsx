import ChatLayout from "components/layouts/chat-layout";
import { IoChatbubblesOutline } from "react-icons/io5";
import MainLayout from "components/layouts/main-layout";

const Chats = () => {
  return (
    <MainLayout pageTitle="당근채팅" hasFooter={false}>
      <ChatLayout>
        <div className="text-gray-300 h-full flex flex-col justify-center items-center">
          <IoChatbubblesOutline size={80} />
          <p className="text-sm font-medium mt-3">채팅할 상대를 선택해주세요.</p>
        </div>
      </ChatLayout>
    </MainLayout>
  );
};

export default Chats;
