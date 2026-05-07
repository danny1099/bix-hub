import moment from "moment";
import type { Model } from "@prisma/client";
import { capitalize, defineColumns } from "@/shared/utils";

export const columnsNames = defineColumns<Model>({
  name: { style: "w-110", format: (name) => String(name) },
  slug: { style: "w-28", format: (slug) => String(slug) },
  status: { style: "w-24", format: (status) => capitalize(status as string) },
  createdAt: { style: "w-fit", format: (date) => moment(date as Date).format("DD-MMM-YYYY") },
});
