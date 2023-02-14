import { Greetings } from "@/components/home/Greetings";
import { NewProject } from "@/components/project/NewProject";
import { Projects } from "@/components/project/Projects";
import { ProjectsSkeleton } from "@/components/project/ProjectsSkeleton";
import { TasksSkeleton } from "@/components/project/TasksSkeleton";
import { CardSkeleton } from "@/components/shared/CardSkeleton";
import { TasksCard } from "@/components/shared/TasksCard";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className="px-6 w-full">
      <div className=" h-full  items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          <Suspense fallback={<CardSkeleton />}>
            {/* @ts-ignore */}
            <Greetings />
          </Suspense>
        </div>
        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
          <Suspense fallback={<ProjectsSkeleton />}>
            {/* @ts-ignore */}
            <Projects />
          </Suspense>
          <div className="w-1/3 p-3">
            <NewProject />
          </div>
        </div>
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">
            <Suspense fallback={<TasksSkeleton title={"Upcoming tasks"} />}>
              {/* @ts-ignore */}
              <TasksCard title={"Upcoming tasks"} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
