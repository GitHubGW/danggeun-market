import { NextPage } from "next";
import Button from "components/button";
import { MdAddAPhoto } from "react-icons/md";
import LabelTitle from "components/label-title";
import MainLayout from "components/layouts/main-layout";
import PriceInput from "components/price-input";
import { useForm } from "react-hook-form";
import FileInput from "components/file-input";
import Input from "components/input";
import Textarea from "components/textarea";
import useMutation from "libs/client/useMutation";
import { CommonResult } from "libs/server/withHandler";
import { useEffect } from "react";
import { NextRouter, useRouter } from "next/router";
import { Product } from ".prisma/client";

interface ProductUploadFormData {
  file: any;
  name: string;
  price: number;
  description: string;
}

interface ProductUploadResult extends CommonResult {
  product?: Product;
}

const ProductUpload: NextPage = () => {
  const router: NextRouter = useRouter();
  const { register, handleSubmit, getValues } = useForm<ProductUploadFormData>();
  const [productUploadMutation, { data, loading }] = useMutation<ProductUploadResult>("/api/products/upload");

  const onValid = () => {
    if (loading === true) {
      return;
    }
    const { file, name, price, description } = getValues();
    productUploadMutation({ file, name, price, description });
  };

  useEffect(() => {
    if (data?.ok === true) {
      router.push(`/products/${data.product?.id}`);
    }
  }, [data, router]);

  return (
    <MainLayout pageTitle="상품 업로드" hasFooter={true}>
      <div className="wrapper">
        <div className="content-sub">
          <form onSubmit={handleSubmit(onValid)} className="flex flex-col">
            <label className="transition-all rounded-lg border-dashed border-2 text-gray-200 hover:border-orange-400 hover:text-orange-400 flex justify-center items-center h-[500px] cursor-pointer">
              <MdAddAPhoto className="text-[40px]" />
              <FileInput register={register("file", { required: true })} required={true} />
            </label>
            <label className="mt-5">
              <LabelTitle text="이름" />
              <Input register={register("name", { required: true })} type="text" placeholder="상품 이름을 입력해주세요." required={true} />
            </label>
            <label className="mt-5">
              <LabelTitle text="가격" />
              <div className="relative">
                <span className="absolute top-1/2 left-2.5 -translate-y-1/2 text-gray-300 select-none">₩</span>
                <PriceInput register={register("price", { required: true })} required={true} />
              </div>
            </label>
            <label className="mt-5 mb-2">
              <LabelTitle text="설명" />
              <Textarea
                register={register("description", { required: true })}
                rows={8}
                maxLength={400}
                placeholder="게시글 내용을 작성해주세요. 가품 및 판매금지품목은 게시가 제한될 수 있어요."
              />
            </label>
            <Button loading={loading} type="submit" text="상품 업로드" size="w-full" />
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductUpload;
