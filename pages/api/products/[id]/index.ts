import prisma from "libs/server/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "libs/server/withSession";
import withHandler, { ResponseData } from "libs/server/withHandler";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      query: { id },
      session: { loggedInUser },
    } = req;

    const foundProduct = await prisma?.product.findUnique({
      where: { id: +id },
      include: {
        user: { select: { id: true, username: true, cloudflareImageId: true, address: true } },
        _count: { select: { productLikes: true } },
      },
    });
    if (foundProduct === null) {
      return res.status(404).json({ ok: false, message: "존재하지 않는 상품입니다." });
    }

    const nameArray = foundProduct?.name.split(" ").map((word: string) => ({
      name: { contains: word },
    }));

    const foundSimilarProducts = await prisma?.product.findMany({
      where: {
        AND: { id: { not: foundProduct?.id } },
        OR: nameArray,
      },
      orderBy: { createdAt: "desc" },
      take: 6,
      include: {
        user: { select: { id: true, username: true, cloudflareImageId: true, address: true } },
        _count: { select: { productLikes: true } },
      },
    });

    const isLiked = Boolean(await prisma?.productLike.count({ where: { productId: foundProduct?.id, userId: loggedInUser?.id } }));

    return res.status(200).json({ ok: true, message: "상품 보기에 성공하였습니다.", product: foundProduct, similarProducts: foundSimilarProducts, isLiked });
  } catch (error) {
    console.log("product detail error");
    return res.status(400).json({ ok: false, message: "상품 보기에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["GET"], handler, isPrivate: false }));
