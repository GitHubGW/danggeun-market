import MainLayout from "../../components/layouts/main-layout";
import StreamItem from "../../components/items/stream-item";
import FloatingButton from "../../components/floating-button";
import { RiVideoAddFill } from "react-icons/ri";

const Stream = () => {
  return (
    <MainLayout pageTitle="스트림" hasFooter={true}>
      <div className="wrapper relative">
        <div className="content mt-8">
          <div className="grid grid-cols-3 gap-4">
            {[...new Array(17)].map((i) => (
              <StreamItem key={i} title={"[생방송]🥕 실시간 스트리밍 방송"} />
            ))}
          </div>
        </div>
        <FloatingButton href="/streams/create">
          <RiVideoAddFill />
        </FloatingButton>
      </div>
    </MainLayout>
  );
};

export default Stream;
