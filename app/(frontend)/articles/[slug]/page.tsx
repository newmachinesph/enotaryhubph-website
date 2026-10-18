import config from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/primitives";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

async function findPost(slug: string) {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "posts",
    where: {
      and: [{ slug: { equals: slug } }, { status: { equals: "published" } }],
    },
    limit: 1,
  });
  return result.docs[0] ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await findPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/articles/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/articles/${post.slug}`,
      publishedTime: post.publishedAt ?? undefined,
      images: post.imageUrl
        ? [{ url: post.imageUrl, alt: post.imageAlt ?? post.title }]
        : undefined,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await findPost(slug);
  if (!post) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://enotaryhub.ph";

  return (
    <Section className="pt-36 lg:pt-44">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          mainEntityOfPage: new URL(`/articles/${post.slug}`, baseUrl).toString(),
          publisher: { "@id": `${baseUrl}#organization` },
          image: post.imageUrl || undefined,
          citation: post.sourceUrl || undefined,
        }}
      />
      <article className="mx-auto max-w-3xl">
        <p className="font-mono-label text-sun-ink">eNotaryHub article</p>
        <h1 className="font-display mt-6 text-[length:var(--text-title)]">
          {post.title}
        </h1>
        <p className="text-narra-2 mt-6 text-[length:var(--text-lead)]">
          {post.excerpt}
        </p>
        {post.publishedAt ? (
          <time className="font-mono-label text-narra-3 mt-8 block" dateTime={post.publishedAt}>
            {new Intl.DateTimeFormat("en-PH", { dateStyle: "long" }).format(
              new Date(post.publishedAt),
            )}
          </time>
        ) : null}
        {post.imageUrl ? (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden bg-pearl-deep">
            <Image
              src={post.imageUrl}
              alt={post.imageAlt ?? ""}
              fill
              priority
              sizes="(min-width: 768px) 48rem, 92vw"
              className="object-cover"
            />
          </div>
        ) : null}
        <div className="prose-enotary mt-14">
          <RichText data={post.content} />
        </div>
        {post.sourceNote ? (
          <aside className="border-mullion-soft text-narra-2 mt-16 border-t pt-6 text-small">
            <p className="font-mono-label text-narra-3 mb-3">Sources and review</p>
            <p className="whitespace-pre-line">{post.sourceNote}</p>
          </aside>
        ) : null}
        {post.sourceUrl ? (
          <p className="mt-8 text-small">
            <a
              href={post.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="gather text-sun-ink hover:text-narra underline underline-offset-4"
            >
              Read the primary source: {post.sourceName ?? "original publication"}
            </a>
          </p>
        ) : null}
      </article>
    </Section>
  );
}
