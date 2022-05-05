import MainLayout from "components/layouts/main-layout";
import useSWR from "swr";
import { CommonResult } from "libs/server/withHandler";
import { Product } from ".prisma/client";
import Link from "next/link";
import ProductItem from "components/items/product-item";
import FloatingButton from "components/floating-button";
import { BsBagPlusFill } from "react-icons/bs";

interface ProductWithUserAndCount extends Product {
  user: { id: number; username: string; avatarUrl: string | null; address: string | null };
  _count: { productLikes: number };
}

interface ProductsResult extends CommonResult {
  products?: ProductWithUserAndCount[] | undefined;
}

const Products = () => {
  const { data } = useSWR<ProductsResult>(`/api/products`);

  return (
    <MainLayout pageTitle="중고거래" hasFooter={true}>
      <section className="relative">
        <div>
          <div className="content py-20">
            <h2 className="font-medium text-3xl leading-tight text-center">중고거래 인기매물</h2>
            <div className="grid grid-cols-4 mt-14 gap-x-10 gap-y-12">
              {data?.products?.map((product) => (
                <ProductItem key={product.id} {...product} />
              ))}
            </div>
            <Link href="/">
              <a className="underline mt-14 text-center font-semibold block">더 보기</a>
            </Link>
          </div>
        </div>
        <FloatingButton href="/products/upload">
          <BsBagPlusFill />
        </FloatingButton>
      </section>
    </MainLayout>
  );
};

export default Products;
