import { delay } from "@/lib/async";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProjectWithTasks } from "@/models/prisma";
import { cookies } from "next/headers";
import Link from "next/link";
import { ProjectCard } from "./ProjectCard";

async function getData() {
  await delay(2000);

  const user = await getUserFromCookie(cookies());

  if (!user) {
    return null;
  }

  const projects = await db.project.findMany({
    where: {
      ownerId: user.id,
    },
    include: {
      tasks: true,
    },
  });

  return projects;
}

export const Projects = async () => {
  const projects = await getData();

  return (
    <>
      {!projects || projects.length === 0 ? (
        <div className="w-full flex justify-center items-center">
          <span className="text-gray-400">No projects yet</span>
        </div>
      ) : (
        projects?.map((project: ProjectWithTasks) => (
          <div className="w-1/3 p-3" key={project.id}>
            <Link href={`/project/${project.id}`}>
              <ProjectCard project={project} />
            </Link>
          </div>
        ))
      )}
    </>
  );
};
