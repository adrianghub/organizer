import { ProjectTasks } from "@/components/project/ProjectTasks";
import { TasksSkeleton } from "@/components/project/TasksSkeleton";
import { Suspense } from "react";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="h-full px-6 w-full">
      <Suspense fallback={<TasksSkeleton />}>
        {/* @ts-ignore */}
        <ProjectTasks projectId={params.id} />
      </Suspense>
    </div>
  );
}
