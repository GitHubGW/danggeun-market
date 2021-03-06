import Image from "next/image";
import Input from "components/input";
import useMe from "libs/client/useMe";
import Button from "components/button";
import Textarea from "components/textarea";
import FileInput from "components/file-input";
import LabelTitle from "components/label-title";
import PriceInput from "components/price-input";
import useMutation from "libs/client/useMutation";
import MainLayout from "components/layouts/main-layout";
import { NextPage } from "next";
import { Product } from ".prisma/client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { NextRouter, useRouter } from "next/router";
import { CommonResult } from "libs/server/withHandler";

interface ProductUploadFormData {
  file: FileList;
  name: string;
  price: number;
  description: string;
}

interface ProductUploadResult extends CommonResult {
  product?: Product;
}

const ProductUpload: NextPage = () => {
  const me = useMe();
  const router: NextRouter = useRouter();
  const [filePreview, setFilePreview] = useState("");
  const [mutationLoading, setMutationLoading] = useState(false);
  const [productUploadMutation, { data, loading }] = useMutation<ProductUploadResult>("/api/products/upload");
  const { register, handleSubmit, getValues, watch } = useForm<ProductUploadFormData>();
  const watchingFile = watch("file");

  const onValid = async () => {
    if (loading === true) {
      return;
    }
    const { file, name, price, description } = getValues();
    setMutationLoading(true);

    if (file && file.length > 0) {
      const { cloudflareImageId, cloudflareUploadUrl } = await (await fetch("/api/file")).json();
      const formData = new FormData();
      formData.append("file", file[0], `${me?.username}_product_${file[0].name}`);
      await fetch(cloudflareUploadUrl, { method: "POST", body: formData });
      await productUploadMutation({ name, price, description, cloudflareImageId });
    } else {
      await productUploadMutation({ name, price, description });
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
      router.push(`/products/${data.product?.id}`);
    }
  }, [data, router]);

  return (
    <MainLayout pageTitle="?????? ?????????" hasFooter={true}>
      <div className="wrapper">
        <div className="content-sub">
          <form onSubmit={handleSubmit(onValid)} className="flex flex-col">
            <label className="relative transition-all rounded-lg border-dashed border-2 text-gray-200 hover:border-orange-400 hover:text-orange-400 flex justify-center items-center h-[500px] cursor-pointer">
              {filePreview === "" ? <MdAddAPhoto className="text-[40px]" /> : <Image objectFit="cover" layout="fill" src={filePreview} alt="" className="h-full rounded-lg" />}
              <FileInput register={register("file", { required: true })} required={true} />
            </label>
            <label className="mt-5">
              <LabelTitle text="??????" />
              <Input register={register("name", { required: true })} type="text" placeholder="?????? ????????? ??????????????????." required={true} />
            </label>
            <label className="mt-5">
              <LabelTitle text="??????" />
              <div className="relative">
                <span className="absolute top-1/2 left-2.5 -translate-y-1/2 text-gray-300 select-none">???</span>
                <PriceInput register={register("price", { required: true })} required={true} />
              </div>
            </label>
            <label className="mt-5 mb-2">
              <LabelTitle text="??????" />
              <Textarea
                register={register("description", { required: true })}
                rows={8}
                maxLength={400}
                placeholder="????????? ????????? ??????????????????. ?????? ??? ????????????????????? ????????? ????????? ??? ?????????."
              />
            </label>
            <Button loading={mutationLoading} type="submit" text="?????? ?????????" size="w-full" />
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductUpload;
