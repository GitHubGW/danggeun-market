import prisma from "libs/server/prisma";
import withHandler, { ResponseData } from "libs/server/withHandler";
import { withSessionRoute } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      query: { id },
    } = req;

    await prisma?.chat.delete({ where: { id: +id } });

    return res.status(200).json({ ok: true, message: "채팅방 삭제에 성공하였습니다." });
  } catch (error) {
    console.log("chat detail delete error");
    return res.status(400).json({ ok: false, message: "채팅방 삭제에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["POST"], handler, isPrivate: true }));
