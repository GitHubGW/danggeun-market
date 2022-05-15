import { NextRequest, NextFetchEvent, NextResponse } from "next/server";

export const middleware = (req: NextRequest, event: NextFetchEvent) => {
  if (!req.cookies["danggeun-market-cookie"]) {
    return NextResponse.redirect(`${req.nextUrl.origin}/login`);
  }
};
