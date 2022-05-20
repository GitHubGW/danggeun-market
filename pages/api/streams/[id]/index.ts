import prisma from "libs/server/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "libs/server/withSession";
import withHandler, { ResponseData } from "libs/server/withHandler";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      query: { id },
      session: { loggedInUser },
    } = req;

    const foundStream = await prisma?.stream.findUnique({
      where: { id: +id },
      include: {
        streamMessages: {
          select: {
            id: true,
            text: true,
            user: { select: { id: true, username: true, cloudflareImageId: true } },
          },
        },
      },
    });
    if (foundStream === null || foundStream === undefined) {
      return res.status(404).json({ ok: false, message: "존재하지 않는 스트리밍입니다." });
    }

    if (foundStream.userId !== loggedInUser?.id) {
      foundStream.cloudflareStreamUrl = "";
      foundStream.cloudflareStreamKey = "";
    }

    let recordedVideos = undefined;
    if (foundStream.cloudflareStreamId) {
      recordedVideos = await (
        await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream/live_inputs/${foundStream.cloudflareStreamId}/videos`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.CLOUDFLARE_STREAM_API_TOKEN}`,
          },
        })
      ).json();
    }

    return res.status(200).json({ ok: true, message: "스트리밍 보기에 성공하였습니다.", stream: foundStream, recordedVideos });
  } catch (error) {
    console.log("stream detail handler error");
    return res.status(400).json({ ok: false, message: "스트리밍 보기에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["GET"], handler, isPrivate: false }));
