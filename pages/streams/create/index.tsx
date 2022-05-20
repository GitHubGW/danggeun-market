import Image from "next/image";
import Input from "components/input";
import Button from "components/button";
import Textarea from "components/textarea";
import FormError from "components/form-error";
import LabelTitle from "components/label-title";
import useMutation from "libs/client/useMutation";
import MainLayout from "components/layouts/main-layout";
import backgroundStream from "public/images/background_stream.png";
import { NextPage } from "next";
import { useEffect } from "react";
import { Stream } from ".prisma/client";
import { useForm } from "react-hook-form";
import { NextRouter, useRouter } from "next/router";
import { CommonResult } from "libs/server/withHandler";

interface StreamCreateFormData {
  title: string;
  description: string;
  error?: string;
}

interface StreamCreateResult extends CommonResult {
  stream?: Stream;
}

const StreamCreate: NextPage = () => {
  const router: NextRouter = useRouter();
  const [streamCreateMutation, { data, loading }] = useMutation<StreamCreateResult>(`/api/streams/create`);
  const {
    register,
    handleSubmit,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<StreamCreateFormData>({ defaultValues: { title: "", description: "" } });

  const onValid = () => {
    if (loading === true) {
      return;
    }
    const { title, description } = getValues();
    streamCreateMutation({ title, description });
  };

  const onKeyDown = () => {
    clearErrors("error");
  };

  useEffect(() => {
    if (data?.ok === true) {
      router.push(`/streams/${data.stream?.id}`);
    }
  }, [data, router]);

  return (
    <MainLayout pageTitle="스트리밍 생성" hasFooter={true}>
      <div className="wrapper">
        <div className="content-sub without-header-footer">
          <div className="flex flex-col justify-center items-center w-full my-6">
            <Image src={backgroundStream} alt="" className="w-full rounded-lg" />
            <form onSubmit={handleSubmit(onValid)} className="flex flex-col w-full">
              <label className="mt-5">
                <LabelTitle text="제목" />
                <Input register={register("title", { required: true })} onKeyDown={onKeyDown} type="text" placeholder="스트리밍 제목을 작성해주세요." required={true} />
              </label>
              <label className="mt-5 mb-2">
                <LabelTitle text="내용" />
                <Textarea register={register("description", { required: true })} rows={5} maxLength={200} placeholder="스트리밍 내용을 작성해주세요." />
              </label>
              {errors.error?.message ? (
                <div className="mb-2">
                  <FormError text={errors.error?.message || ""} />
                </div>
              ) : null}
              <Button loading={loading} type="submit" text="실시간 스트리밍 시작" size="w-full" />
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StreamCreate;
