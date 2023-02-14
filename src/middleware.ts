import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./utils/verifyJWT";
const PUBLIC_FILE = /\.(.*)$/;

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/register") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const jwt = req.cookies.get(process.env.COOKIE_NAME as string);

  if (!jwt) {
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    await verifyJWT(jwt.value);

    return NextResponse.next();
  } catch (e) {
    console.error(e);
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }
}

// an alternative - see https://nextjs.org/docs/advanced-features/middleware#matching-paths
// export const config = {
//   matcher: [
//     "/_next*",
//     "/api*",
//     "/static*",
//     "/signin*",
//     "/register*",
//     "(/.(.*)$/)",
//   ],
// };
