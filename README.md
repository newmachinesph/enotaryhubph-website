# eNotaryHub v2

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![Payload CMS 3](https://img.shields.io/badge/Payload_CMS-3-black)](https://payloadcms.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org)

Public pre-launch site and Payload CMS for eNotaryHub, an electronic-notarization workflow platform being built for the Philippines under A.M. No. 24-10-14-SC, the Supreme Court's 2025 Rules on Electronic Notarization. The public site explains the planned service to individuals, businesses, and notaries; the CMS manages articles, launch-list signups, and contact submissions. Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, and Payload CMS 3 on PostgreSQL.

The site still does not accept notarization requests.

- Live site: <https://enotaryhub.ph>

## Local setup

Requirements: Node.js 20.9 or newer (the minimum for Next.js 16), npm, and Docker Desktop.

```powershell
npm install
Copy-Item .env.example .env.local
npm run db:up
npm run cms:migrate
npm run dev
```

Open:

- Public site: `http://localhost:3000`
- Articles: `http://localhost:3000/articles`
- Payload admin: `http://localhost:3000/admin`

Payload asks you to create the first administrator the first time `/admin` opens. That account can manage articles and inspect the Inbox collections for waitlist and contact records.

## Data model

Payload owns the Postgres schema through its official adapter.

| Collection | Public behavior | Admin behavior |
| --- | --- | --- |
| Articles | Published records appear under `/articles`; drafts stay private. | Create and edit rich-text articles, publication state, dates, excerpts, and source notes. |
| Waitlist | The `/waitlist` form creates one record per email address. | Review signups and track `new`, `contacted`, `invited`, or `unsubscribed`. |
| Contact submissions | The contact form writes validated inquiries directly to Postgres. | Review inquiries and track `new`, `in-progress`, `replied`, or `closed`. |
| Users | No public access. | Authenticates Payload administrators. |

Uploads are intentionally absent. Articles use text and links only until an image-storage decision is made.

## Commands

```powershell
npm run dev
npm run build
npm start
npm run lint
npm test

npm run db:up
npm run db:down
npm run cms:migrate
npm run cms:migration:create -- descriptive_name
npm run cms:types
npm run cms:importmap
npm run cms:seed
```

`npm test` runs the Vitest suite (jsdom, Testing Library, axe-core) in `tests/`. `cms:seed` loads the starter articles from `scripts/seed-articles.ts` into the configured database. Run `cms:types` after changing a collection. Run `cms:importmap` after adding or changing Payload admin components. Commit generated migrations and `payload-types.ts`.

## Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection used by Payload. Local Docker and Neon both use this variable. |
| `PAYLOAD_SECRET` | Yes | Signs Payload authentication tokens. Use a random value of at least 32 characters. |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical origin used by metadata and generated crawler files. |
| `NEXT_PUBLIC_SITE_INDEXABLE` | No | Set to `true` only when the public release should appear in search. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | Google Search Console HTML-tag verification token. |

## Moving to Neon

No collection rewrite is needed. Create a Neon database, replace `DATABASE_URL` with its pooled connection string, run `npm run cms:migrate`, then deploy the same application.

Payload uses Drizzle inside its official Postgres adapter. Prisma should be introduced later only for application tables that live outside Payload; using Prisma and Payload as competing schema owners for the same collections would make migrations unreliable.

## Release checklist

- Set a production `PAYLOAD_SECRET` and database URL.
- Run all committed migrations against the target database.
- Create the first admin account and use a unique password.
- Submit a waitlist entry and contact inquiry, then confirm both records in `/admin`.
- Publish a test article, verify its canonical URL, then remove it if it is not real content.
- Keep `NEXT_PUBLIC_SITE_INDEXABLE=false` on previews.
- Run `npm run lint`, `npm test`, and `npm run build`.
- Verify Search Console and submit `/sitemap.xml` after launch.

## Project structure

- `app/(frontend)/` contains the public site pages, layout, and generated social and Apple icons.
- `app/(payload)/` exposes Payload admin and REST routes.
- `app/contact/` and `app/waitlist/` hold the client forms and server actions that write to Payload.
- `app/robots.ts`, `app/sitemap.ts`, and `app/llms.txt/` generate crawler files from `NEXT_PUBLIC_SITE_URL`.
- `app/tokens.css` is the design-token source; `app/globals.css` builds on it.
- `payload.config.ts` and `payload/collections/` define the CMS, its collections, and access rules.
- `migrations/` contains the committed Postgres schema history.
- `docker-compose.yml` runs local Postgres with a persistent named volume.
- `components/` and `content/` contain the public design system and typed copy. `content/` holds English and Filipino dictionaries; only English is routed today (`SHIPPED_LOCALES` in `content/index.ts`).
- `lib/validation.ts` holds the shared form schemas; `stores/` holds client form state.
- `public/` holds the hero image; `public/README.md` documents every image slot and its art direction.
- `docs/superpowers/specs/` holds the v2 design spec.
- `tests/` contains the Vitest suite.

## License

The code is released under the [MIT License](LICENSE). Copyright (c) 2026 eNotaryHub.

MIT covers the code; the eNotaryHub name, wordmark, and hero artwork identify the project.
