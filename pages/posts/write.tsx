import { NextPage } from "next";
import Button from "components/button";
import { RiImageAddFill } from "react-icons/ri";
import MainLayout from "components/layouts/main-layout";
import FileInput from "components/file-input";
import { useForm } from "react-hook-form";
import Textarea from "components/textarea";
import useMutation from "libs/client/useMutation";
import { useEffect } from "react";
import { NextRouter, useRouter } from "next/router";
import { CommonResult } from "libs/server/withHandler";
import { Post } from ".prisma/client";

interface PostWriteFormData {
  file: any;
  text: string;
}

interface PostWriteResult extends CommonResult {
  post?: Post;
}

const PostWrite: NextPage = () => {
  const router: NextRouter = useRouter();
  const { register, handleSubmit, getValues } = useForm<PostWriteFormData>();
  const [postWriteMutation, { data, loading }] = useMutation<PostWriteResult>("/api/posts/write");

  const onValid = () => {
    if (loading === true) {
      return;
    }
    const { file, text } = getValues();
    postWriteMutation({ file, text });
  };

  useEffect(() => {
    if (data?.ok === true) {
      router.push(`/posts/${data.post?.id}`);
    }
  }, [data, router]);

  return (
    <MainLayout pageTitle="동네생활 글쓰기" hasFooter={true}>
      <div className="wrapper">
        <div className="content-sub without-header-footer">
          <form onSubmit={handleSubmit(onValid)} className="flex flex-col">
            <label className="transition-all rounded-lg border-dashed border-2 text-gray-200 hover:border-orange-400 hover:text-orange-400 flex justify-center items-center h-[500px] cursor-pointer">
              <RiImageAddFill className="text-[40px]" />
              <FileInput register={register("file")} required={false} />
            </label>
            <label className="mt-5 mb-2">
              <Textarea register={register("text", { required: true })} rows={7} maxLength={400} placeholder="근처의 이웃에게 질문하거나 이야기를 해보세요." />
            </label>
            <Button loading={loading} type="submit" text="글쓰기" size="w-full" />
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default PostWrite;
