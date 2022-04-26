import Button from "../../components/button";
import { RiImageAddFill } from "react-icons/ri";
import MainLayout from "../../components/layouts/main-layout";

const CommunityWrite = () => {
  return (
    <MainLayout pageTitle="동네생활 글쓰기" hasFooter={true}>
      <div className="wrapper">
        <div className="content-sub">
          <form className=" flex flex-col">
            <label className="transition-all rounded-lg border-dashed border-2 text-gray-200 hover:border-orange-400 hover:text-orange-400 flex justify-center items-center h-[500px] cursor-pointer">
              <RiImageAddFill className="text-[40px]" />
              <input type="file" accept="image/*" className="hidden" />
            </label>
            <label className="mt-5 mb-2">
              <textarea rows={8} maxLength={400} placeholder="근처의 이웃에게 질문하거나 이야기를 해보세요." className="resize-none input ring-normal" />
            </label>
            <Button type="submit" text="동네생활 글쓰기" size="w-full" />
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default CommunityWrite;
