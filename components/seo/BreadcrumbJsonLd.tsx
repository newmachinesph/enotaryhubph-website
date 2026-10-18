import { JsonLd } from "./JsonLd";

export function BreadcrumbJsonLd({ name, path }: { name: string; path: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://enotaryhub.ph";

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "eNotaryHub",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name,
            item: new URL(path, baseUrl).toString(),
          },
        ],
      }}
    />
  );
}
