import twilio from "twilio";
import sgMail from "@sendgrid/mail";
import prisma from "libs/server/prisma";
import { Token, User } from ".prisma/client";
import { withSessionRoute } from "libs/server/withSession";
import type { NextApiRequest, NextApiResponse } from "next";
import { MailDataRequired } from "@sendgrid/helpers/classes/mail";
import withHandler, { ResponseData } from "libs/server/withHandler";
import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
const twilioClient: twilio.Twilio = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const { email, phone, token, address } = req.body;

    if (token) {
      const foundToken: Token | null = await prisma.token.findUnique({ where: { payload: token } });
      if (foundToken === null) {
        return res.status(404).json({ ok: false, message: "존재하지 않는 인증번호입니다." });
      }
      req.session.loggedInUser = { id: foundToken.userId };
      await req.session.save();
      await prisma.token.deleteMany({ where: { userId: foundToken.userId } });
      return res.status(200).json({ ok: true, message: "로그인에 성공하였습니다.", token });
    }

    let foundOrCreatedUser: User | null = null;
    foundOrCreatedUser = await prisma.user.findFirst({
      where: {
        ...(email && { email }),
        ...(phone && { phone }),
      },
    });
    if (foundOrCreatedUser === null) {
      foundOrCreatedUser = await prisma.user.create({
        data: {
          ...(email && { email }),
          ...(phone && { phone }),
          username: email ? email.split("@")[0] : phone,
          address,
        },
      });
    }

    let createdRandomPayload: string = "";
    const foundToken: Token | null = await prisma.token.findFirst({ where: { userId: foundOrCreatedUser.id } });
    if (foundToken === null) {
      createdRandomPayload = String(Math.random()).substring(2, 8);
      await prisma.token.create({
        data: { payload: createdRandomPayload, user: { connect: { id: foundOrCreatedUser.id } } },
      });
    }

    if (email) {
      // Twilio SendGrid Email API를 이용한 이메일 전송
      const mailData: MailDataRequired | MailDataRequired[] = {
        to: email,
        from: "kowonp@naver.com",
        subject: "당근마켓 이메일 인증",
        text: `본인확인 인증번호 ${foundToken ? foundToken.payload : createdRandomPayload}를 화면에 입력해주세요.`,
        html: `본인확인 인증번호 <strong>${foundToken ? foundToken.payload : createdRandomPayload}</strong>를 화면에 입력해주세요.`,
      };
      const response: [sgMail.ClientResponse, {}] = await sgMail.send(mailData);
    } else if (phone) {
      // Twilio Messaging Service를 이용한 SMS 전송
      const messageInstance: MessageInstance = await twilioClient.messages.create({
        to: `82${phone}`,
        messagingServiceSid: process.env.MESSAGING_SERVICES_SID,
        body: `[당근마켓] 본인확인 인증번호 ${foundToken ? foundToken.payload : createdRandomPayload}를 화면에 입력해주세요.`,
      });
    }

    return res.status(200).json({ ok: true, message: "인증코드 받기에 성공하였습니다." });
  } catch (error) {
    console.log("login handler error", error);
    return res.status(400).json({ ok: false, message: "로그인에 실패하였습니다." });
  }
};

export default withSessionRoute(withHandler({ methods: ["POST"], handler, isPrivate: false }));
