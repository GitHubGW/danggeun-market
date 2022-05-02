import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseData {
  ok: boolean;
  message: string;
  [key: string]: any;
}

export interface CommonResult {
  ok: boolean;
  message: string;
  [key: string]: any;
}

type Methods = "GET" | "POST" | "PUT" | "DELETE";

interface WithHandlerArgs {
  methods: Methods[];
  handler: (req: NextApiRequest, res: NextApiResponse<ResponseData>) => Promise<void>;
  isPrivate: boolean;
}

const withHandler = ({ methods, handler, isPrivate }: WithHandlerArgs) => {
  console.log("methods", methods);

  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (methods.includes(req.method as any) === false) {
        return res.status(405).json({ ok: false, message: `${req.method} 메서드는 허용되지 않습니다. 허용되는 메서드는 ${methods} 입니다.` });
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
