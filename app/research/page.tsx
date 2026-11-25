import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { education } from "@/content/cv";
import { profile } from "@/content/profile";
import { publications } from "@/content/publications";
import { breadcrumbs, pageMetadata, publicationSchema } from "@/lib/seo";

const title = "Research and publications";
const description =
  "Publications and research by Berkay Ceylan on AI in education, drawing-based modelling and mobile learning. Utrecht University and Muğla SKU.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/research/" });

const academic = ["PhD in Science Education", "Master’s Degree in Science Education", "Research Internship", "Erasmus+ Exchange in Computer Engineering"];

export default function ResearchPage() {
  return (
    <>
      <JsonLd
        nodes={[
          ...publications.map(publicationSchema),
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Research", path: "/research/" },
          ]),
        ]}
      />
      <header className="wrap page-head">
        <h1>Research</h1>
        <p className="lead">How software, and AI in particular, can help people learn science.</p>
      </header>

      <section className="wrap row" aria-labelledby="current">
        <div className="row__label">
          <h2 id="current">Current work</h2>
        </div>
        <div className="prose">
          <p>
            At Utrecht University’s Faculty of Science I work on digital modelling tools with Prof. Dr. W.R. van
            Joolingen. I design and develop <Link href="/projects/simsketch/">SimSketch</Link>, where learners draw a
            phenomenon and run the drawing as a simulation.
          </p>
          <p>
            In my PhD at Muğla Sıtkı Koçman University I study AI and software in science and computer science
            education, and build tools for collecting and evaluating research data.
          </p>
        </div>
      </section>

      <section className="wrap row" aria-labelledby="interests">
        <div className="row__label">
          <h2 id="interests">Interests</h2>
        </div>
        <ul className="plain-list">
          {profile.interests.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>

      <section className="wrap row" aria-labelledby="publications">
        <div className="row__label">
          <h2 id="publications">Publications</h2>
          <p>
            <a href={profile.links.orcid}>ORCID record</a>
          </p>
        </div>
        <ol className="entries">
          {publications.map((p) => (
            <li key={p.id} id={p.id} className="entry">
              <span className="entry__when mono">{p.year}</span>
              <div>
                <h3 className="entry__title">{p.href ? <a href={p.href}>{p.title}</a> : p.title}</h3>
                {p.originalTitle && (
                  <p className="muted" lang="tr">
                    {p.originalTitle}
                  </p>
                )}
                <p className="muted">
                  {p.authors.join(", ")} <cite>{p.venue}</cite>
                  {p.detail ? `, ${p.detail}` : ""}. {p.kind}.
                </p>
                {p.summary && (
                  <p>
                    {p.summary} More on <Link href="/projects/aimplant/">AImPLANT</Link>.
                  </p>
                )}
                <ul className="notes">
                  {p.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
                <details className="cite">
                  <summary>Cite (APA)</summary>
                  <p>{p.apa}</p>
                </details>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap row" aria-labelledby="training">
        <div className="row__label">
          <h2 id="training">Degrees and stays</h2>
        </div>
        <ol className="entries">
          {education
            .filter((d) => academic.includes(d.title))
            .map((d) => (
              <li key={d.title} className="entry">
                <span className="entry__when mono">{d.period}</span>
                <div>
                  <h3 className="entry__title">
                    {d.title}, {d.org}
                  </h3>
                  <p className="muted">{d.points.join(" ")}</p>
                </div>
              </li>
            ))}
        </ol>
      </section>
    </>
  );
}
