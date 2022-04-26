import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import CreatedAt from "../../components/created-at";
import FloatingButton from "../../components/floating-button";
import MainLayout from "../../components/layouts/main-layout";
import Region from "../../components/region";
import Separator from "../../components/separator";
import Username from "../../components/username";

const Community = () => {
  return (
    <MainLayout pageTitle="동네생활" hasFooter={true}>
      <div className="wrapper bg-[#F8F9FA] relative">
        <div className="content-community">
          <div className="border rounded-lg bg-white px-8 py-4">
            <h1 className="text-lg font-medium">동네생활</h1>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div key={i} className="py-6 border-b border-gray-200 last-of-type:border-none">
                <h2>안녕하세요 cgv 아르바이트 해보신분 있으신가요?? 영화 포스터 구할 수 있는 곳 있을까요?</h2>
                <div className="flex justify-between mt-1">
                  <div className="space-x-[1px]">
                    <Username text="포켓몬" size="text-[14px]" />
                    <Separator />
                    <Region text="서울 강남구" size="text-[14px]" />
                    <Separator />
                    <CreatedAt text="2시간 전" size="text-[14px]" />
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex items-center">
                      <FaRegComment className="text-gray-400 mr-1" />
                      <span className="text-sm">8</span>
                    </div>
                    <div className="flex items-center">
                      <AiOutlineHeart className="text-red-400 mr-0.5" />
                      <span className="text-sm">12</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <span className="text-center block text-gray-600 mt-6 cursor-pointer">더보기</span>
          </div>
        </div>
        <FloatingButton href="/community/write">
          <RiPencilFill />
        </FloatingButton>
      </div>
    </MainLayout>
  );
};

export default Community;
