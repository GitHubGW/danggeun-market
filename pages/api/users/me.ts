import prisma from "libs/server/prisma";
import { User } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "libs/server/withSession";
import withHandler, { ResponseData } from "libs/server/withHandler";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      session: { loggedInUser },
    } = req;

    const foundUser: User | null = await prisma.user.findUnique({ where: { id: loggedInUser?.id } });
    if (foundUser === null) {
      throw new Error();
    }

    return res.status(200).json({ ok: true, message: "현재 로그인한 사용자 보기에 성공하였습니다.", loggedInUser: foundUser });
  } catch (error) {
    console.log("users me handler error");
    return res.status(400).json({ ok: false, message: "현재 로그인한 사용자 보기에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["GET"], handler, isPrivate: true }));
