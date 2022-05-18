import prisma from "libs/server/prisma";
import withHandler, { ResponseData } from "libs/server/withHandler";
import { withSessionRoute } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      query: { keyword },
    } = req;

    const foundProducts = await prisma?.product.findMany({
      where: { name: { contains: String(keyword) } },
      include: { user: true, _count: true },
      orderBy: { createdAt: "desc" },
    });
    const foundPosts = await prisma?.post.findMany({
      where: { text: { contains: String(keyword) } },
      include: { user: true, _count: true },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ ok: true, message: "검색에 성공하였습니다.", products: foundProducts, posts: foundPosts });
  } catch (error) {
    console.log("search handler error");
    return res.status(400).json({ ok: false, message: "검색에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["GET"], handler, isPrivate: false }));
