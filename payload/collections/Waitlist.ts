import type { CollectionConfig } from "payload";

import { authenticated } from "../access";

export const Waitlist: CollectionConfig = {
  slug: "waitlist",
  labels: { singular: "Waitlist entry", plural: "Waitlist" },
  admin: {
    group: "Inbox",
    useAsTitle: "email",
    defaultColumns: ["email", "name", "audience", "status", "createdAt"],
  },
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: "-createdAt",
  fields: [
    { name: "email", type: "email", required: true, unique: true, index: true },
    { name: "name", type: "text", maxLength: 120 },
    { name: "organization", type: "text", maxLength: 160 },
    {
      name: "audience",
      type: "select",
      required: true,
      defaultValue: "individual",
      options: [
        { label: "Individual", value: "individual" },
        { label: "Business", value: "business" },
        { label: "Notary", value: "notary" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      options: ["new", "contacted", "invited", "unsubscribed"],
      admin: { position: "sidebar" },
    },
    { name: "source", type: "text", defaultValue: "website" },
  ],
};
