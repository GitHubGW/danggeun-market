import withHandler, { ResponseData } from "libs/server/withHandler";
import { withSessionRoute } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const foundProducts = await prisma?.product.findMany({ include: { _count: { select: { likes: true } } } });
    return res.status(200).json({ ok: true, message: "전체 상품 보기에 성공하였습니다.", products: foundProducts });
  } catch (error) {
    console.log("products handler error");
    return res.status(400).json({ ok: false, message: "전체 상품 보기에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["GET"], handler, isPrivate: false }));
