import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { User } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<User>>
) {
  if (req.method === "POST") {
    res.setHeader(
      "Set-Cookie",
      serialize(process.env.COOKIE_NAME as string, "", {
        httpOnly: true,
        path: "/",
        maxAge: 0,
      })
    );

    res.status(200);
    res.json({});
  } else {
    res.status(400);
    res.json({});
  }
}
