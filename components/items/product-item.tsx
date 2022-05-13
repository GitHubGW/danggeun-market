import Region from "components/region";
import Image from "next/image";
import Link from "next/link";
import carrotLogo1 from "public/images/carrot_logo1.png";

interface ProductItemProps {
  id: number;
  name: string;
  price: number;
  cloudflareImageId: string;
  user: { address: string | null };
  _count: { productLikes: number };
  isSelling: boolean;
}

const ProductItem = ({ id, name, price, cloudflareImageId, user, _count, isSelling }: ProductItemProps) => {
  return (
    <Link href={`/products/${id}`}>
      <a>
        <Image
          width={208}
          height={208}
          src={cloudflareImageId ? `https://imagedelivery.net/mrfqMz0r88w_Qqln2FwPhQ/${cloudflareImageId}/productItem` : carrotLogo1}
          alt={name}
          className="border border-gray-100 rounded-2xl transition-all hover:scale-[1.02]"
        />
        <h3 className="mt-3 mb-0.5">{name}</h3>
        <div className="flex items-center mt-0.5">
          {isSelling === false ? <span className="text-white bg-gray-700 text-xs px-2 py-1.5 rounded-[4px] mr-1.5">거래완료</span> : null}
          <span className="font-semibold">{price}원</span>
        </div>
        <div>
          <Region text={user?.address} size="text-[13px]" />
        </div>
        <p className="text-[13px] text-gray-400">관심 {_count?.productLikes}</p>
      </a>
    </Link>
  );
};

export default ProductItem;
