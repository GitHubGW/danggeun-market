import prisma from "libs/server/prisma";
import withHandler, { ResponseData } from "libs/server/withHandler";
import { withSessionRoute } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const {
      body: { text, cloudflareImageId },
      session: { loggedInUser },
    } = req;

    const createdPost = await prisma?.post.create({
      data: {
        text,
        ...(cloudflareImageId && { cloudflareImageId }),
        user: { connect: { id: loggedInUser?.id } },
      },
    });

    const foundUser = await prisma.user.findUnique({
      where: { id: loggedInUser?.id },
    });
    await res.unstable_revalidate(`/users/${foundUser?.username}/posts`);

    return res.status(201).json({ ok: true, message: "동네생활 게시글 생성에 성공하였습니다.", post: createdPost });
  } catch (error) {
    console.log("post write handler error", error);
    return res.status(400).json({ ok: false, message: "동네생활 게시글 생성에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["POST"], handler, isPrivate: true }));
