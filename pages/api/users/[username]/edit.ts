import withHandler, { ResponseData } from "libs/server/withHandler";
import { withSessionRoute } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      body: { username, email, phone, cloudflareImageId },
      session: { loggedInUser },
    } = req;

    let countedUser: number | undefined;
    const foundUser = await prisma?.user.findUnique({ where: { id: loggedInUser?.id } });

    if (username && username !== foundUser?.username) {
      countedUser = await prisma?.user.count({ where: { username } });
      if (countedUser !== 0) {
        return res.status(400).json({ ok: false, message: "이미 존재하는 유저 이름입니다." });
      }
    }
    if (email && email !== foundUser?.email) {
      countedUser = await prisma?.user.count({ where: { email } });
      if (countedUser !== 0) {
        return res.status(400).json({ ok: false, message: "이미 존재하는 이메일입니다." });
      }
    }
    if (phone && phone !== foundUser?.phone) {
      countedUser = await prisma?.user.count({ where: { phone } });
      if (countedUser !== 0) {
        return res.status(400).json({ ok: false, message: "이미 존재하는 휴대폰 번호입니다." });
      }
    }

    await prisma?.user.update({
      where: { id: loggedInUser?.id },
      data: {
        username,
        email,
        phone,
        ...(cloudflareImageId && { cloudflareImageId }),
      },
    });
    return res.status(200).json({ ok: true, message: "프로필 수정에 성공하였습니다." });
  } catch (error) {
    console.log("user edit handler error", error);
    return res.status(400).json({ ok: false, message: "프로필 수정에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["POST"], handler, isPrivate: true }));
