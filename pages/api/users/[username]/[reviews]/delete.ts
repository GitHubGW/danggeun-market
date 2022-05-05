import withHandler, { ResponseData } from "libs/server/withHandler";
import { withSessionRoute } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      body: { reviewId },
      session: { loggedInUser },
    } = req;

    const foundReview = await prisma?.review.findFirst({ where: { id: +reviewId, fromId: loggedInUser?.id } });
    if (foundReview === null || foundReview === undefined) {
      return res.status(404).json({ ok: false, message: "존재하지 않는 리뷰입니다." });
    }

    await prisma?.review.delete({ where: { id: +reviewId } });
    return res.status(200).json({ ok: true, message: "리뷰 삭제에 성공하였습니다." });
  } catch (error) {
    console.log("post detail comment add handler error", error);
    return res.status(400).json({ ok: false, message: "리뷰 삭제에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["POST"], handler, isPrivate: true }));
