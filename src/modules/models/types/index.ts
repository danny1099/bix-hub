import type { Model as PrismaModel } from "@prisma/client";

export interface Model extends PrismaModel {
  organization?: string;
}
