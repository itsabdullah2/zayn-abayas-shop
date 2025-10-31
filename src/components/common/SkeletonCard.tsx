import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[225px] rounded-xl bg-light-gray" />
      <div className="space-y-2 flex items-center gap-5">
        <Skeleton className="flex-1 h-4 bg-light-gray" />
        <Skeleton className="flex-1 h-4 bg-light-gray" />
      </div>
    </div>
  );
}
