import prisma from "libs/server/prisma";
import withHandler, { ResponseData } from "libs/server/withHandler";
import { withSessionRoute } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      query: { id },
      session: { loggedInUser },
    } = req;

    const countedProduct = await prisma?.product.count({ where: { id: +id, userId: loggedInUser?.id } });
    if (!countedProduct) {
      return res.status(404).json({ ok: false, message: "존재하지 않는 상품입니다." });
    }

    await prisma?.product.update({ where: { id: +id }, data: { isSelling: false } });

    return res.status(200).json({ ok: true, message: "상품 판매 완료에 성공하였습니다." });
  } catch (error) {
    console.log("product detail soldout error");
    return res.status(400).json({ ok: false, message: "상품 판매 완료에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["POST"], handler, isPrivate: true }));
