import prisma from "libs/server/prisma";
import withHandler, { ResponseData } from "libs/server/withHandler";
import { withSessionRoute } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      body: { postCommentId },
      query: { id },
      session: { loggedInUser },
    } = req;

    const countedPost = await prisma?.post.count({ where: { id: +id } });
    if (!countedPost) {
      return res.status(404).json({ ok: false, message: "존재하지 않는 동네생활 게시글입니다." });
    }

    const countedPostComment = await prisma?.postComment.count({ where: { id: +postCommentId, userId: loggedInUser?.id } });
    if (!countedPostComment) {
      return res.status(404).json({ ok: false, message: "존재하지 않는 동네생활 게시글 댓글입니다." });
    }

    await prisma?.postComment.delete({ where: { id: +postCommentId } });
    return res.status(200).json({ ok: true, message: "동네생활 게시글 댓글 삭제에 성공하였습니다." });
  } catch (error) {
    console.log("post detail comment delete handler error");
    return res.status(400).json({ ok: false, message: "동네생활 게시글 댓글 삭제에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["POST"], handler, isPrivate: true }));
