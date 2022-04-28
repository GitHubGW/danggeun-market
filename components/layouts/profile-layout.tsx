import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import Avatar from "../../components/avatar";
import Region from "../../components/region";
import Username from "../../components/username";

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  const router: NextRouter = useRouter();

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
                <div className="flex items-center">
                  <Username text="포켓몬" size="text-xl" textDecoration={false} />
                  <Link href="/profile/edit">
                    <a className="ml-2.5 text-xs border text-gray-400 hover:text-gray-600 hover:border-gray-600 px-1.5 py-0.5 rounded-sm">프로필 수정</a>
                  </Link>
                </div>
                <Region text="서울 강남구" size="text-md" />
              </div>
            </div>
          </div>
          <div>
            <div>
              <ul className="flex border-b border-gray-300 pb-2">
                <li className={`text-[17px] ${router.pathname === "/profile/community" ? "text-orange-400 font-normal" : "font-normal"}`}>
                  <Link href="/profile/community">
                    <a className={`py-2.5 px-7 ${router.pathname === "/profile/community" ? "border-b-[3px] border-orange-400" : ""}`}>동네생활 (0)</a>
                  </Link>
                </li>
                <li className={`text-[17px] ${router.pathname === "/profile/sell" ? "text-orange-400 font-normal" : "font-normal"}`}>
                  <Link href="/profile/sell">
                    <a className={`py-2.5 px-7 ${router.pathname === "/profile/sell" ? "border-b-[3px] border-orange-400" : ""}`}>판매 물품 (0)</a>
                  </Link>
                </li>
                <li className={`text-[17px] ${router.pathname === "/profile/buy" ? "text-orange-400 font-normal" : "font-normal"}`}>
                  <Link href="/profile/buy">
                    <a className={`py-2.5 px-7 ${router.pathname === "/profile/buy" ? "border-b-[3px] border-orange-400" : ""}`}>구매 물품 (0)</a>
                  </Link>
                </li>
                <li className={`text-[17px] ${router.pathname === "/profile/like" ? "text-orange-400 font-normal" : "font-normal"}`}>
                  <Link href="/profile/like">
                    <a className={`py-2.5 px-7 ${router.pathname === "/profile/like" ? "border-b-[3px] border-orange-400" : ""}`}>관심 물품 (0)</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <div className="grid grid-cols-3 gap-x-9 gap-y-12">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
