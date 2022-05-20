import prisma from "libs/server/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "libs/server/withSession";
import withHandler, { ResponseData } from "libs/server/withHandler";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      body: { text, rating },
      query: { username },
      session: { loggedInUser },
    } = req;

    const foundUser = await prisma?.user.findUnique({ where: { username: String(username) } });
    if (foundUser === null || foundUser === undefined) {
      return res.status(404).json({ ok: false, message: "존재하지 않는 유저입니다." });
    }

    await prisma?.review.create({
      data: {
        text,
        rating: +rating,
        from: { connect: { id: loggedInUser?.id } },
        to: { connect: { username: String(username) } },
      },
    });

    return res.status(200).json({ ok: true, message: "리뷰 작성에 성공하였습니다." });
  } catch (error) {
    console.log("post detail comment add handler error", error);
    return res.status(400).json({ ok: false, message: "리뷰 작성에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["POST"], handler, isPrivate: true }));
