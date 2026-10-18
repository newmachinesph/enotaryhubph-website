import config from "@payload-config";
import {
  generatePageMetadata,
  RootPage,
} from "@payloadcms/next/views";

import { importMap } from "../importMap";

type PageProps = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<Record<string, string | string[]>>;
};

export async function generateMetadata({ params, searchParams }: PageProps) {
  const generated = await generatePageMetadata({ config, params, searchParams });
  return {
    ...generated,
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    ),
    robots: { index: false, follow: false },
  };
}

export default function AdminPage({ params, searchParams }: PageProps) {
  return RootPage({
    config,
    importMap,
    params,
    searchParams,
  });
}
