import { Chat } from "@prisma/client";
import withHandler, { ResponseData } from "libs/server/withHandler";
import { withSessionRoute } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      body: { sellerId },
      session: { loggedInUser },
    } = req;

    let foundOrCreatedChat: Chat | null | undefined = undefined;
    foundOrCreatedChat = await prisma?.chat.findFirst({
      where: {
        AND: [{ users: { some: { id: loggedInUser?.id } } }, { users: { some: { id: +sellerId } } }],
      },
    });
    if (foundOrCreatedChat === null) {
      foundOrCreatedChat = await prisma?.chat.create({
        data: { users: { connect: [{ id: loggedInUser?.id }, { id: +sellerId }] } },
      });
    }

    return res.status(201).json({ ok: true, message: "채팅방 생성에 성공하였습니다.", chat: foundOrCreatedChat });
  } catch (error) {
    console.log("chat create handler error", error);
    return res.status(400).json({ ok: false, message: "채팅방 생성에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["POST"], handler, isPrivate: true }));
