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

    const countedPost = await prisma?.post.count({ where: { id: +id, userId: loggedInUser?.id } });
    if (!countedPost) {
      return res.status(404).json({ ok: false, message: "존재하지 않는 동네생활 게시글입니다." });
    }

    await prisma?.post.delete({ where: { id: +id } });

    const foundUser = await prisma.user.findUnique({
      where: { id: loggedInUser?.id },
    });
    await res.unstable_revalidate(`/users/${foundUser?.username}/posts`);
    await res.unstable_revalidate(`/users/${foundUser?.username}/likes`);

    return res.status(200).json({ ok: true, message: "동네생활 게시글 삭제에 성공하였습니다." });
  } catch (error) {
    console.log("post detail delete handler error");
    return res.status(400).json({ ok: false, message: "동네생활 게시글 삭제에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["POST"], handler, isPrivate: true }));
