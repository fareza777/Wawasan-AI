import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import type { ContentItem } from "@/types/content";
import { getCategoryLabel, getCategoryPath } from "@/lib/utils";

interface PageSeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedAt?: string;
  updatedAt?: string;
}

export function createMetadata({
  title,
  description,
  path = "",
  image,
  type = "website",
  publishedAt,
  updatedAt,
}: PageSeoProps): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  const ogImage = image ?? `${SITE_CONFIG.url}/og-default.png`;

  return {
    title: `${title} | ${SITE_CONFIG.name}`,
    description,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedAt && { publishedTime: publishedAt }),
      ...(updatedAt && { modifiedTime: updatedAt }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function createContentJsonLd(item: ContentItem) {
  const url = `${SITE_CONFIG.url}${getCategoryPath(item.category)}/${item.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: item.description,
    image: item.featuredImage,
    datePublished: item.publishedAt,
    dateModified: item.updatedAt,
    author: {
      "@type": "Person",
      name: item.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    url,
    articleSection: getCategoryLabel(item.category),
    keywords: item.tags.join(", "),
  };
}

export function createWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function createOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    slogan: SITE_CONFIG.tagline,
  };
}
