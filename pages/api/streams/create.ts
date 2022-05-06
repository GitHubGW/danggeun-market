import withHandler, { ResponseData } from "libs/server/withHandler";
import { withSessionRoute } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      body: { title, description },
      session: { loggedInUser },
    } = req;

    const countedStream = await prisma?.stream.count({ where: { title } });
    if (countedStream !== 0) {
      return res.status(400).json({ ok: false, message: "이미 존재하는 스트리밍 제목입니다." });
    }

    const createdStream = await prisma?.stream.create({
      data: { title, description, user: { connect: { id: loggedInUser?.id } } },
    });

    return res.status(200).json({ ok: true, message: "스트리밍 생성에 성공하였습니다.", stream: createdStream });
  } catch (error) {
    console.log("stream create handler error");
    return res.status(400).json({ ok: false, message: "스트리밍 생성에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["POST"], handler, isPrivate: false }));
