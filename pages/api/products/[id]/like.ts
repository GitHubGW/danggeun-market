import { Like } from ".prisma/client";
import withHandler, { ResponseData } from "libs/server/withHandler";
import { withSessionRoute } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      query: { id },
      session: { loggedInUser },
    } = req;

    const foundLike: Like | null | undefined = await prisma?.like.findFirst({
      where: { productId: +id, userId: loggedInUser?.id },
    });

    if (foundLike) {
      await prisma?.like.delete({ where: { id: foundLike?.id } });
    } else {
      await prisma?.like.create({
        data: { product: { connect: { id: +id } }, user: { connect: { id: loggedInUser?.id } } },
      });
    }

    return res.status(200).json({ ok: true, message: "상품 좋아요 또는 좋아요 취소에 성공하였습니다." });
  } catch (error) {
    console.log();
    return res.status(400).json({ ok: false, message: "상품 좋아요 또는 좋아요 취소에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["POST"], handler, isPrivate: true }));
