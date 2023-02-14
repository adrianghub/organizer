import { verifyJWT } from "@/utils/verifyJWT";
import { User } from "@prisma/client";
import argon2 from "argon2";
import { SignJWT } from "jose";
import { ReadonlyRequestCookies } from "next/dist/server/app-render";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";
import { db } from "./db";

export const hashPassword = async (password: string) => {
  return await argon2.hash(password);
};

export const comparePassword = async (
  plainTextPassword: string | Buffer,
  hashedPassword: string
) => {
  return await argon2.verify(hashedPassword, plainTextPassword);
};

export const createJWT = (user: User) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7; // week

  return new SignJWT({ payload: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const getUserFromCookie = async (
  cookies: RequestCookies | ReadonlyRequestCookies
) => {
  const jwt = cookies.get(process.env.COOKIE_NAME as string);

  if (!jwt) {
    return null;
  }

  const { id } = await verifyJWT(jwt.value);

  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};
