import Link from "next/link";
import LogoRow from "./logo-row";
import { BiSearch } from "react-icons/bi";

const Header = () => {
  return (
    <header className="py-4 border-b border-gray-200">
      <nav className="content flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <a>
              <LogoRow size="w-28" />
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
        <div>
          <Link href="/community/write">
            <a className="bg-orange-400 hover:bg-orange-500 py-2.5 px-2 text-white rounded-md">동네생활 글쓰기</a>
          </Link>
          <Link href="/community">
            <a className="bg-orange-400 hover:bg-orange-500 py-2.5 px-2 text-white rounded-md">동네생활</a>
          </Link>
          <Link href="/products/1">
            <a className="bg-orange-400 hover:bg-orange-500 py-2.5 px-2 text-white rounded-md">상품 디테일</a>
          </Link>
          <Link href="/chats">
            <a className="bg-orange-400 hover:bg-orange-500 py-2.5 px-2 text-white rounded-md">채팅</a>
          </Link>
          <Link href="/profile">
            <a className="bg-orange-400 hover:bg-orange-500 py-2.5 px-2 text-white rounded-md">나의 당근</a>
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
