// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { User } from "@prisma/client";
import { db } from "@/lib/db";
import { createJWT, hashPassword } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<User>>
) {
  if (req.method === "POST") {
    const { email, password, firstName, lastName } = req.body;

    const user = await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: await hashPassword(password),
      },
    });

    const jwt = await createJWT(user);

    res.setHeader(
      "Set-Cookie",
      serialize(process.env.COOKIE_NAME as string, jwt, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // week
      })
    );

    res.status(201);
    res.json({});
  } else {
    res.status(400);
    res.json({});
  }
}
