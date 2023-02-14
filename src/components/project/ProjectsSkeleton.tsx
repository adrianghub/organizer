import { Card } from "../shared/Card";
import { CardSkeleton } from "../shared/CardSkeleton";

export const ProjectsSkeleton = () => {
  const arr = Array.from({ length: 6 }, (_, i) => i);

  return (
    <>
      {arr?.map((el) => (
        <div className="w-1/3 p-3" key={el}>
          <CardSkeleton />
        </div>
      ))}
    </>
  );
};
