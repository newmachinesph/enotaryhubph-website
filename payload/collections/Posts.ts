import type { CollectionConfig } from "payload";

import { authenticated, publishedOrAuthenticated } from "../access";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Article", plural: "Articles" },
  admin: {
    group: "Publishing",
    useAsTitle: "title",
    defaultColumns: ["title", "status", "publishedAt", "updatedAt"],
  },
  access: {
    create: authenticated,
    read: publishedOrAuthenticated,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: "-publishedAt",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      maxLength: 160,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { position: "sidebar" },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      index: true,
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayAndTime" },
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      maxLength: 320,
    },
    {
      name: "imageUrl",
      label: "Cover image URL",
      type: "text",
      admin: {
        description: "HTTPS image URL. Images stay with the external host; Payload stores only the link.",
      },
      validate: (value: unknown) =>
        !value || (typeof value === "string" && /^https:\/\//i.test(value))
          ? true
          : "Use a full HTTPS image URL.",
    },
    {
      name: "imageAlt",
      label: "Cover image alt text",
      type: "text",
      maxLength: 180,
      admin: { description: "Describe the image for readers who cannot see it." },
    },
    {
      name: "sourceName",
      label: "External source name",
      type: "text",
      maxLength: 120,
    },
    {
      name: "sourceUrl",
      label: "External source URL",
      type: "text",
      admin: { description: "Link to the primary or original source used for the article." },
      validate: (value: unknown) =>
        !value || (typeof value === "string" && /^https:\/\//i.test(value))
          ? true
          : "Use a full HTTPS source URL.",
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "sourceNote",
      label: "Sources and review note",
      type: "textarea",
      admin: {
        description:
          "List primary sources and record who reviewed legal claims before publishing.",
      },
    },
  ],
};
