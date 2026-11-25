import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Orbit } from "@/components/orbit";
import { ProjectLinks } from "@/components/project-links";
import { AimplantResults } from "@/components/slope";
import { StrandList } from "@/components/strand-list";
import { experience } from "@/content/cv";
import { profile, site } from "@/content/profile";
import { getProject } from "@/content/projects";
import { publications } from "@/content/publications";
import { orbitPath } from "@/lib/three-body";
import { pageMetadata, PERSON_ID, personSchema, WEBSITE_ID, websiteSchema } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({ title: site.title, description: site.description, path: "/", type: "profile" }),
  title: { absolute: site.title },
};

const featured = ["simsketch", "aimplant", "e-learning-platform", "bc-image-editor"].map((slug) => getProject(slug)!);

export default function Home() {
  return (
    <>
      <JsonLd
        nodes={[
          personSchema,
          websiteSchema,
          {
            "@type": "ProfilePage",
            "@id": `${site.url}/#profile`,
            url: `${site.url}/`,
            name: site.title,
            isPartOf: { "@id": WEBSITE_ID },
            mainEntity: { "@id": PERSON_ID },
          },
        ]}
      />

      <section className="hero wrap">
        <h1>{profile.name}</h1>
        <div className="hero__text">
          <p className="lead">{profile.lead}</p>
          <p>{profile.intro}</p>
        </div>
      </section>

      <div className="wrap">
        <Orbit path={orbitPath()} />
      </div>

      <section className="wrap row" aria-labelledby="about">
        <div className="row__label">
          <h2 id="about">About</h2>
        </div>
        <div className="about">
          <picture>
            <source
              type="image/webp"
              srcSet="/images/berkay-ceylan-400.webp 400w, /images/berkay-ceylan-800.webp 800w"
              sizes="(min-width: 60rem) 18rem, 11rem"
            />
            <img
              className="about__photo"
              src="/images/berkay-ceylan.jpg"
              alt="Berkay Ceylan smiling outdoors in front of a brick building"
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
            />
          </picture>
          <div className="prose">
            {profile.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="spec about__now">
            {profile.now.map((n) => (
              <div key={n.label}>
                <dt>{n.label}</dt>
                <dd>{n.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap row" aria-labelledby="work">
        <div className="row__label">
          <h2 id="work">Selected work</h2>
          <p>
            <Link href="/projects/">All projects</Link>
          </p>
        </div>
        <div className="work">
          {featured.map((p) => (
            <article key={p.slug} className="work__item">
              <div className="work__meta">
                <span className="mono">{p.period}</span>
                <StrandList items={p.strands} />
              </div>
              <h3>
                <Link href={`/projects/${p.slug}/`}>{p.title}</Link>
              </h3>
              <p className="work__summary">{p.summary}</p>
              {p.slug === "simsketch" && p.page.facts && (
                <dl className="spec">
                  {p.page.facts.map((f) => (
                    <div key={f.label}>
                      <dt>{f.label}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {p.slug === "aimplant" && <AimplantResults />}
              <ProjectLinks links={p.links} title={p.title} />
            </article>
          ))}
        </div>
      </section>

      <section className="wrap row" aria-labelledby="publications">
        <div className="row__label">
          <h2 id="publications">Publications</h2>
          <p>
            <Link href="/research/">Research</Link>
          </p>
        </div>
        <ol className="entries">
          {publications.map((p) => (
            <li key={p.id} className="entry">
              <span className="entry__when mono">{p.year}</span>
              <div>
                <h3 className="entry__title">{p.href ? <a href={p.href}>{p.title}</a> : p.title}</h3>
                <p className="muted">
                  {p.authors.join(", ")} <cite>{p.venue}</cite>
                  {p.detail ? `, ${p.detail}` : ""}. {p.kind}.
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap row" aria-labelledby="experience">
        <div className="row__label">
          <h2 id="experience">Experience</h2>
          <p>
            <Link href="/cv/">Full CV</Link>
          </p>
        </div>
        <ol className="entries">
          {experience.map((r) => (
            <li key={r.org} className="entry">
              <span className="entry__when mono">{r.period}</span>
              <div>
                <h3 className="entry__title">
                  {r.title}, {r.org}
                </h3>
                <p className="muted">{r.short}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
