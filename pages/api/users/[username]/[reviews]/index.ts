import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "libs/server/prisma";
import withHandler, { ResponseData } from "libs/server/withHandler";
import { withSessionRoute } from "libs/server/withSession";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      query: { username },
    } = req;
    const foundReviews = await prisma.review.findMany({
      where: { to: { username: String(username) } },
      include: { from: { select: { id: true, username: true, cloudflareImageId: true, address: true } } },
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({ ok: true, message: "사용자 리뷰 보기에 성공하였습니다.", reviews: foundReviews });
  } catch (error) {
    console.log("users reviews handler error");
    return res.status(400).json({ ok: false, message: "사용자 리뷰 보기에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["GET"], handler, isPrivate: false }));
