import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "libs/server/prisma";
import withHandler, { ResponseData } from "libs/server/withHandler";
import { withSessionRoute } from "libs/server/withSession";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      query: { username },
    } = req;

    const foundUser = await prisma.user.findUnique({
      where: { username: String(username) },
      include: { _count: true },
    });
    if (foundUser === null) {
      throw new Error();
    }
    return res.status(200).json({ ok: true, message: "사용자 정보 보기에 성공하였습니다.", user: foundUser });
  } catch (error) {
    console.log("users index handler error");
    return res.status(400).json({ ok: false, message: "사용자 정보 보기에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["GET"], handler, isPrivate: false }));
