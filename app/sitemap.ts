import type { MetadataRoute } from "next";
import { projectsWithPage } from "@/content/projects";
import { absolute } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/projects/", "/research/", "/cv/", ...projectsWithPage.map((p) => `/projects/${p.slug}/`), "/15_puzzle/"];
  return paths.map((p) => ({ url: absolute(p) }));
}
