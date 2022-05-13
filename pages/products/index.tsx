import MainLayout from "components/layouts/main-layout";
import { Product } from ".prisma/client";
import ProductItem from "components/items/product-item";
import FloatingButton from "components/floating-button";
import { BsBagPlusFill } from "react-icons/bs";
import useSWRInfiniteClick from "libs/client/useSWRInfiniteClick";
import { MutableRefObject, useRef } from "react";
import useMe from "libs/client/useMe";

interface ProductWithUserAndCount extends Product {
  user: { id: number; username: string; cloudflareImageId: string | null; address: string | null };
  _count: { productLikes: number };
}

const Products = () => {
  const me = useMe();
  const moreRef: MutableRefObject<HTMLSpanElement | null> = useRef(null);
  const infiniteData = useSWRInfiniteClick<ProductWithUserAndCount>(`/api/products`, moreRef);

  return (
    <MainLayout pageTitle="중고거래" hasFooter={true}>
      <section className="relative">
        <div>
          <div className="content py-20">
            <h2 className="font-medium text-3xl leading-tight text-center">중고거래 인기매물</h2>
            <div className="grid grid-cols-4 mt-14 gap-x-10 gap-y-12">
              {infiniteData?.map((product) => (
                <ProductItem
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  cloudflareImageId={product.cloudflareImageId}
                  user={product.user}
                  _count={product._count}
                  isSelling={product.isSelling}
                />
              ))}
            </div>
            <span ref={moreRef} className="underline mt-14 text-center font-semibold block cursor-pointer">
              더 보기
            </span>
          </div>
        </div>
        <FloatingButton href={me ? "/products/upload" : "/login"}>
          <BsBagPlusFill />
        </FloatingButton>
      </section>
    </MainLayout>
  );
};

export default Products;
