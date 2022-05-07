import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "libs/server/prisma";
import withHandler, { ResponseData } from "libs/server/withHandler";
import { withSessionRoute } from "libs/server/withSession";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const LIMIT = 12;
    const {
      query: { username, page },
    } = req;

    const foundSales = await prisma.sale.findMany({
      where: { user: { username: String(username) } },
      include: { product: { include: { user: { select: { address: true } }, _count: { select: { productLikes: true } } } } },
      orderBy: { createdAt: "desc" },
      take: LIMIT,
      skip: (+page - 1) * LIMIT,
    });

    return res.status(200).json({ ok: true, message: "사용자 판매 물품 보기에 성공하였습니다.", infiniteData: foundSales });
  } catch (error) {
    console.log("users sales handler error");
    return res.status(400).json({ ok: false, message: "사용자 판매 물품 보기에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["GET"], handler, isPrivate: false }));
