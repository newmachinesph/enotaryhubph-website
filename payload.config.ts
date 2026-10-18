import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "node:path";
import { buildConfig } from "payload";
import { fileURLToPath } from "node:url";

import { ContactSubmissions } from "./payload/collections/ContactSubmissions";
import { Posts } from "./payload/collections/Posts";
import { Users } from "./payload/collections/Users";
import { Waitlist } from "./payload/collections/Waitlist";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// A known fallback secret would let anyone forge admin tokens, so production
// refuses to start without a real one.
const secret =
  process.env.PAYLOAD_SECRET ??
  (process.env.NODE_ENV === "production" ? undefined : "development-only-change-me");
if (!secret) {
  throw new Error("PAYLOAD_SECRET must be set in production");
}

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " · eNotaryHub Admin",
    },
  },
  collections: [Users, Posts, Waitlist, ContactSubmissions],
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URL ??
        "postgresql://enotaryhub:enotaryhub@localhost:5432/enotaryhub",
    },
  }),
  editor: lexicalEditor(),
  secret,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
