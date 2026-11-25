import type { Metadata } from "next";
import { profile, site } from "@/content/profile";
import type { Publication } from "@/content/publications";
import type { Project } from "@/content/projects";

export const PERSON_ID = `${site.url}/#person`;
export const WEBSITE_ID = `${site.url}/#website`;

export const absolute = (path: string) => new URL(path, site.url).toString();

export function pageMetadata({
  title,
  description,
  path,
  image = "/og/default.png",
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "profile";
}): Metadata {
  const images = [{ url: image, width: 1200, height: 630, alt: title }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type, url: path, title, description, siteName: site.name, locale: "en_US", images },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export const personSchema = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: profile.name,
  url: `${site.url}/`,
  image: absolute("/images/berkay-ceylan-square.jpg"),
  jobTitle: profile.jobTitle,
  description: site.description,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Utrecht", addressCountry: "NL" },
  affiliation: [
    { "@type": "CollegeOrUniversity", name: "Utrecht University", url: "https://www.uu.nl/en" },
    { "@type": "CollegeOrUniversity", name: "Muğla Sıtkı Koçman University", url: "https://www.mu.edu.tr/" },
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Muğla Sıtkı Koçman University" },
    { "@type": "CollegeOrUniversity", name: "Manisa Celal Bayar University" },
  ],
  knowsLanguage: ["tr", "en"],
  knowsAbout: [...profile.interests, "Flutter", "React", "TypeScript", "Python", "Firebase", "LLM integration"],
  identifier: { "@type": "PropertyValue", propertyID: "ORCID", value: profile.orcid, url: profile.links.orcid },
  sameAs: Object.values(profile.links),
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${site.url}/`,
  name: site.name,
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
};

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function publicationSchema(p: Publication) {
  return {
    "@type": p.kind === "Book chapter" ? "Chapter" : "ScholarlyArticle",
    "@id": `${site.url}/research/#${p.id}`,
    name: p.title,
    headline: p.title.slice(0, 110),
    ...(p.originalTitle ? { alternateName: p.originalTitle } : {}),
    inLanguage: p.originalTitle ? "tr" : "en",
    datePublished: String(p.year),
    author: [
      { "@id": PERSON_ID, "@type": "Person", name: profile.name },
      { "@type": "Person", name: "Melek Altıparmak Karakuş" },
    ],
    ...(p.kind === "Journal article"
      ? { isPartOf: { "@type": "Periodical", name: p.venue }, pagination: "668–688" }
      : { publisher: { "@type": "Organization", name: p.venue } }),
    ...(p.doi ? { identifier: { "@type": "PropertyValue", propertyID: "DOI", value: p.doi }, url: p.href, sameAs: p.href } : {}),
  };
}

export function projectSchema(p: Project & { page: { metaDescription: string } }) {
  const isPhysical = p.kind.startsWith("Arduino");
  const external = p.links.filter((l) => l.href.startsWith("http")).map((l) => l.href);
  const source = external.find((h) => h.startsWith("https://github.com"));
  return {
    "@type": isPhysical ? "CreativeWork" : source ? "SoftwareSourceCode" : "WebApplication",
    "@id": `${absolute(`/projects/${p.slug}/`)}#project`,
    name: p.title,
    description: p.page.metaDescription,
    url: absolute(`/projects/${p.slug}/`),
    author: { "@id": PERSON_ID, "@type": "Person", name: profile.name },
    keywords: p.stack.join(", "),
    sameAs: external,
    ...(source && !isPhysical ? { codeRepository: source } : {}),
    ...(!isPhysical && !source ? { applicationCategory: "EducationalApplication" } : {}),
  };
}

/** `<` is escaped so content can never close the script tag early. */
export function graph(...nodes: object[]) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(/</g, "\\u003c");
}
