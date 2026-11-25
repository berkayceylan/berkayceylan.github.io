import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { getProject, projectsWithPage } from "@/content/projects";
import { initialBodies, orbitPath } from "@/lib/three-body";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return ["default", ...projectsWithPage.map((p) => p.slug)].map((name) => ({ file: `${name}.png` }));
}

const font = (subset: string, weight: number) =>
  readFile(
    join(process.cwd(), `node_modules/@fontsource/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-${subset}-${weight}-normal.woff`),
  );

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const slug = (await params).file.replace(/\.png$/, "");
  const project = getProject(slug);
  const title = project?.title ?? profile.name;
  const text = project?.summary ?? profile.lead;
  const colors = ["#2B54E0", "#B8265F", "#B98100"];

  const [bold, regular] = await Promise.all([font("latin", 800), font("latin", 400)]);

  // Coordinates are scaled up because the renderer works best with pixel-sized values.
  const S = 400;
  const path = orbitPath().replace(/-?\d+\.\d+/g, (n) => (Number(n) * S).toFixed(1));

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f6f8fb", color: "#131c33", padding: "64px 72px", fontFamily: "Atkinson" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: title.length > 20 ? 72 : 100, fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1 }}>{title}</div>
          <div style={{ fontSize: 34, lineHeight: 1.35, marginTop: 24, color: "#465069", maxWidth: 1000 }}>{text}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <svg width="640" height="220" viewBox={`${-1.2 * S} ${-0.42 * S} ${2.4 * S} ${0.84 * S}`}>
            <path d={path} fill="none" stroke="#9aa6c0" strokeWidth="5" />
            {initialBodies().map((b, i) => (
              <circle key={colors[i]} cx={b.x * S} cy={b.y * S} r="22" fill={colors[i]} />
            ))}
          </svg>
          <div style={{ fontSize: 28, color: "#465069" }}>berkayceylan.github.io</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Atkinson", data: regular, weight: 400, style: "normal" },
        { name: "Atkinson", data: bold, weight: 800, style: "normal" },
      ],
    },
  );
}
