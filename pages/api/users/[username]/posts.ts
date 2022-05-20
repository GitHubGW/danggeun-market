import prisma from "libs/server/prisma";
import { withSessionRoute } from "libs/server/withSession";
import type { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseData } from "libs/server/withHandler";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const LIMIT = 12;
    const {
      query: { username, page },
    } = req;

    const foundPosts = await prisma.post.findMany({
      where: { user: { username: String(username) } },
      include: { user: true, _count: true },
      orderBy: { createdAt: "desc" },
      take: LIMIT,
      skip: (+page - 1) * LIMIT,
    });

    return res.status(200).json({ ok: true, message: "사용자 동네 생활 게시글 보기에 성공하였습니다.", infiniteData: foundPosts });
  } catch (error) {
    console.log("users posts handler error");
    return res.status(400).json({ ok: false, message: "사용자 동네 생활 게시글 보기에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["GET"], handler, isPrivate: false }));
