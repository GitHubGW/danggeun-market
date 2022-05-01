import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseData {
  ok: boolean;
  message: string;
  [key: string]: any;
}

export interface CommonMutationResult {
  ok: boolean;
  message: string;
  [key: string]: any;
}

interface WithHandlerArgs {
  method: "GET" | "POST" | "PUT" | "DELETE";
  handler: (req: NextApiRequest, res: NextApiResponse<ResponseData>) => Promise<void>;
  isPrivate: boolean;
}

const withHandler = ({ method, handler, isPrivate }: WithHandlerArgs) => {
  console.log("method", method);

  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (req.method !== method) {
        return res.status(405).json({ ok: false, message: `${method} 메서드는 허용되지 않습니다. 허용되는 메서드는 ${req.method} 입니다.` });
      }
      if (isPrivate === true && req.session.loggedInUser === undefined) {
        return res.status(401).json({ ok: false, message: `로그인한 사용자만 접근 가능합니다.` });
      }
      await handler(req, res);
    } catch (error) {
      console.log("withHandler error");
      return res.status(500).json({ ok: false, message: "withHandler error", error });
    }
  };
};

export default withHandler;
