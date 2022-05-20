import { withSessionRoute } from "libs/server/withSession";
import type { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseData } from "libs/server/withHandler";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    // req.session.loggedInUser = undefined;
    // await req.session.save();
    req.session.destroy();
    return res.status(200).json({ ok: true, message: "로그아웃에 성공하였습니다." });
  } catch (error) {
    console.log("logout handler error");
    return res.status(400).json({ ok: false, message: "로그아웃에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["POST"], handler, isPrivate: true }));
