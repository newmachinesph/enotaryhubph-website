import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const indexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://enotaryhub.ph";

  return {
    rules: indexable
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: indexable ? `${baseUrl}/sitemap.xml` : undefined,
  };
}
