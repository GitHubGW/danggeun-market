import withHandler, { ResponseData } from "libs/server/withHandler";
import { withSessionRoute } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

interface Response {
  result: {
    uid: string;
    rtmps: {
      url: string;
      streamKey: string;
    };
    srt: {
      url: string;
      streamId: string;
      passphrase: string;
    };
    created: string;
    modified: string;
    meta: { name: string };
    status: any;
    recording: {
      mode: string;
      timeoutSeconds: number;
      requireSignedURLs: boolean;
      allowedOrigins: any;
    };
  };
  success: boolean;
  errors: any[];
  messages: any[];
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const cloudflareRequestUrl = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream/live_inputs`;
    const {
      body: { title, description },
      session: { loggedInUser },
    } = req;

    const countedStream = await prisma?.stream.count({ where: { title } });
    if (countedStream !== 0) {
      return res.status(400).json({ ok: false, message: "이미 존재하는 스트리밍 제목입니다." });
    }

    const response: Response = await (
      await fetch(cloudflareRequestUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_STREAM_API_TOKEN}`,
        },
        body: `{"meta": {"name":"${title}"},"recording": { "mode": "automatic", "timeoutSeconds": 10 }}`,
      })
    ).json();

    const createdStream = await prisma?.stream.create({
      data: {
        title,
        description,
        user: { connect: { id: loggedInUser?.id } },
        cloudflareStreamId: response.result.uid,
        cloudflareStreamUrl: response.result.rtmps.url,
        cloudflareStreamKey: response.result.rtmps.streamKey,
      },
    });

    return res.status(200).json({ ok: true, message: "스트리밍 생성에 성공하였습니다.", stream: createdStream });
  } catch (error) {
    console.log("stream create handler error", error);
    return res.status(400).json({ ok: false, message: "스트리밍 생성에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["POST"], handler, isPrivate: false }));
