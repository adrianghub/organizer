import { fetcher } from "@/utils/fetcher";
import { Project, User } from "@prisma/client";

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

export const logout = () => {
  return fetcher({
    url: "/api/logout",
    method: "POST",
  });
};

export const createNewProject = async (name: string) => {
  return fetcher({
    url: "/api/projects",
    method: "POST",
    body: { name },
  });
};
