import { Prisma } from "@prisma/client";

export type ProjectWithTasks = Prisma.ProjectGetPayload<
  typeof projectWithTasks
>;

const projectWithTasks = Prisma.validator<Prisma.ProjectArgs>()({
  include: {
    tasks: true,
  },
});
