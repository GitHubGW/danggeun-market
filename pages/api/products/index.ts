import withHandler, { ResponseData } from "libs/server/withHandler";
import { withSessionRoute } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const LIMIT = 8;
    const {
      query: { page },
    } = req;

    const countedProducts = (await prisma?.product.count()) || 0;
    const foundProducts = await prisma?.product.findMany({
      include: {
        user: { select: { id: true, username: true, cloudflareImageId: true, address: true } },
        _count: { select: { productLikes: true } },
      },
      orderBy: { createdAt: "desc" },
      take: LIMIT,
      skip: (+page - 1) * LIMIT,
    });

    return res.status(200).json({
      ok: true,
      message: "전체 상품 보기에 성공하였습니다.",
      infiniteData: foundProducts,
      totalCounts: countedProducts,
      totalPages: Math.ceil(countedProducts / LIMIT),
    });
  } catch (error) {
    console.log("products handler error");
    return res.status(400).json({ ok: false, message: "전체 상품 보기에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["GET"], handler, isPrivate: false }));
