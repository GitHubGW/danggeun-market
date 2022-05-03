import withHandler, { ResponseData } from "libs/server/withHandler";
import { withSessionRoute } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      query: { id },
      session: { loggedInUser },
    } = req;
    const foundPost = await prisma?.post.count({ where: { id: +id } });

    if (!foundPost) {
      return res.status(404).json({ ok: false, message: "존재하지 않는 동네생활 게시글입니다." });
    }

    const foundPostLike = await prisma?.postLike.findFirst({
      where: { postId: +id, userId: loggedInUser?.id },
    });

    if (foundPostLike) {
      await prisma?.postLike.delete({ where: { id: foundPostLike?.id } });
    } else {
      await prisma?.postLike.create({
        data: { post: { connect: { id: +id } }, user: { connect: { id: loggedInUser?.id } } },
      });
    }

    return res.status(200).json({ ok: true, message: "동네생활 게시글 좋아요 또는 좋아요 취소에 성공하였습니다." });
  } catch (error) {
    console.log("post detail like handler error");
    return res.status(400).json({ ok: false, message: "동네생활 게시글 좋아요 또는 좋아요 취소에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["POST"], handler, isPrivate: true }));
