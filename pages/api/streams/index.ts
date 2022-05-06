import withHandler, { ResponseData } from "libs/server/withHandler";
import { withSessionRoute } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const foundStreams = await prisma?.stream.findMany({});
    return res.status(200).json({ ok: true, message: "전체 스트리밍 보기에 성공하였습니다.", streams: foundStreams });
  } catch (error) {
    console.log("streams handler error");
    return res.status(400).json({ ok: false, message: "전체 스트리밍 보기에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["GET"], handler, isPrivate: false }));
