import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler } from "next";
import { IronSessionOptions } from "iron-session";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    loggedInUser?: {
      id: number;
    };
  }
}

const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "danggeun-market-cookie",
  cookieOptions: { secure: process.env.NODE_ENV === "production" },
};

export const withSessionRoute = (handler: NextApiHandler) => {
  return withIronSessionApiRoute(handler, sessionOptions);
};

export const withSessionSsr = <P extends { [key: string]: unknown }>(
  handler: (context: GetServerSidePropsContext) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) => {
  return withIronSessionSsr(handler, sessionOptions);
};
