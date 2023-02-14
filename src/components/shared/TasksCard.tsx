import { delay } from "@/lib/async";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { Task, TASK_STATUS } from "@prisma/client";
import { cookies } from "next/headers";
import { Button } from "./Button";
import { Card } from "./Card";

const getData = async () => {
  await delay(2000);

  const user = await getUserFromCookie(cookies());
  if (!user) {
    return null;
  }
  const tasks = await db.task.findMany({
    where: {
      ownerId: user.id,
      NOT: {
        status: TASK_STATUS.COMPLETED,
        deleted: true,
      },
    },
    take: 5,
    orderBy: {
      due: "asc",
    },
  });
  return tasks;
};

export const TasksCard = async ({
  title,
  tasks,
}: {
  title: string;
  tasks: Task[];
}) => {
  const data = tasks || (await getData());

  return (
    <Card>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-3xl text-gray-600">{title}</span>
        </div>
        <div>
          <Button variant="text" className="text-violet-600">
            + Create New
          </Button>
        </div>
      </div>
      <div>
        {data && data.length ? (
          <div>
            {data.map((task) => (
              <div className="py-4" key={task.id}>
                <div>
                  <span className="text-gray-800">{task.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">
                    {task.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No tasks yet.</div>
        )}
      </div>
    </Card>
  );
};
