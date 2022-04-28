import Link from "next/link";
import LogoRow from "./logo-row";
import { BiSearch } from "react-icons/bi";
import Avatar from "./avatar";

const Header = () => {
  return (
    <header className="py-3 border-b border-gray-200 h-[63px] max-h-[63px]">
      <nav className="content flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <a>
              <LogoRow size="w-32" />
            </a>
          </Link>
          <form className="ml-7 relative">
            <input
              type="text"
              placeholder="동네 이름, 물품명 등을 검색해보세요!"
              className="rounded-md outline-none border focus:border-black w-[400px] px-3 py-1.5 text-md placeholder:text-gray-300"
            />
            <button type="submit" className="absolute text-gray-400 right-3.5 top-1/2 -translate-y-1/2">
              <BiSearch size={20} />
            </button>
          </form>
        </div>
        <div className="max-w-md flex items-center justify-end space-x-10 font-medium">
          <Link href="/community">
            <a>동네생활</a>
          </Link>
          <Link href="/streams">
            <a>라이브</a>
          </Link>
          <Link href="/chats">
            <a>당근채팅</a>
          </Link>
          <Link href="/users/community">
            <a>
              <Avatar
                avatarUrl="https://d1unjqcospf8gs.cloudfront.net/assets/users/default_profile_256_disabled-97ac2510cb2860b9e37caf23beb1e8e0ca130152a119b65402c4673af18bf2a1.png"
                size="w-9"
              />
            </a>
          </Link>
          <Link href="/login">
            <a className="bg-orange-400 hover:bg-orange-500 py-2.5 px-5 text-white rounded-md">로그인</a>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
