"use client";
import type { Model } from "@prisma/client";
import { cn } from "@/shared/utils";

interface ModelReportViewProps {
  model: Model;
  className?: string;
}

export const ModelReportView = ({ model, className }: ModelReportViewProps) => {
  return (
    <div className={cn("size-full shrink-0", className)}>
      <iframe
        id={`report-${model.id}`}
        title={`BI report ${model.name}`}
        loading="lazy"
        src={`${model.url}`}
        allowFullScreen={true}
        className="size-full rounded-lg"
      />
    </div>
  );
};
