import { Button } from "../shared/Button";
import { Card } from "../shared/Card";

export const TasksSkeleton = ({ title }: { title?: string }) => (
  <>
    <Card>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-3xl text-gray-600">Project: {title}</span>
        </div>
        <div>
          <Button variant="text" className="text-violet-600">
            + Create New
          </Button>
        </div>
      </div>
      <div className="w-full py-4">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-300 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-gray-300 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-gray-300 rounded col-span-2"></div>
                <div className="h-2 bg-gray-300 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </>
);
