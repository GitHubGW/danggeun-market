import prisma from "libs/server/prisma";
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

    const foundStream = await prisma?.stream.findUnique({ where: { id: +id } });
    if (foundStream === null || foundStream === undefined) {
      return res.status(404).json({ ok: false, message: "존재하지 않는 스트리밍입니다." });
    }

    await prisma?.streamMessage.create({
      data: {
        text,
        stream: { connect: { id: +id } },
        user: { connect: { id: loggedInUser?.id } },
      },
    });

    return res.status(200).json({ ok: true, message: "스트리밍 메세지 생성에 성공하였습니다." });
  } catch (error) {
    console.log("stream detail message add handler error");
    return res.status(400).json({ ok: false, message: "스트리밍 메세지 생성에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["POST"], handler, isPrivate: false }));
