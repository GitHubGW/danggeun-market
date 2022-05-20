import prisma from "libs/server/prisma";
import { withSessionRoute } from "libs/server/withSession";
import type { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseData } from "libs/server/withHandler";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      query: { username },
    } = req;

    const foundUser = await prisma.user.findUnique({
      where: { username: String(username) },
      include: { _count: true },
    });

    if (foundUser === null) {
      throw new Error();
    }

    const countedSellingProducts = await prisma.product.count({
      where: { user: { username: String(username) }, isSelling: true },
    });
    const countedSoldOutProducts = await prisma.product.count({
      where: { user: { username: String(username) }, isSelling: false },
    });

    return res.status(200).json({
      ok: true,
      message: "사용자 정보 보기에 성공하였습니다.",
      user: foundUser,
      sellingProducts: countedSellingProducts,
      soldOutProducts: countedSoldOutProducts,
    });
  } catch (error) {
    console.log("users index handler error");
    return res.status(400).json({ ok: false, message: "사용자 정보 보기에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["GET"], handler, isPrivate: false }));
