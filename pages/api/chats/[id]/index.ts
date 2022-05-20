import prisma from "libs/server/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "libs/server/withSession";
import withHandler, { ResponseData } from "libs/server/withHandler";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  const {
    method,
    query: { id },
    session: { loggedInUser },
    body: { text },
  } = req;

  if (method === "GET") {
    try {
      const foundChatMessages = await prisma?.chatMessage.findMany({
        where: { chatId: +id },
        include: { user: true },
      });
      return res.status(200).json({ ok: true, message: "채팅 보기에 성공하였습니다.", chatMessages: foundChatMessages });
    } catch (error) {
      console.log("chat detail error");
      return res.status(400).json({ ok: false, message: "채팅 보기에 실패하였습니다." });
    }
  } else if (method === "POST") {
    try {
      await prisma?.chatMessage.create({
        data: {
          text,
          chat: { connect: { id: +id } },
          user: { connect: { id: loggedInUser?.id } },
        },
      });
      return res.status(200).json({ ok: true, message: "채팅 메세지 전송에 성공하였습니다." });
    } catch (error) {
      console.log("chat detail message error");
      return res.status(400).json({ ok: false, message: "채팅 메세지 전송에 실패하였습니다." });
    }
  }
};

export default withSessionRoute(withHandler({ methods: ["GET", "POST"], handler, isPrivate: true }));
