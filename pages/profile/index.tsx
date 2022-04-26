import Link from "next/link";
import Avatar from "../../components/avatar";
import ProductItem from "../../components/product-item";
import Region from "../../components/region";
import Username from "../../components/username";

const Profile = () => {
  return (
    <div className="wrapper">
      <div className="content-sub">
        <div>
          <div className="mb-9">
            <div className="flex items-center space-x-4">
              <div>
                <Avatar avatarUrl="https://newsimg.sedaily.com/2022/02/21/26288ZY0E1_3.jpg" size="w-14" />
              </div>
              <div className="flex flex-col">
                <Username text="포켓몬" size="text-2xl" />
                <Region text="서울 강남구" size="text-lg" />
              </div>
            </div>
          </div>
          <div>
            <div>
              <ul className="flex border-b border-gray-300 pb-2">
                <li className="text-[17px] text-orange-400 font-semibold">
                  <Link href="/profile/sell">
                    <a className="border-b-[3px] border-orange-400 py-2.5 px-7">판매 물품 (0)</a>
                  </Link>
                </li>
                <li className="text-[17px] font-light">
                  <Link href="/profile/buy">
                    <a className="py-2.5 px-7">구매 물품 (0)</a>
                  </Link>
                </li>
                <li className="text-[17px] font-light">
                  <Link href="/profile/like">
                    <a className="py-2.5 px-7">관심 물품 (0)</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <div className="grid grid-cols-3 gap-x-9 gap-y-12">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <ProductItem key={i} productUrl="https://newsimg.sedaily.com/2022/02/21/26288ZY0E1_3.jpg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
