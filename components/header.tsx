import Link from "next/link";
import LogoRow from "./logo-row";
import { BiSearch } from "react-icons/bi";
import Avatar from "./avatar";
import useMe from "libs/client/useMe";

const Header = () => {
  const me = useMe();

  return (
    <header className="py-3 border-b border-gray-200 h-[63px] max-h-[63px]">
      <nav className="content flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <a className="mb-1.5">
              <LogoRow size="w-32" />
            </a>
          </Link>
          <form className="ml-8 relative">
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
        <div className={`${me ? "space-x-5" : "space-x-10"}  max-w-md flex items-center justify-end font-medium`}>
          <Link href="/products">
            <a>중고거래</a>
          </Link>
          <Link href="/posts">
            <a>동네생활</a>
          </Link>
          <Link href="/streams">
            <a>라이브</a>
          </Link>
          {me && (
            <Link href="/chats">
              <a>당근채팅</a>
            </Link>
          )}
          {me && (
            <Link href={`/users/${me.username}/posts`}>
              <a>
                <Avatar avatarUrl={me.avatarUrl} size="w-10" />
              </a>
            </Link>
          )}
          {me && (
            <Link href="/logout">
              <a className="bg-orange-400 hover:bg-orange-500 py-2 px-3.5 text-white rounded-md">로그아웃</a>
            </Link>
          )}
          {me === undefined && (
            <Link href="/login">
              <a className="bg-orange-400 hover:bg-orange-500 py-2 px-3.5 text-white rounded-md">로그인</a>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
