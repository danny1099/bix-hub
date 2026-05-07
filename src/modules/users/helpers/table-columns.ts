import moment from "moment";
import type { User } from "@/modules/users/types";
import { capitalize, defineColumns } from "@/shared/utils";

export const columnsNames = defineColumns<User>({
  name: { style: "w-80", format: (name) => name as string },
  email: { style: "w-auto", format: (email) => email as string },
  role: { style: "w-24", format: (role) => capitalize(role as string) },
  createdAt: { style: "w-auto", format: (date) => moment(date as Date).format("DD-MMM-YYYY") },
});
