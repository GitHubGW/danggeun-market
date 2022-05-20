import prisma from "libs/server/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "libs/server/withSession";
import withHandler, { ResponseData } from "libs/server/withHandler";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      query: { id },
      session: { loggedInUser },
    } = req;

    const countedProduct = await prisma?.product.count({ where: { id: +id } });
    if (!countedProduct) {
      return res.status(404).json({ ok: false, message: "존재하지 않는 상품입니다." });
    }

    const foundProductLike = await prisma?.productLike.findFirst({
      where: { productId: +id, userId: loggedInUser?.id },
    });
    if (foundProductLike) {
      await prisma?.productLike.delete({ where: { id: foundProductLike?.id } });
    } else {
      await prisma?.productLike.create({
        data: { product: { connect: { id: +id } }, user: { connect: { id: loggedInUser?.id } } },
      });
    }

    const foundUser = await prisma.user.findUnique({
      where: { id: loggedInUser?.id },
    });
    await res.unstable_revalidate(`/users/${foundUser?.username}/likes`);

    return res.status(200).json({ ok: true, message: "상품 좋아요 또는 좋아요 취소에 성공하였습니다." });
  } catch (error) {
    console.log("product detail like error");
    return res.status(400).json({ ok: false, message: "상품 좋아요 또는 좋아요 취소에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["POST"], handler, isPrivate: true }));
