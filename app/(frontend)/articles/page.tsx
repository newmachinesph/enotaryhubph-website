import config from "@payload-config";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/primitives";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Plain-language notes on electronic notarization, document preparation, and the product eNotaryHub is building for the Philippines.",
  alternates: { canonical: "/articles" },
};

export default async function ArticlesPage() {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "posts",
    where: { status: { equals: "published" } },
    sort: "-publishedAt",
    limit: 24,
  });

  return (
    <Section className="pt-36 lg:pt-44">
      <BreadcrumbJsonLd name="Articles" path="/articles" />
      <p className="font-mono-label text-sun-ink">Articles</p>
      <h1 className="font-display mt-6 text-[length:var(--text-title)]">
        Notes worth keeping.
      </h1>
      <p className="text-narra-2 measure-wide mt-6 text-[length:var(--text-lead)]">
        Product updates and sourced explanations of electronic notarization in
        the Philippines. Legal claims link back to primary material.
      </p>

      {result.docs.length ? (
        <div className="mt-16 grid gap-px lg:grid-cols-2">
          {result.docs.map((post, index) => (
            <Reveal key={post.id} delay={index * 60}>
              <article className="capiz-panel h-full p-8">
                {post.imageUrl ? (
                  <div className="relative mb-7 aspect-[16/9] overflow-hidden bg-pearl-deep">
                    <Image
                      src={post.imageUrl}
                      alt={post.imageAlt ?? ""}
                      fill
                      sizes="(min-width: 1024px) 44vw, 92vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <p className="font-mono-label text-narra-3">
                  {post.publishedAt
                    ? new Intl.DateTimeFormat("en-PH", { dateStyle: "medium" }).format(
                        new Date(post.publishedAt),
                      )
                    : "Publication date pending"}
                </p>
                <h2 className="font-display mt-5 text-[1.7rem] leading-tight">
                  <Link className="gather hover:text-sun-ink" href={`/articles/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="text-narra-2 mt-4 text-small">{post.excerpt}</p>
                {post.sourceUrl ? (
                  <p className="mt-6">
                    <a
                      href={post.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="gather text-sun-ink hover:text-narra text-small underline underline-offset-4"
                    >
                      Source: {post.sourceName ?? "Read the original"}
                    </a>
                  </p>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="border-mullion-soft text-narra-2 mt-16 border-t pt-8">
          No articles are published yet.
        </p>
      )}
    </Section>
  );
}
