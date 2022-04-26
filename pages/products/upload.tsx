import Button from "../../components/button";
import { MdAddAPhoto } from "react-icons/md";
import LabelTitle from "../../components/label-title";
import MainLayout from "../../components/layouts/main-layout";

const ProductUpload = () => {
  return (
    <MainLayout pageTitle="상품 업로드" hasFooter={true}>
      <div className="wrapper">
        <div className="content-sub">
          <form className=" flex flex-col">
            <label className="transition-all rounded-lg border-dashed border-2 text-gray-200 hover:border-orange-400 hover:text-orange-400 flex justify-center items-center h-[500px] cursor-pointer">
              <MdAddAPhoto className="text-[40px]" />
              <input type="file" required accept="image/*" className="hidden" />
            </label>
            <label className="mt-5">
              <LabelTitle text="제목" />
              <input type="text" placeholder="게시글 제목을 작성해주세요." className="input ring-normal" />
            </label>
            <label className="mt-5">
              <LabelTitle text="가격" />
              <div className="relative">
                <span className="absolute top-1/2 left-2.5 -translate-y-1/2 text-gray-300 select-none">₩</span>
                <input type="number" placeholder="0" className="input-space pl-7 pr-2 ring-normal" />
              </div>
            </label>
            <label className="mt-5 mb-2">
              <LabelTitle text="설명" />
              <textarea
                rows={8}
                maxLength={400}
                placeholder="게시글 내용을 작성해주세요. 가품 및 판매금지품목은 게시가 제한될 수 있어요."
                className="resize-none input ring-normal"
              />
            </label>
            <Button type="submit" text="상품 업로드" size="w-full" />
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductUpload;
