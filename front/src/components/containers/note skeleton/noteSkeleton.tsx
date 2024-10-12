import { Skeleton } from "../../ui/skeleton";

export function NoteSkeleton() {
  return (
    <div className="flex flex-wrap gap-8 py-12">
      {Array.from({ length: 7 }).map((_, index) => (
        <Skeleton key={index} className="h-[125px] w-[250px] rounded-xl" />
      ))}
    </div>
  );
}

export default NoteSkeleton;
