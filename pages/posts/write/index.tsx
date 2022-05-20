import Image from "next/image";
import useMe from "libs/client/useMe";
import Button from "components/button";
import Textarea from "components/textarea";
import FileInput from "components/file-input";
import useMutation from "libs/client/useMutation";
import MainLayout from "components/layouts/main-layout";
import { NextPage } from "next";
import { Post } from ".prisma/client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import { NextRouter, useRouter } from "next/router";
import { CommonResult } from "libs/server/withHandler";

interface PostWriteFormData {
  file: FileList;
  text: string;
}

interface PostWriteResult extends CommonResult {
  post?: Post;
}

const PostWrite: NextPage = () => {
  const me = useMe();
  const router: NextRouter = useRouter();
  const [filePreview, setFilePreview] = useState("");
  const [mutationLoading, setMutationLoading] = useState(false);
  const { register, handleSubmit, getValues, watch } = useForm<PostWriteFormData>();
  const [postWriteMutation, { data, loading }] = useMutation<PostWriteResult>("/api/posts/write");
  const watchingFile = watch("file");

  const onValid = async () => {
    if (loading === true) {
      return;
    }

    const { file, text } = getValues();
    setMutationLoading(true);

    if (file && file.length > 0) {
      const { cloudflareImageId, cloudflareUploadUrl } = await (await fetch("/api/file")).json();
      const formData = new FormData();
      formData.append("file", file[0], `${me?.username}_post_${file[0].name}`);
      await fetch(cloudflareUploadUrl, { method: "POST", body: formData });
      await postWriteMutation({ text, cloudflareImageId });
    } else {
      await postWriteMutation({ text });
    }

    setMutationLoading(false);
  };

  useEffect(() => {
    if (watchingFile && watchingFile.length > 0) {
      const file = watchingFile[0];
      const objectUrl = URL.createObjectURL(file);
      setFilePreview(objectUrl);
    }
  }, [watchingFile]);

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
            <label className="relative transition-all rounded-lg border-dashed border-2 text-gray-200 hover:border-orange-400 hover:text-orange-400 flex justify-center items-center h-[500px] cursor-pointer">
              {filePreview === "" ? <RiImageAddFill className="text-[40px]" /> : <Image objectFit="cover" layout="fill" src={filePreview} alt="" className="h-full rounded-lg" />}
              <FileInput register={register("file")} required={false} />
            </label>
            <label className="mt-5 mb-2">
              <Textarea register={register("text", { required: true })} rows={7} maxLength={400} placeholder="근처의 이웃에게 질문하거나 이야기를 해보세요." />
            </label>
            <Button loading={mutationLoading} type="submit" text="글쓰기" size="w-full" />
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default PostWrite;
