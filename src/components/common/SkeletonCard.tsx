import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[225px] rounded-xl bg-gray-300" />
      <div className="flex items-center gap-5">
        <Skeleton className="flex-1 h-4 bg-gray-300" />
        <Skeleton className="flex-1 h-4 bg-gray-300" />
      </div>
    </div>
  );
}
