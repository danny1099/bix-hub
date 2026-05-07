import moment from "moment";
import type { OrganizationWithMembers } from "@/modules/organization/types";
import { capitalize, defineColumns } from "@/shared/utils";

export const columnsNames = defineColumns<OrganizationWithMembers>({
  name: { style: "w-110", format: (name) => String(name) },
  role: { style: "w-24", format: (role) => capitalize(role as string) },
  members: { style: "w-auto text-center", format: (members) => String(members) },
  createdAt: { style: "w-fit", format: (date) => moment(date as Date).format("DD-MMM-YYYY") },
});
