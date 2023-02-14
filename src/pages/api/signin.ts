import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { User } from "@prisma/client";
import { db } from "@/lib/db";
import { comparePassword, createJWT } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<User> & { error?: string }>
) {
  if (req.method === "POST") {
    // req should be probably sanitized in real case scenario
    const { email, password } = req.body;

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isVerified = await comparePassword(password, user?.password!);

    if (isVerified) {
      const jwt = await createJWT(user);
      res.setHeader(
        "Set-Cookie",
        serialize(process.env.COOKIE_NAME as string, jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // week,
        })
      );
      res.status(201);
      res.json({});
    } else {
      res.status(401);
      res.json({ error: "Invalid login" });
    }
  } else {
    res.status(400);
    res.json({});
  }
}
