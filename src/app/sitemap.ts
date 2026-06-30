import type { MetadataRoute } from "next";
import { business, navLinks } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...navLinks.map((l) => l.href),
    "/booking",
    "/privacy-policy",
    "/terms",
  ];
  const now = new Date();
  return routes.map((path) => ({
    url: `${business.url}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
