import { TasksCard } from "@/components/shared/TasksCard";
import { delay } from "@/lib/async";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

const getData = async (id: string) => {
  const user = await getUserFromCookie(cookies());
  delay(3000);

  const project = await db.project.findFirst({
    where: {
      id,
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  return project;
};

interface ProjectTasksProps {
  projectId: string;
}

export const ProjectTasks = async ({ projectId }: ProjectTasksProps) => {
  const project = await getData(projectId);

  return (
    <div className="h-full px-6 w-full">
      {/* @ts-ignore */}
      <TasksCard tasks={project.tasks} title={project.name} />
    </div>
  );
};
