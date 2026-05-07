"use client";
import { cn } from "@/shared/utils";

interface NavigationSkeletonProps {
  className?: string;
}

export function SwitcherSkeleton({ className }: NavigationSkeletonProps) {
  return (
    <div className={cn("flex items-center gap-3 p-3", className)}>
      <div className="bg-accent h-7 w-7 animate-pulse rounded" />
      <div className="flex-1 space-y-1">
        <div className="bg-accent h-4 w-32 animate-pulse rounded" />
        <div className="bg-accent h-3 w-20 animate-pulse rounded" />
      </div>
      <div className="bg-accent h-4 w-4 animate-pulse rounded" />
    </div>
  );
}
