import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "libs/server/prisma";
import withHandler, { ResponseData } from "libs/server/withHandler";
import { withSessionRoute } from "libs/server/withSession";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      session: { loggedInUser },
    } = req;
    const foundPosts = await prisma.post.findMany({
      where: { userId: loggedInUser?.id },
      include: { user: true, _count: true },
    });
    return res.status(200).json({ ok: true, message: "사용자 동네 생활 게시글 보기에 성공하였습니다.", posts: foundPosts });
  } catch (error) {
    console.log("users posts handler error");
    return res.status(400).json({ ok: false, message: "사용자 동네 생활 게시글 보기에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["GET"], handler, isPrivate: false }));
