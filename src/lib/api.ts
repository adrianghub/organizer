import { fetcher } from "@/utils/fetcher";
import { User } from "@prisma/client";

export const register = (user: Partial<User>) => {
  return fetcher({
    url: "/api/register",
    method: "POST",
    body: user,
  });
};

export const signin = (user: Partial<User>) => {
  return fetcher({
    url: "/api/signin",
    method: "POST",
    body: user,
  });
};
