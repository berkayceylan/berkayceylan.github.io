import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ProjectLinks } from "@/components/project-links";
import { StrandList } from "@/components/strand-list";
import { site } from "@/content/profile";
import { projects, projectsWithPage } from "@/content/projects";
import { absolute, breadcrumbs, pageMetadata, WEBSITE_ID } from "@/lib/seo";

const title = "Projects";
const description =
  "Software by Berkay Ceylan: SimSketch, AImPLANT, e-learning platforms, open-source Flutter packages, React web apps and Arduino projects for the classroom.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/projects/" });

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        nodes={[
          {
            "@type": "CollectionPage",
            "@id": `${site.url}/projects/`,
            url: `${site.url}/projects/`,
            name: title,
            description,
            isPartOf: { "@id": WEBSITE_ID },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: projectsWithPage.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: p.title,
                url: absolute(`/projects/${p.slug}/`),
              })),
            },
          },
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects/" },
          ]),
        ]}
      />
      <header className="wrap page-head">
        <h1>Projects</h1>
        <p className="lead">Research software, client work, open source, and things I made for the classroom.</p>
      </header>
      <ul className="wrap index">
        {projects.map((p) => (
          <li key={p.slug} className="index__item">
            <div className="index__head">
              <h2>{p.page ? <Link href={`/projects/${p.slug}/`}>{p.title}</Link> : p.title}</h2>
              <p className="muted">{p.period ? `${p.kind}, ${p.period}` : p.kind}</p>
            </div>
            <div className="index__body">
              <p>{p.summary}</p>
              <p className="muted index__stack">{p.stack.join(", ")}</p>
            </div>
            <div className="index__side">
              <StrandList items={p.strands} />
              <ProjectLinks links={p.links} title={p.title} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
