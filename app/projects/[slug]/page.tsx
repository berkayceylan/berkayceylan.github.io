import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { ProjectLinks } from "@/components/project-links";
import { AimplantResults } from "@/components/slope";
import { StrandList } from "@/components/strand-list";
import { getProject, projectsWithPage } from "@/content/projects";
import { breadcrumbs, pageMetadata, projectSchema } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projectsWithPage.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.page.metaDescription,
    path: `/projects/${project.slug}/`,
    image: `/og/${project.slug}.png`,
    type: "article",
  });
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const i = projectsWithPage.indexOf(project);
  const next = projectsWithPage[(i + 1) % projectsWithPage.length];
  const { page } = project;
  const isPortrait = page.images?.every((img) => img.height > img.width);

  return (
    <>
      <JsonLd
        nodes={[
          projectSchema(project),
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects/" },
            { name: project.title, path: `/projects/${project.slug}/` },
          ]),
        ]}
      />
      <article>
        <header className="wrap page-head">
          <nav aria-label="Breadcrumb" className="crumbs">
            <Link href="/projects/">Projects</Link>
          </nav>
          <h1>{project.title}</h1>
          <p className="lead">{project.summary}</p>
          <ProjectLinks links={project.links} title={project.title} />
        </header>

        <div className="wrap row">
          <aside className="row__label" aria-label="Project details">
            <dl className="spec spec--stacked">
              {page.role && (
                <div>
                  <dt>Role</dt>
                  <dd>{page.role}</dd>
                </div>
              )}
              {project.period && (
                <div>
                  <dt>When</dt>
                  <dd className="mono">{project.period}</dd>
                </div>
              )}
              <div>
                <dt>Built with</dt>
                <dd>{project.stack.join(", ")}</dd>
              </div>
              {page.facts?.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <StrandList items={project.strands} />
          </aside>

          <div className="prose prose--page">
            {page.sections.map((s) => (
              <section key={s.heading}>
                <h2>{s.heading}</h2>
                {s.body?.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {s.list && (
                  <ul>
                    {s.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            {project.slug === "aimplant" && <AimplantResults />}
            {page.images && (
              <div className={`shots ${isPortrait ? "shots--portrait" : ""}`}>
                {page.images.map((img) => (
                  // eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer
                  <img key={img.src} {...img} alt={img.alt} loading="lazy" decoding="async" />
                ))}
              </div>
            )}
          </div>
        </div>
      </article>

      <nav className="wrap next-project" aria-label="Next project">
        <Link href={`/projects/${next.slug}/`}>Next: {next.title}</Link>
      </nav>
    </>
  );
}
