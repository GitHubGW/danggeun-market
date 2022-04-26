import MainLayout from "../../components/layouts/main-layout";
import StreamMessage from "../../components/stream-message";

const StreamDetail = () => {
  return (
    <MainLayout pageTitle="스트림" hasFooter={false}>
      <div className="wrapper">
        <div className="max-w-[700px] mx-auto h-full pt-8 pb-8">
          <div className="">
            <div className="w-full rounded-lg bg-slate-200 h-[470px]"></div>
            <div className="mt-3 mb-4">
              <h1 className="text-lg font-medium">[생방송]🥕 실시간 스트리밍 방송</h1>
              <p className="text-[15px] text-gray-400 mt-0.5">실시간 스트리밍 방송 중입니다.</p>
            </div>
          </div>
          <div className="border border-gray-100 rounded-lg">
            <div className="px-3 pt-4 relative h-[40vh] bg-neutral-50 overflow-auto scrollbar-hide">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                <StreamMessage key={i} isMe={i % 2 === 0 ? true : false} avatarUrl={"/images/character1.png"} text={"안녕하세요"} />
              ))}
            </div>
            <form className="w-full px-1 py-1 border-t">
              <div className="relative w-full px-2 py-2 rounded-md outline-none bg-white">
                <input placeholder="메세지를 입력해주세요." className="text-[15px] outline-none w-full placeholder:text-gray-300" />
                <button type="submit" className="absolute right-0.5 bottom-1 flex items-end px-4 py-1.5 rounded-md bg-orange-400 hover:bg-orange-500 text-sm text-white">
                  전송
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StreamDetail;
