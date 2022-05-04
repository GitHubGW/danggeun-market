import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "libs/server/prisma";
import withHandler, { ResponseData } from "libs/server/withHandler";
import { withSessionRoute } from "libs/server/withSession";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      session: { loggedInUser },
    } = req;
    const foundPurchases = await prisma.purchase.findMany({
      where: { userId: loggedInUser?.id },
      include: { product: { include: { user: { select: { address: true } }, _count: { select: { productLikes: true } } } } },
    });
    return res.status(200).json({ ok: true, message: "사용자 구매 물품 보기에 성공하였습니다.", purchases: foundPurchases });
  } catch (error) {
    console.log("users purchases handler error");
    return res.status(400).json({ ok: false, message: "사용자 구매 물품 보기에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["GET"], handler, isPrivate: false }));
