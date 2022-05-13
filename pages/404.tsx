import MainLayout from "components/layouts/main-layout";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import background404 from "public/images/background_404.png";

const NotFound: NextPage = () => {
  return (
    <MainLayout pageTitle="잘못된 페이지" hasFooter={true}>
      <div className="without-header-footer">
        <div className="h-full flex justify-center items-center flex-col">
          <div className="mb-4">
            <Image width={250} height={250} src={background404} alt="" />
          </div>
          <h2 className="text-2xl font-semibold">앗! 죄송해요.</h2>
          <p className="text-base text-center my-5">
            원하시는 페이지를 찾을 수 없어요.
            <br />
            찾으시려는 페이지의 주소가 잘못 입력되었거나,
            <br />
            페이지 주소가 변경 또는 삭제되어 더는 사용하실 수 없습니다.
            <br />
            입력하신 페이지의 주소가 정확한지 다시 한번 확인해주세요.
          </p>
          <Link href="/">
            <a className="text-orange-400 text-lg font-medium hover:underline">홈으로 이동</a>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
