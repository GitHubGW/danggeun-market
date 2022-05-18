import Link from "next/link";
import LogoRow from "./logo-row";
import { BiSearch } from "react-icons/bi";
import Avatar from "./avatar";
import useMe from "libs/client/useMe";
import useMutation from "libs/client/useMutation";
import { CommonResult } from "libs/server/withHandler";
import { useForm } from "react-hook-form";
import { NextRouter, useRouter } from "next/router";
import { useEffect } from "react";

interface SearchFormData {
  keyword: string;
}

const Header = () => {
  const me = useMe();
  const router: NextRouter = useRouter();
  const [logoutMutation, { data, loading }] = useMutation<CommonResult>("/api/logout");
  const { register, handleSubmit, getValues } = useForm<SearchFormData>({ defaultValues: { keyword: "" } });

  const handleLogout = async () => {
    if (loading === true) {
      return;
    }
    await logoutMutation();
  };

  const onValid = () => {
    const { keyword } = getValues();
    router.push(`/search?keyword=${keyword}`);
  };

  useEffect(() => {
    if (data?.ok === true) {
      router.push("/login");
    }
  }, [data, router]);

  return (
    <header className="py-3 border-b border-gray-200 h-[63px] max-h-[63px]">
      <nav className="content flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <a>
              <LogoRow size="w-32" />
            </a>
          </Link>
          <form onSubmit={handleSubmit(onValid)} className="ml-10 relative">
            <input
              {...register("keyword", { required: true, maxLength: 30 })}
              required
              maxLength={30}
              type="text"
              placeholder="동네생활, 물품명 등을 검색해보세요!"
              className="rounded-md outline-none border focus:border-black w-[380px] px-3 py-1.5 pr-12 text-md placeholder:text-gray-300"
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
            <a>스트리밍</a>
          </Link>
          {me && (
            <Link href="/chats">
              <a>당근채팅</a>
            </Link>
          )}
          {me && (
            <Link href={`/users/${me.username}/posts`}>
              <a>
                <Avatar cloudflareImageId={me.cloudflareImageId} size="w-[38px] h-[38px]" />
              </a>
            </Link>
          )}
          {me && (
            <button onClick={handleLogout} type="button" className="bg-orange-400 hover:bg-orange-500 py-2 px-3.5 text-white rounded-md">
              로그아웃
            </button>
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
