import { NextPage } from "next";
import Link from "next/link";
import ProductItem from "components/items/product-item";
import FloatingButton from "components/floating-button";
import { BsBagPlusFill } from "react-icons/bs";
import MainLayout from "components/layouts/main-layout";
import useMe from "libs/client/useMe";
import { Product } from ".prisma/client";
import useSWRInfiniteClick from "libs/client/useSWRInfiniteClick";
import Image from "next/image";
import backgroundMain1 from "public/images/background_main1.png";
import backgroundMain2 from "public/images/background_main2.png";
import backgroundMain3 from "public/images/background_main3.png";
import backgroundMain4 from "public/images/background_main4.png";
import storyIcon1 from "public/images/story_icon1.svg";
import storyIcon2 from "public/images/story_icon2.svg";
import storyIcon3 from "public/images/story_icon3.svg";

interface ProductWithUserAndCount extends Product {
  user: { id: number; username: string; cloudflareImageId: string | null; address: string | null };
  _count: { productLikes: number };
}

const Home: NextPage = () => {
  const me = useMe();
  const infiniteData = useSWRInfiniteClick<ProductWithUserAndCount>(`/api/products`);

  return (
    <MainLayout pageTitle="홈" hasFooter={true}>
      <div className="wrapper relative">
        <div>
          {/* 당신 근처의 당근마켓 */}
          <section>
            <div className="bg-[#FBF7F2] h-[700px]">
              <div className="content flex relative">
                <div className="flex-[1] justify-center items-center flex">
                  <div>
                    <h2 className="font-semibold text-5xl leading-tight">
                      당신 근처의
                      <br />
                      당근마켓
                    </h2>
                    <p className="mt-10">
                      중고 거래부터 동네 정보까지, 이웃과 함께해요.
                      <br />
                      가깝고 따뜻한 당신의 근처를 만들어요.
                    </p>
                  </div>
                </div>
                <div className="flex-[2] flex items-end">
                  <Image src={backgroundMain1} alt="" placeholder="blur" />
                </div>
              </div>
            </div>
          </section>

          {/* 우리 동네 중고 직거래 마켓 */}
          <section>
            <div className="bg-white h-[700px]">
              <div className="content flex relative">
                <div className="flex-[1] flex items-end">
                  <Image src={backgroundMain2} alt="" placeholder="blur" />
                </div>
                <div className="flex-[1] justify-center items-center flex">
                  <div>
                    <h2 className="font-semibold text-[40px] leading-tight">
                      우리 동네
                      <br />
                      중고 직거래 마켓
                    </h2>
                    <p className="mt-7">동네 주민들과 가깝고 따뜻한 거래를 지금 경험해보세요.</p>
                    <div className="mt-7 flex space-x-5">
                      <Link href="/products">
                        <a className="hover:bg-gray-200 px-6 py-4 rounded-md bg-gray-100 text-lg font-semibold">인기매물 보기</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 이웃과 함께 하는 동네생활 */}
          <section>
            <div className="bg-[#E6F3E6] h-[720px]">
              <div className="content flex relative">
                <div className="flex-[1] justify-center items-center flex">
                  <div className="w-full">
                    <h2 className="font-semibold text-[40px] leading-tight">
                      이웃과 함께 하는
                      <br />
                      동네생활
                    </h2>
                    <p className="mt-6">우리 동네의 다양한 이야기를 이웃과 함께 나누어요.</p>
                    <div className="flex mt-10 gap-x-16">
                      <div>
                        <Image src={storyIcon1} alt="" />
                        <h2 className="font-semibold text-sm mt-4 mb-2">우리 동네 질문</h2>
                        <p className="text-xs leading-4">
                          궁금한 게 있을 땐<br />
                          이웃에세 물어보세요.
                        </p>
                      </div>
                      <div>
                        <Image src={storyIcon2} alt="" />
                        <h2 className="font-semibold text-sm mt-4 mb-2">동네 분실 센터</h2>
                        <p className="text-xs leading-4">
                          무언가를 잃어버렸을 때,
                          <br />
                          함께 찾을 수 있어요.
                        </p>
                      </div>
                      <div>
                        <Image src={storyIcon3} alt="" />
                        <h2 className="font-semibold text-sm mt-4 mb-2">동네 모임</h2>
                        <p className="text-xs leading-4">
                          관심사가 비슷한 이웃과
                          <br />
                          온오프라인으로 만나요.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-[1] flex items-end">
                  <Image src={backgroundMain3} alt="" placeholder="blur" />
                </div>
              </div>
            </div>
          </section>

          {/* 내 근처에서 찾는 동네가게 */}
          <section>
            <div className="bg-white h-[700px]">
              <div className="content flex relative">
                <div className="flex-[1] flex items-end">
                  <Image src={backgroundMain4} alt="" placeholder="blur" />
                </div>
                <div className="flex-[1] justify-center items-center flex">
                  <div>
                    <h2 className="font-semibold text-[40px] leading-tight">
                      내 근처에서 찾는
                      <br />
                      동네가게
                    </h2>
                    <p className="mt-7">
                      우리 동네 가게를 찾고 있나요?
                      <br />
                      동네 주민이 남긴 진짜 후기를 함께 확인해보세요!
                    </p>
                    <div className="mt-7 flex space-x-5">
                      <Link href="/posts">
                        <a className="hover:bg-gray-200 px-6 py-4 rounded-md bg-gray-100 text-lg font-semibold">동네생활 보기</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 중고거래 인기매물 */}
          <section>
            <div className="bg-[#F8F9FA]">
              <div className="content py-20">
                <h2 className="font-semibold text-4xl leading-tight text-center">중고거래 인기매물</h2>
                <div className="grid grid-cols-4 mt-14 gap-x-10 gap-y-12">
                  {infiniteData.map((product) => (
                    <ProductItem
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      cloudflareImageId={product.cloudflareImageId}
                      user={product.user}
                      _count={product._count}
                    />
                  ))}
                </div>
                <Link href="/products">
                  <a className="underline mt-14 text-center font-semibold block">인기매물 더 보기</a>
                </Link>
              </div>
            </div>
          </section>

          {/* 중고거래 인기검색어 */}
          <section>
            <div className="bg-white py-10">
              <div className="content flex items-center justify-between">
                <Link href="/">
                  <a className="underline font-semibold">중고거래 인기검색어</a>
                </Link>
                <Link href="/">
                  <a className="hover:underline">자전거</a>
                </Link>
                <Link href="/">
                  <a className="hover:underline">캠핑</a>
                </Link>
                <Link href="/">
                  <a className="hover:underline">패딩</a>
                </Link>
                <Link href="/">
                  <a className="hover:underline">의자</a>
                </Link>
                <Link href="/">
                  <a className="hover:underline">노트북</a>
                </Link>
                <Link href="/">
                  <a className="hover:underline">아이폰</a>
                </Link>
              </div>
            </div>
          </section>
        </div>
        <FloatingButton href="/products/upload">
          <BsBagPlusFill />
        </FloatingButton>
      </div>
    </MainLayout>
  );
};

export default Home;
