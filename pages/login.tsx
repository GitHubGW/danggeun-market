import { useState } from "react";
import Button from "../components/button";
import MainLayout from "../components/layouts/main-layout";
import LogoColumn from "../components/logo-column";

type LoginType = "email" | "phone";

const Login = () => {
  const [type, setType] = useState<LoginType>("email");

  const handleSwitchToEmail = (): void => {
    setType("email");
  };

  const handleSwitchToPhone = (): void => {
    setType("phone");
  };

  return (
    <MainLayout pageTitle="로그인" hasFooter={true}>
      <div className="wrapper without-header-footer">
        <div className="max-w-[400px] mx-auto h-full flex justify-center items-center">
          <div className="flex flex-col justify-center items-center w-full">
            <LogoColumn size="w-32" />
            <form className="w-full mt-8 space-y-2">
              {type === "email" ? (
                <div>
                  <input type="email" placeholder="이메일을 입력해주세요." required className="input ring-normal" />
                </div>
              ) : (
                <div className="relative">
                  <span className="absolute top-1/2 left-2.5 -translate-y-1/2 text-gray-300 select-none">+82</span>
                  <input type="number" placeholder="휴대폰 번호를 입력해주세요." required className="input-space pl-12 pr-2 ring-normal" />
                </div>
              )}
              <Button type="submit" text="인증코드 받기" size="w-full" />
            </form>
            {type === "email" ? (
              <span onClick={handleSwitchToPhone} className="text-orange-400 cursor-pointer hover:underline font-semibold mt-3 text-sm">
                휴대폰으로 로그인
              </span>
            ) : (
              <span onClick={handleSwitchToEmail} className="text-orange-400 cursor-pointer hover:underline font-semibold mt-3 text-sm">
                이메일로 로그인
              </span>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
