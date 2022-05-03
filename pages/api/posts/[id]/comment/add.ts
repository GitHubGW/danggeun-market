import withHandler, { ResponseData } from "libs/server/withHandler";
import { withSessionRoute } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      body: { text },
      query: { id },
      session: { loggedInUser },
    } = req;

    const countedPost = await prisma?.post.count({ where: { id: +id } });
    if (!countedPost) {
      return res.status(404).json({ ok: false, message: "존재하지 않는 동네생활 게시글입니다." });
    }

    await prisma?.postComment.create({
      data: { text, post: { connect: { id: +id } }, user: { connect: { id: loggedInUser?.id } } },
    });

    return res.status(200).json({ ok: true, message: "동네생활 게시글 댓글 작성에 성공하였습니다." });
  } catch (error) {
    console.log("post detail comment add handler error");
    return res.status(400).json({ ok: false, message: "동네생활 게시글 댓글 작성에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["POST"], handler, isPrivate: true }));
