import prisma from "libs/server/prisma";
import { Product } from ".prisma/client";
import withHandler, { ResponseData } from "libs/server/withHandler";
import { withSessionRoute } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      body: { name, price, description, cloudflareImageId },
      session: { loggedInUser },
    } = req;

    const createdProduct: Product | undefined = await prisma?.product.create({
      data: {
        name,
        price: +price,
        description,
        cloudflareImageId,
        user: { connect: { id: loggedInUser?.id } },
      },
    });

    const foundUser = await prisma.user.findUnique({
      where: { id: loggedInUser?.id },
    });
    await res.unstable_revalidate(`/users/${foundUser?.username}/sales`);

    return res.status(201).json({ ok: true, message: "상품 업로드에 성공하였습니다.", product: createdProduct });
  } catch (error) {
    console.log("product upload handler error");
    return res.status(400).json({ ok: false, message: "상품 업로드에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["POST"], handler, isPrivate: true }));
