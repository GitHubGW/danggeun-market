import { NextRequest, NextFetchEvent } from "next/server";

export const middleware = (req: NextRequest, event: NextFetchEvent) => {
  if (req.ua?.isBot === true) {
    return new Response("봇이 감지되어 해당 페이지에 접근할 수 없습니다.", { status: 403 });
  }
};
