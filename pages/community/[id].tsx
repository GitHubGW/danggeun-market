import Link from "next/link";
import Avatar from "../../components/avatar";
import CreatedAt from "../../components/created-at";
import ProductItem from "../../components/product-item";
import Region from "../../components/region";
import Username from "../../components/username";

const CommunityDetail = () => {
  return (
    <div className="wrapper">
      <div className="content-sub">
        {/* 동네생활 정보 */}
        <div>
          <div className="cursor-pointer">
            <img src="https://newsimg.sedaily.com/2022/02/21/26288ZY0E1_3.jpg" alt="" className="border border-gray-100 rounded-xl w-full h-[500px]" />
          </div>
          <div className="border-b pt-6 pb-5 flex items-center">
            <div>
              <Avatar avatarUrl="https://newsimg.sedaily.com/2022/02/21/26288ZY0E1_3.jpg" size="w-10" />
            </div>
            <div className="flex flex-col ml-2">
              <Username text="포켓몬" size="text-[15px]" />
              <Region text="서울 강남구" size="text-[13px]" />
            </div>
          </div>
          <div className="py-8">
            <p className="font-normal leading-7 text-[17px]">
              첫 번째 사진에 있는 빵들은 오늘 사온 거예요!
              <br />
              개당 1000원에 팔아요!
              <br />
              유통기한은 넉넉해요!
              <br />
              직거래로만 받고 채팅 주시면 거래장소 조정해봐요!
            </p>
            <p className="text-xs text-gray-400 space-x-1 mt-4">
              <CreatedAt text="17시간 전" size="text-[12px]" />
            </p>
          </div>
          <div className="border-t py-6 border-gray-200">
            <div className="flex items-center mb-3 space-x-5">
              <div className="text-[17px] font-semibold">댓글 2</div>
              <div className="flex items-center text-[17px] font-semibold">
                <img src="/images/heart_icon.svg" alt="" className="w-5 h-5 mr-1 -mt-0.5 cursor-pointer" />
                <span>12</span>
              </div>
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="border-b border-b-gray-200 py-5 last-of-type:border-none">
                <div className="flex items-center space-x-2">
                  <Avatar avatarUrl="https://newsimg.sedaily.com/2022/02/21/26288ZY0E1_3.jpg" size="w-6" />
                  <Username text="포켓몬" size="text-[15px]" />
                  <Region text="서울시 강남구" size="text-[13px]" />
                </div>
                <div className="mt-2 text-[15px]">월요일에 금,토,일 분 순차적으로 입금되는거라 다른 평일에 비해 좀 늦으실 수 있어요</div>
                <CreatedAt text="3시간 전" size="text-[13px]" />
              </div>
            ))}
          </div>
        </div>

        {/* 댓글 form */}
        <form className="flex items-center relative border-t border-b py-6 border-gray-200">
          <img src="https://newsimg.sedaily.com/2022/02/21/26288ZY0E1_3.jpg" alt="" className="border mr-2 border-gray-100 rounded-xl w-9 h-9" />
          <input
            type="text"
            placeholder="댓글을 입력해 주세요."
            className="w-full border px-4 py-1.5 rounded-full outline-none placeholder:text-gray-300 text-[15px] ring-normal"
          />
          <button type="submit" className="absolute rounded-full right-[4px] text-xs cursor-pointer px-3 py-1.5 text-white bg-orange-400 hover:bg-orange-500">
            작성
          </button>
        </form>

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
  );
};

export default CommunityDetail;
