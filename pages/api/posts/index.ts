import withHandler, { ResponseData } from "libs/server/withHandler";
import { withSessionRoute } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const foundPosts = await prisma?.post.findMany({
      include: {
        user: {
          select: { id: true, username: true, avatarUrl: true, address: true },
        },
        _count: {
          select: { postComments: true, postLikes: true },
        },
      },
    });

    return res.status(200).json({ ok: true, message: "전체 동네생활 게시글 보기에 성공하였습니다.", posts: foundPosts });
  } catch (error) {
    console.log("posts handler error");
    return res.status(400).json({ ok: false, message: "전체 동네생활 게시글 보기에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["GET"], handler, isPrivate: false }));
