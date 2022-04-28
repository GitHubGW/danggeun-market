import Link from "next/link";
import Avatar from "../../components/avatar";
import ProductItem from "../../components/items/product-item";
import Region from "../../components/region";
import Username from "../../components/username";
import { AiOutlineHeart } from "react-icons/ai";
import Button from "../../components/button";
import Separator from "../../components/separator";
import MainLayout from "../../components/layouts/main-layout";

const ProductDetail = () => {
  return (
    <MainLayout pageTitle="상품 상세정보" hasFooter={true}>
      <div className="wrapper">
        <div className="content-sub">
          {/* 상품 상세 정보 */}
          <div>
            <div className="cursor-pointer">
              <img src="https://newsimg.sedaily.com/2022/02/21/26288ZY0E1_3.jpg" alt="" className="border border-gray-100 rounded-xl w-full h-[500px]" />
            </div>
            <div className="border-b pt-6 pb-5 flex items-center">
              <div>
                <Avatar avatarUrl="https://newsimg.sedaily.com/2022/02/21/26288ZY0E1_3.jpg" size="w-10" />
              </div>
              <div className="flex flex-col ml-2">
                <Link href="/">
                  <a>
                    <Username text="포켓몬" size="text-[15px]" textDecoration={true} />
                  </a>
                </Link>
                <Region text="서울 강남구" size="text-[13px]" />
              </div>
            </div>
            <div className="py-8">
              <h1 className="text-xl font-semibold">포켓몬빵 싸게 팔아요!</h1>
              <p className="text-xs text-gray-400 mt-2 mb-1.5 space-x-1">
                <span>게임/취미</span>
                <Separator />
                <time>1일 전</time>
              </p>
              <p className="font-bold text-[18px]">1,000원</p>
              <p className="font-normal my-5 leading-7 text-[17px]">
                첫 번째 사진에 있는 빵들은 오늘 사온 거예요!
                <br />
                개당 1000원에 팔아요!
                <br />
                유통기한은 넉넉해요!
                <br />
                직거래로만 받고 채팅 주시면 거래장소 조정해봐요!
              </p>
              <p className="text-xs text-gray-400 space-x-1">
                <span>관심 7</span>
                <Separator />
                <span>채팅 17</span>
              </p>
            </div>
            <div className="flex items-center justify-between py-4 border-t border-b">
              <Button type="button" text="채팅으로 거래하기" size="w-full" />
              <AiOutlineHeart className="text-gray-300 text-[44px] p-2 ml-2 cursor-pointer rounded-full hover:bg-gray-100" />
            </div>
          </div>

          {/* 당근마켓 인기중고 */}
          <div>
            <div className="my-8 flex justify-between">
              <h3 className="text-lg font-semibold">당근마켓 인기 중고</h3>
              <Link href="/">
                <a className="text-orange-400 hover:text-orange-500 text-[15px]">더 구경하기</a>
              </Link>
            </div>
            <section>
              <div>
                <div className="content">
                  <div className="grid grid-cols-3 gap-x-10 gap-y-12">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <ProductItem key={i} productUrl="https://newsimg.sedaily.com/2022/02/21/26288ZY0E1_3.jpg" />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
