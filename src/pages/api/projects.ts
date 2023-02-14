import { verifyJWT } from "@/utils/verifyJWT";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { Project } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<Project>>
) {
  const user = await verifyJWT(req.cookies[process.env.COOKIE_NAME as string]!);

  await db.project.create({
    data: {
      name: req.body.name,
      ownerId: user.id,
    },
  });

  res.json({});
}
