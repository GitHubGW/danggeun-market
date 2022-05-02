import withHandler, { ResponseData } from "libs/server/withHandler";
import { withSessionRoute } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      query: { id },
      session: { loggedInUser },
    } = req;

    const foundProduct = await prisma?.product.findUnique({
      where: { id: +id },
      include: { user: { select: { id: true, username: true, avatarUrl: true } } },
    });

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
    });

    const countedLike = await prisma?.like.count({
      where: { productId: foundProduct?.id, userId: loggedInUser?.id },
    });

    return res.status(200).json({ ok: true, message: "상품 보기에 성공하였습니다.", product: foundProduct, similarProducts: foundSimilarProducts, isLiked: Boolean(countedLike) });
  } catch (error) {
    console.log();
    return res.status(400).json({ ok: false, message: "상품 보기에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["GET"], handler, isPrivate: false }));
