import prisma from "libs/server/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "libs/server/withSession";
import withHandler, { ResponseData } from "libs/server/withHandler";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      session: { loggedInUser },
    } = req;

    const foundChats = await prisma?.chat.findMany({
      where: { users: { some: { id: loggedInUser?.id } } },
      include: { users: true, chatMessages: true, _count: true },
    });

    return res.status(200).json({ ok: true, message: "전체 채팅 보기에 성공하였습니다.", chats: foundChats });
  } catch (error) {
    console.log("chats handler error");
    return res.status(400).json({ ok: false, message: "전체 채팅 보기에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["GET"], handler, isPrivate: true }));
