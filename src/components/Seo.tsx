import { useEffect } from 'react';
import { siteConfig } from '@/config/site';

export interface SeoProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  structuredData?: object | object[];
}

const ensureMeta = (selector: string, create: () => HTMLElement): HTMLElement => {
  let el = document.head.querySelector(selector) as HTMLElement | null;
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
};

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  const el = ensureMeta(
    `meta[${attr}="${key}"]`,
    () => {
      const m = document.createElement('meta');
      m.setAttribute(attr, key);
      return m;
    },
  );
  el.setAttribute(attr, key);
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  const el = ensureMeta(
    `link[rel="${rel}"]`,
    () => {
      const l = document.createElement('link');
      l.setAttribute('rel', rel);
      return l;
    },
  );
  el.setAttribute('rel', rel);
  el.setAttribute('href', href);
}

/**
 * Manages all document head tags for a page: title, meta description,
 * canonical URL, Open Graph, Twitter card, and optional JSON-LD.
 */
export function Seo({
  title,
  description,
  path,
  ogImage,
  structuredData,
}: SeoProps) {
  const fullTitle = title.includes(siteConfig.businessName)
    ? title
    : `${title} | ${siteConfig.businessName}`;

  const canonicalUrl = `${siteConfig.productionDomain}${path}`;
  const imageUrl = ogImage
    ? ogImage.startsWith('http')
      ? ogImage
      : `${siteConfig.productionDomain}${ogImage}`
    : `${siteConfig.productionDomain}${siteConfig.defaultOgImage}`;

  useEffect(() => {
    document.title = fullTitle;
    document.documentElement.lang = siteConfig.defaultLocale;

    setMeta('name', 'description', description);
    setLink('canonical', canonicalUrl);

    // Open Graph
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', siteConfig.businessName);
    setMeta('property', 'og:image', imageUrl);
    setMeta('property', 'og:locale', siteConfig.defaultLocale);

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', imageUrl);

    // Structured data (JSON-LD)
    const existing = document.getElementById('page-structured-data');
    if (existing) existing.remove();

    if (structuredData) {
      const script = document.createElement('script');
      script.id = 'page-structured-data';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    return () => {
      const sd = document.getElementById('page-structured-data');
      if (sd) sd.remove();
    };
  }, [fullTitle, description, canonicalUrl, imageUrl, structuredData]);

  return null;
}
