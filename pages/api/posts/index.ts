import prisma from "libs/server/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "libs/server/withSession";
import withHandler, { ResponseData } from "libs/server/withHandler";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const LIMIT = 9;
    const {
      query: { page },
    } = req;

    const countedPosts = (await prisma?.post.count()) || 0;
    const foundPosts = await prisma?.post.findMany({
      include: {
        user: {
          select: { id: true, username: true, cloudflareImageId: true, address: true },
        },
        _count: {
          select: { postComments: true, postLikes: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: LIMIT * Number(page),
      skip: 0,
    });

    return res.status(200).json({
      ok: true,
      message: "전체 동네생활 게시글 보기에 성공하였습니다.",
      infiniteData: foundPosts,
      totalCounts: countedPosts,
      totalPages: Math.ceil(countedPosts / LIMIT),
    });
  } catch (error) {
    console.log("posts handler error");
    return res.status(400).json({ ok: false, message: "전체 동네생활 게시글 보기에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["GET"], handler, isPrivate: false }));
