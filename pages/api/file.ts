import withHandler, { ResponseData } from "libs/server/withHandler";
import { withSessionRoute } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

interface Response {
  result: {
    id: string;
    uploadURL: string;
  };
  result_info: any;
  success: boolean;
  errors: any[];
  messages: any[];
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const cloudflareRequestUrl = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`;

    const response: Response = await (
      await fetch(cloudflareRequestUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGE_API_TOKEN}`,
        },
      })
    ).json();

    console.log("response", response);

    return res.status(200).json({
      ok: true,
      message: "Cloudflare로부터 Image id와 Upload url을 받는데 성공하였습니다.",
      cloudflareImageId: response.result.id,
      cloudflareUploadUrl: response.result.uploadURL,
    });
  } catch (error) {
    console.log("file handler error");
    return res.status(400).json({ ok: false, message: "Cloudflare로부터 Image id와 Upload url을 받는데 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["GET"], handler, isPrivate: true }));
