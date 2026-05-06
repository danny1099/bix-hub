import { Skeleton } from "@/shared/components";
import { cn } from "@/shared/utils";

export const TableRowSkeleton = () => {
  return (
    <div className="border-muted/75 flex items-center gap-3 border-b px-4 py-3.5 last:border-0">
      <div className="flex flex-1 flex-col gap-1.5">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-2.5 w-20 opacity-60" />
      </div>
      <div className="min-w-0 flex-[1.5]">
        <Skeleton className="h-3 w-[90%]" />
      </div>
      <div className="min-w-0 flex-2">
        <Skeleton className="h-3 w-72" />
      </div>
      <div className="w-6 shrink-0">
        <Skeleton className="size-3 rounded-full" />
      </div>
    </div>
  );
};

export const TableHeaderSkeleton = () => {
  return (
    <div className="bg-muted/30 border-border/40 flex h-10 items-center gap-3 border-b px-4 py-2.5">
      <Skeleton className="h-2.5 w-10 flex-1" />
      <Skeleton className="h-2.5 w-9 flex-[1.5]" />
      <Skeleton className="h-2.5 w-72 max-w-72" />
      <Skeleton className="size-3 shrink-0 rounded-full" />
    </div>
  );
};

interface TableSkeletonProps {
  rows?: number;
  className?: string;
}

export function TableSkeleton({ rows = 3, className }: TableSkeletonProps) {
  return (
    <div className={cn("bg-background w-full overflow-hidden", className)}>
      <TableHeaderSkeleton />
      {Array.from({ length: rows }).map((_, i) => (
        <TableRowSkeleton key={i} />
      ))}
    </div>
  );
}
