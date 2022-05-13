import Link from "next/link";
import Avatar from "components/avatar";
import Region from "components/region";
import Username from "components/username";
import { NextRouter, useRouter } from "next/router";
import useSWR from "swr";
import { CommonResult } from "libs/server/withHandler";
import { Prisma, User } from ".prisma/client";

interface UserLayoutProps {
  children: React.ReactNode;
}

interface UserDetailWithCount extends User {
  _count: Prisma.UserCountOutputType;
}

interface UserDetailResult extends CommonResult {
  user?: UserDetailWithCount;
  sellingProducts: number;
  soldOutProducts: number;
}

const UserLayout = ({ children }: UserLayoutProps) => {
  const router: NextRouter = useRouter();
  const { data } = useSWR<UserDetailResult>(router.query.username ? `/api/users/${router.query.username}` : null);

  return (
    <div className="wrapper">
      <div className="content-sub">
        <div>
          <div className="mb-9">
            <div className="flex items-center space-x-4">
              <div>
                <Avatar cloudflareImageId={data?.user?.cloudflareImageId} size="w-14 h-14" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <Username text={data?.user?.username} size="text-xl" textDecoration={false} />
                  <Link href={`/users/${data?.user?.username}/edit`}>
                    <a className="ml-2.5 text-xs border text-gray-400 hover:text-gray-600 hover:border-gray-600 px-1.5 py-0.5 rounded-sm">프로필 수정</a>
                  </Link>
                </div>
                <Region text={data?.user?.address} size="text-md" />
              </div>
            </div>
          </div>
          <div>
            <div>
              <ul className="flex border-b border-gray-300 pb-2 justify-between">
                <li className={`text-[17px] ${router.pathname === "/users/[username]/posts" ? "text-orange-400 font-normal" : "font-normal"}`}>
                  <Link href={`/users/${data?.user?.username}/posts`}>
                    <a className={`py-2.5 px-4 ${router.pathname === "/users/[username]/posts" ? "border-b-[3px] border-orange-400" : ""}`}>
                      동네생활 ({data?.user?._count.posts || 0})
                    </a>
                  </Link>
                </li>
                <li className={`text-[17px] ${router.pathname === "/users/[username]/likes" ? "text-orange-400 font-normal" : "font-normal"}`}>
                  <Link href={`/users/${data?.user?.username}/likes`}>
                    <a className={`py-2.5 px-4 ${router.pathname === "/users/[username]/likes" ? "border-b-[3px] border-orange-400" : ""}`}>
                      관심 목록 ({Number(data?.user?._count.productLikes) + Number(data?.user?._count.postLikes) || 0})
                    </a>
                  </Link>
                </li>
                <li className={`text-[17px] ${router.pathname === "/users/[username]/sales" ? "text-orange-400 font-normal" : "font-normal"}`}>
                  <Link href={`/users/${data?.user?.username}/sales`}>
                    <a className={`py-2.5 px-4 ${router.pathname === "/users/[username]/sales" ? "border-b-[3px] border-orange-400" : ""}`}>
                      판매 물품 ({data?.sellingProducts || 0})
                    </a>
                  </Link>
                </li>
                <li className={`text-[17px] ${router.pathname === "/users/[username]/soldout" ? "text-orange-400 font-normal" : "font-normal"}`}>
                  <Link href={`/users/${data?.user?.username}/soldout`}>
                    <a className={`py-2.5 px-4 ${router.pathname === "/users/[username]/soldout" ? "border-b-[3px] border-orange-400" : ""}`}>
                      판매 완료 ({data?.soldOutProducts || 0})
                    </a>
                  </Link>
                </li>
                <li className={`text-[17px] ${router.pathname === "/users/[username]/reviews" ? "text-orange-400 font-normal" : "font-normal"}`}>
                  <Link href={`/users/${data?.user?.username}/reviews`}>
                    <a className={`py-2.5 px-4 ${router.pathname === "/users/[username]/reviews" ? "border-b-[3px] border-orange-400" : ""}`}>
                      거래 후기 ({data?.user?._count.receivedReviews || 0})
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              {router.pathname === "/users/[username]/posts" && data?.user?._count.posts === 0 && <p className="text-center mt-20">동네생활 게시글이 없습니다. :(</p>}
              {router.pathname === "/users/[username]/likes" && Number(data?.user?._count.productLikes) + Number(data?.user?._count.postLikes) === 0 && (
                <p className="text-center mt-20">관심 목록이 없습니다. :(</p>
              )}
              {router.pathname === "/users/[username]/sales" && data?.sellingProducts === 0 && <p className="text-center mt-20">판매 중인 물품이 없습니다. :(</p>}
              {router.pathname === "/users/[username]/soldout" && data?.soldOutProducts === 0 && <p className="text-center mt-20">판매 완료한 물품이 없습니다. :(</p>}
              {router.pathname === "/users/[username]/reviews" && data?.user?._count.receivedReviews === 0 && <p className="text-center mt-20">거래 후기가 없습니다. :(</p>}
              <div className="grid grid-cols-3 gap-x-9 gap-y-12">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
