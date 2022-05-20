import prisma from "libs/server/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "libs/server/withSession";
import withHandler, { ResponseData } from "libs/server/withHandler";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const LIMIT = 12;
    const {
      query: { page },
    } = req;

    const foundStreams = await prisma?.stream.findMany({
      include: { user: { select: { id: true, username: true, cloudflareImageId: true } } },
      orderBy: { createdAt: "desc" },
      take: LIMIT,
      skip: (+page - 1) * LIMIT,
    });

    return res.status(200).json({ ok: true, message: "전체 스트리밍 보기에 성공하였습니다.", infiniteData: foundStreams });
  } catch (error) {
    console.log("streams handler error");
    return res.status(400).json({ ok: false, message: "전체 스트리밍 보기에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["GET"], handler, isPrivate: false }));
