import dynamic from "next/dynamic";
import Input from "components/input";
import Button from "components/button";
import Loading from "components/loading";
import FormError from "components/form-error";
import LogoColumn from "components/logo-column";
import useMutation from "libs/client/useMutation";
import MainLayout from "components/layouts/main-layout";
import useAddress, { Address } from "libs/client/useAddress";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { NextRouter, useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import { CommonResult } from "libs/server/withHandler";

const DynamicPhoneInputComponent = dynamic(() => import("components/phone-input"), { suspense: true });

interface LoginFormData {
  phone?: string;
  email?: string;
  token: string;
}

const Login: NextPage = () => {
  const router: NextRouter = useRouter();
  const address: Address = useAddress();
  const [loginMutation, { data, loading }] = useMutation<CommonResult>("/api/login");
  const [type, setType] = useState<"email" | "phone">("email");
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({ mode: "onChange", defaultValues: { phone: "", email: "" } });

  const handleSwitchType = (type: "email" | "phone") => {
    reset();
    setType(type);
  };

  const onValid = async () => {
    const { email, phone, token } = getValues();

    if (token) {
      await loginMutation({ token });
    } else {
      await loginMutation({ email, phone, address });
    }
    reset();
  };

  useEffect(() => {
    if (data?.token) {
      router.push("/");
    }
  }, [data, router]);

  return (
    <MainLayout pageTitle="로그인" hasFooter={true}>
      <div className="wrapper without-header-footer">
        <div className="max-w-[400px] mx-auto h-full flex justify-center items-center">
          <div className="flex flex-col justify-center items-center w-full">
            <LogoColumn size="w-32" />
            {data?.ok === true ? (
              <form onClick={handleSubmit(onValid)} className="w-full mt-8 space-y-2">
                <div>
                  <Input
                    register={register("token", { required: "인증번호 6자리를 입력해주세요.", maxLength: 6 })}
                    type="number"
                    placeholder="인증번호 6자리를 입력해주세요."
                    required={true}
                  />
                </div>
                <Button loading={loading} type="submit" text="확인" size="w-full" />
              </form>
            ) : (
              <>
                <form onClick={handleSubmit(onValid)} className="w-full mt-8 space-y-2">
                  {type === "email" ? (
                    <div>
                      <Input
                        register={register("email", { required: "인증코드를 받을 이메일을 입력해주세요.", maxLength: 30 })}
                        type="email"
                        placeholder="이메일을 입력해주세요."
                        required={true}
                      />
                    </div>
                  ) : (
                    <div className="relative">
                      <span className="absolute top-1/2 left-2.5 -translate-y-1/2 text-gray-300 select-none">+82</span>
                      <Suspense
                        fallback={
                          <div className="flex justify-center py-1.5">
                            <Loading color="orange" size={20} />
                          </div>
                        }
                      >
                        <DynamicPhoneInputComponent register={register("phone", { required: "인증코드를 받을 휴대폰 번호를 입력해주세요.", maxLength: 15 })} required={true} />
                      </Suspense>
                    </div>
                  )}
                  {errors.email?.message ? <FormError text={errors.email?.message || ""} /> : null}
                  {errors.phone?.message ? <FormError text={errors.phone?.message || ""} /> : null}
                  <Button loading={loading} type="submit" text="인증코드 받기" size="w-full" />
                </form>
                {type === "email" ? (
                  <span onClick={() => handleSwitchType("phone")} className="text-orange-400 cursor-pointer hover:underline font-semibold mt-3 text-sm">
                    휴대폰으로 로그인
                  </span>
                ) : (
                  <span onClick={() => handleSwitchType("email")} className="text-orange-400 cursor-pointer hover:underline font-semibold mt-3 text-sm">
                    이메일로 로그인
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
