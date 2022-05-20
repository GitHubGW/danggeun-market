import prisma from "libs/server/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "libs/server/withSession";
import withHandler, { ResponseData } from "libs/server/withHandler";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      query: { id },
      session: { loggedInUser },
    } = req;

    const foundPost = await prisma?.post.findUnique({
      where: { id: +id },
      include: {
        user: {
          select: { id: true, username: true, cloudflareImageId: true, address: true },
        },
        postComments: {
          select: { id: true, text: true, createdAt: true, user: { select: { id: true, username: true, cloudflareImageId: true, address: true } } },
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: { postComments: true, postLikes: true },
        },
      },
    });
    if (foundPost === null) {
      return res.status(404).json({ ok: false, message: "존재하지 않는 동네생활 게시글입니다." });
    }

    const isLiked = Boolean(await prisma?.postLike.count({ where: { postId: foundPost?.id, userId: loggedInUser?.id } }));
    return res.status(200).json({ ok: true, message: "동네생활 게시글 보기에 성공하였습니다.", post: foundPost, isLiked });
  } catch (error) {
    console.log("post detail handler error");
    return res.status(400).json({ ok: false, message: "동네생활 게시글 보기에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["GET"], handler, isPrivate: false }));
