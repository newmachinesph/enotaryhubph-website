import type { MetadataRoute } from "next";
import config from "@payload-config";
import { getPayload } from "payload";

import { routes } from "@/content";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://enotaryhub.ph";
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = Object.values(routes).map((route) => ({
    url: new URL(route, baseUrl).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));

  try {
    const payload = await getPayload({ config });
    const posts = await payload.find({
      collection: "posts",
      where: { status: { equals: "published" } },
      select: { slug: true, updatedAt: true },
      pagination: false,
    });

    return [
      ...pages,
      ...posts.docs.map((post) => ({
        url: new URL(`/articles/${post.slug}`, baseUrl).toString(),
        lastModified: new Date(post.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ];
  } catch (error) {
    console.error(
      "[sitemap] articles unavailable",
      error instanceof Error ? error.message : "Unknown database error",
    );
    return pages;
  }
}
