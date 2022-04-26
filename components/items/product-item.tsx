import Link from "next/link";
import Separator from "../separator";

interface ProductItemProps {
  productUrl: string;
}

const ProductItem = ({ productUrl }: ProductItemProps) => {
  return (
    <Link href="/products/1">
      <a>
        <img src={productUrl} alt="" className="border border-gray-100 w-52 h-52 rounded-2xl" />
        <h3 className="mt-3 mb-0.5">포켓몬빵</h3>
        <span className="font-semibold">2,000원</span>
        <p className="text-[13px] mt-1">서울 강남구 신사동</p>
        <p className="text-[13px] text-gray-400">
          관심 10 <Separator /> 채팅 150
        </p>
      </a>
    </Link>
  );
};

export default ProductItem;
