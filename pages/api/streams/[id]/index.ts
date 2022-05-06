import withHandler, { ResponseData } from "libs/server/withHandler";
import { withSessionRoute } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      query: { id },
    } = req;

    const foundStream = await prisma?.stream.findUnique({
      where: { id: +id },
      include: {
        streamMessages: {
          select: {
            id: true,
            text: true,
            user: { select: { id: true, username: true, avatarUrl: true } },
          },
        },
      },
    });
    if (foundStream === null || foundStream === undefined) {
      return res.status(404).json({ ok: false, message: "존재하지 않는 스트리밍입니다." });
    }

    return res.status(200).json({ ok: true, message: "스트리밍 보기에 성공하였습니다.", stream: foundStream });
  } catch (error) {
    console.log("stream detail handler error");
    return res.status(400).json({ ok: false, message: "스트리밍 보기에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["GET"], handler, isPrivate: false }));
