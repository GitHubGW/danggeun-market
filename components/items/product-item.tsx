import Link from "next/link";
import Separator from "components/separator";

interface ProductItemProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const ProductItem = ({ id, name, price, imageUrl }: ProductItemProps) => {
  return (
    <Link href={`/products/${id}`}>
      <a>
        <img src={imageUrl || "/images/carrot_logo1.png"} alt="" className="border border-gray-100 w-52 h-52 rounded-2xl" />
        <h3 className="mt-3 mb-0.5">{name}</h3>
        <span className="font-semibold">{price}원</span>
        <p className="text-[13px] mt-1">서울 강남구 신사동</p>
        <p className="text-[13px] text-gray-400">
          관심 10 <Separator /> 채팅 150
        </p>
      </a>
    </Link>
  );
};

export default ProductItem;
