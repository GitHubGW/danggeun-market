import prisma from "libs/server/prisma";
import { withSessionRoute } from "libs/server/withSession";
import type { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseData } from "libs/server/withHandler";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      query: { username },
    } = req;

    const foundProductLikes = await prisma.productLike.findMany({
      where: { user: { username: String(username) } },
      include: { product: { include: { user: { select: { address: true } }, _count: { select: { productLikes: true } } } } },
      orderBy: { createdAt: "desc" },
    });

    const foundPostLikes = await prisma.postLike.findMany({
      where: { user: { username: String(username) } },
      include: { post: { include: { user: { select: { username: true, address: true } }, _count: { select: { postComments: true, postLikes: true } } } } },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ ok: true, message: "사용자 관심 상품 및 관심 게시물 보기에 성공하였습니다.", productLikes: foundProductLikes, postLikes: foundPostLikes });
  } catch (error) {
    console.log("users likes handler error");
    return res.status(400).json({ ok: false, message: "사용자 관심 상품 및 관심 게시물 보기에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["GET"], handler, isPrivate: false }));
