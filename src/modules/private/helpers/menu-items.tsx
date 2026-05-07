import type { UserRole } from "@prisma/client";
import type { MenuItem, Segment } from "@/modules/private/types";

export const menuSegments: Record<UserRole, Segment[]> = {
  owner: [
    {
      group: "main",
      styles: "mt-5",
      view: "admin",
    },
    {
      group: "platform",
      styles: "mt-10",
      title: "Platform",
      view: "admin",
    },
  ],
  admin: [
    {
      group: "main",
      styles: "mt-5",
      view: "admin",
    },
    {
      group: "platform",
      styles: "mt-10",
      title: "Platform",
      view: "admin",
    },
  ],
  member: [
    {
      group: "main",
      styles: "mt-5",
      view: "admin",
    },
    {
      group: "platform",
      styles: "mt-10",
      title: "Platform",
      view: "admin",
    },
  ],
};

export const menuItems: Record<UserRole, MenuItem[]> = {
  owner: [
    {
      name: "overview",
      path: "overview",
      render: "link",
      place: "main",
      icon: "screen",
      view: "admin",
    },
    {
      name: "accounts",
      path: "accounts",
      render: "link",
      place: "main",
      icon: "company",
      view: "admin",
    },
    {
      name: "users",
      path: "users",
      render: "link",
      place: "platform",
      icon: "people",
      view: "admin",
    },
  ],
  admin: [],
  member: [
    {
      name: "overview",
      path: "overview",
      render: "link",
      place: "main",
      icon: "screen",
      view: "admin",
    },
    {
      name: "users",
      path: "users",
      render: "link",
      place: "platform",
      icon: "people",
      view: "admin",
    },
  ],
};
