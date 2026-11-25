import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PrintButton } from "@/components/print-button";
import { education, experience, skills } from "@/content/cv";
import { profile, site } from "@/content/profile";
import { projectsWithPage } from "@/content/projects";
import { publications } from "@/content/publications";
import { breadcrumbs, pageMetadata, personSchema } from "@/lib/seo";

const description =
  "CV of Berkay Ceylan, full-stack engineer (Flutter, React, TypeScript, Python, Firebase) and EdTech researcher at Utrecht University.";

export const metadata: Metadata = pageMetadata({ title: "CV", description, path: "/cv/", type: "profile" });

const selected = ["simsketch", "aimplant", "bc-image-editor", "periodic-table"];

export default function CvPage() {
  return (
    <>
      <JsonLd
        nodes={[
          personSchema,
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "CV", path: "/cv/" },
          ]),
        ]}
      />
      <header className="wrap page-head">
        <h1>
          <span className="print-only">Berkay Ceylan</span>
          <span className="screen-only">Curriculum vitae</span>
        </h1>
        <p className="lead">{profile.jobTitle}.</p>
        <p className="cv-contact">
          {profile.location} · <a href={`mailto:${profile.email}`}>{profile.email}</a> ·{" "}
          <a href={profile.links.linkedin}>linkedin.com/in/hi-berkay-ceylan</a> ·{" "}
          <a href={profile.links.github}>github.com/berkayceylan</a> ·{" "}
          <a href={profile.links.orcid}>ORCID {profile.orcid}</a>
          <span className="print-only"> · {site.url.replace("https://", "")}</span>
        </p>
        <PrintButton />
      </header>

      <section className="wrap row" aria-labelledby="cv-experience">
        <div className="row__label">
          <h2 id="cv-experience">Experience</h2>
        </div>
        <ol className="entries">
          {experience.map((r) => (
            <li key={r.org} className="entry">
              <span className="entry__when mono">{r.period}</span>
              <div>
                <h3 className="entry__title">{r.title}</h3>
                <p className="muted">
                  {r.org}, {r.place}
                </p>
                <ul className="notes">
                  {r.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap row" aria-labelledby="cv-education">
        <div className="row__label">
          <h2 id="cv-education">Education</h2>
        </div>
        <ol className="entries">
          {education.map((d) => (
            <li key={d.title} className="entry">
              <span className="entry__when mono">{d.period}</span>
              <div>
                <h3 className="entry__title">{d.title}</h3>
                <p className="muted">
                  {d.org}, {d.place}
                </p>
                <p>{d.points.join(" ")}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap row" aria-labelledby="cv-publications">
        <div className="row__label">
          <h2 id="cv-publications">Publications</h2>
        </div>
        <ol className="entries">
          {publications.map((p) => (
            <li key={p.id} className="entry">
              <span className="entry__when mono">{p.year}</span>
              <div>
                <p>{p.apa}</p>
                <p className="muted">{p.notes.join(". ")}.</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap row" aria-labelledby="cv-skills">
        <div className="row__label">
          <h2 id="cv-skills">Skills</h2>
        </div>
        <dl className="spec">
          {skills.map((s) => (
            <div key={s.group}>
              <dt>{s.group}</dt>
              <dd>{s.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap row" aria-labelledby="cv-projects">
        <div className="row__label">
          <h2 id="cv-projects">Selected projects</h2>
        </div>
        <ol className="entries">
          {projectsWithPage
            .filter((p) => selected.includes(p.slug))
            .map((p) => (
              <li key={p.slug} className="entry">
                <span className="entry__when mono">{p.period}</span>
                <div>
                  <h3 className="entry__title">
                    <Link href={`/projects/${p.slug}/`}>{p.title}</Link>
                  </h3>
                  <p className="muted">{p.summary}</p>
                </div>
              </li>
            ))}
        </ol>
      </section>
    </>
  );
}
