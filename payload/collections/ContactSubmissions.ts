import type { CollectionConfig } from "payload";

import { authenticated } from "../access";

export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  labels: { singular: "Contact submission", plural: "Contact submissions" },
  admin: {
    group: "Inbox",
    useAsTitle: "email",
    defaultColumns: ["name", "email", "organization", "status", "createdAt"],
  },
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: "-createdAt",
  fields: [
    { name: "name", type: "text", required: true, maxLength: 120 },
    { name: "email", type: "email", required: true, index: true },
    { name: "organization", type: "text", maxLength: 160 },
    { name: "message", type: "textarea", required: true, maxLength: 4000 },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      options: ["new", "in-progress", "replied", "closed"],
      admin: { position: "sidebar" },
    },
  ],
};
