import { NextPage } from "next";
import Button from "components/button";
import LabelTitle from "components/label-title";
import MainLayout from "components/layouts/main-layout";
import PhoneInput from "components/phone-input";
import FileInput from "components/file-input";
import { useForm } from "react-hook-form";
import Input from "components/input";
import useMe from "libs/client/useMe";
import { useEffect } from "react";
import FormError from "components/form-error";
import useMutation from "libs/client/useMutation";
import { NextRouter, useRouter } from "next/router";
import { CommonResult } from "libs/server/withHandler";

interface UserEditFormData {
  file: FileList;
  username: string;
  email: string;
  phone: string;
  error?: string;
}

const UserEdit: NextPage = () => {
  const me = useMe();
  const router: NextRouter = useRouter();
  const [userEditMutation, { data, loading }] = useMutation<CommonResult>(`/api/users/${router.query.username}/edit`);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<UserEditFormData>({ mode: "onChange" });

  const onValid = () => {
    if (loading === true) {
      return;
    }
    const { file, username, email, phone } = getValues();
    if (email === "" && phone === "") {
      return setError("error", { message: "이메일 또는 휴대폰 번호를 입력해주세요." });
    }
    userEditMutation({ username, email, phone });
  };

  const onKeyDown = () => {
    clearErrors("error");
  };

  useEffect(() => {
    if (data?.ok === false) {
      setError("error", { message: data.message });
    } else if (data?.ok === true) {
      const { username } = getValues();
      router.push(`/users/${username}/posts`);
    }
  }, [data, setError, getValues, router]);

  useEffect(() => {
    setValue("username", me?.username || "");
    setValue("email", me?.email || "");
    setValue("phone", me?.phone || "");
  }, [me?.username, me?.email, me?.phone, setValue]);

  return (
    <MainLayout pageTitle="프로필 수정" hasFooter={true}>
      <div className="wrapper without-header-footer">
        <div className="content-sub flex items-center">
          <form onSubmit={handleSubmit(onValid)} className="flex flex-col w-full pt-10">
            <div className="flex justify-center">
              <label className="transition-all rounded-full flex justify-center items-center cursor-pointer">
                <img src={me?.avatarUrl ? me?.avatarUrl : "/images/basic_user.png"} alt="" className="border border-gray-200 rounded-full w-56 h-56" />
                <FileInput register={register("file")} required={false} />
              </label>
            </div>
            <label className="mt-4">
              <LabelTitle text="유저 이름" />
              <Input register={register("username")} onKeyDown={onKeyDown} type="text" placeholder="유저 이름을 입력해주세요." required={false} />
            </label>
            <label className="mt-4">
              <LabelTitle text="이메일" />
              <Input register={register("email")} onKeyDown={onKeyDown} type="email" placeholder="이메일을 입력해주세요." required={false} />
            </label>
            <label className="mt-4 mb-4">
              <LabelTitle text="휴대폰 번호" />
              <div className="relative">
                <span className="absolute top-1/2 left-2.5 -translate-y-1/2 text-gray-300 select-none">+82</span>
                <PhoneInput register={register("phone")} onKeyDown={onKeyDown} required={false} />
              </div>
            </label>
            {errors.error?.message ? (
              <div className="mb-2">
                <FormError text={errors.error?.message || ""} />
              </div>
            ) : null}
            <Button loading={loading} type="submit" text="프로필 업데이트" size="w-full" />
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserEdit;
