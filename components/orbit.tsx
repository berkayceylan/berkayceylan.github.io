"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { strands } from "@/content/strands";
import { type Body, initialBodies, nudge, step } from "@/lib/three-body";

const DT = 1 / 400; // simulation time per step
const SPEED = 0.8; // simulation time per real second
const SAMPLE_EVERY = 0.02; // simulation time between trail samples
const TRAIL = 60;
const SEGMENTS = 4;
const VIEW = { x: -1.62, y: -0.6, w: 3.24, h: 1.2 };
const LIMIT = { x: 2.4, y: 1.6 };

type Trails = { x: number; y: number }[][];

const emptyTrails = (): Trails => [[], [], []];

/** Server-rendered at rest; animates once mounted, unless reduced motion is requested. */
export function Orbit({ path }: { path: string }) {
  const bodies = useRef<Body[]>(initialBodies());
  const trails = useRef<Trails>(emptyTrails());
  const groups = useRef<(SVGGElement | null)[]>([]);
  const lines = useRef<(SVGPolylineElement | null)[][]>([[], [], []]);
  const svg = useRef<SVGSVGElement>(null);
  const visible = useRef(true);
  const nudges = useRef(0);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [status, setStatus] = useState("");

  const draw = useCallback(() => {
    bodies.current.forEach((b, i) => {
      groups.current[i]?.setAttribute("transform", `translate(${b.x.toFixed(4)} ${(-b.y).toFixed(4)})`);
      const pts = trails.current[i];
      const size = Math.ceil(TRAIL / SEGMENTS);
      for (let s = 0; s < SEGMENTS; s++) {
        // Segments overlap by one point so the trail has no gaps.
        const end = pts.length - s * size + (s ? 1 : 0);
        const slice = end > 1 ? pts.slice(Math.max(0, end - size - 1), end) : [];
        lines.current[i][s]?.setAttribute("points", slice.map((p) => `${p.x.toFixed(4)},${(-p.y).toFixed(4)}`).join(" "));
      }
    });
  }, []);

  const reset = useCallback(
    (message: string) => {
      bodies.current = initialBodies();
      trails.current = emptyTrails();
      nudges.current = 0;
      setStatus(message);
      draw();
    },
    [draw],
  );

  useEffect(() => {
    setReady(true);
    setPlaying(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
    });
    if (svg.current) observer.observe(svg.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let last = performance.now();
    let pending = 0;
    let sinceSample = 0;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const elapsed = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible.current) return;

      pending += elapsed * SPEED;
      while (pending >= DT) {
        step(bodies.current, DT);
        pending -= DT;
        sinceSample += DT;
        if (sinceSample >= SAMPLE_EVERY) {
          sinceSample = 0;
          bodies.current.forEach((b, i) => {
            const t = trails.current[i];
            t.push({ x: b.x, y: b.y });
            if (t.length > TRAIL) t.shift();
          });
        }
      }

      const escaped = bodies.current.some(
        (b) => !Number.isFinite(b.x) || Math.abs(b.x) > LIMIT.x || Math.abs(b.y) > LIMIT.y,
      );
      if (escaped) reset("A body escaped, so the orbit started over.");
      else draw();
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, draw, reset]);

  const onNudge = () => {
    nudges.current += 1;
    const i = nudges.current % 3;
    nudge(bodies.current, i, Math.random() * Math.PI * 2, 0.05);
    setStatus(
      nudges.current === 1
        ? "Nudged. The orbit should wobble and survive."
        : `Nudged ${nudges.current} times. Keep going and it falls apart.`,
    );
    setPlaying(true);
  };

  return (
    <figure className="orbit">
      <svg
        ref={svg}
        className="orbit__plot"
        viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
        role="img"
        aria-label="Three bodies, labelled software, research and education, following one another along a figure-eight orbit."
      >
        <path className="orbit__path" d={path} transform="scale(1 -1)" />
        {strands.map((s, i) => (
          <g key={s} className={`orbit__trail stroke--${s}`}>
            {Array.from({ length: SEGMENTS }, (_, k) => (
              <polyline
                key={k}
                ref={(el) => {
                  lines.current[i][k] = el;
                }}
                style={{ opacity: 0.85 - k * 0.22 }}
              />
            ))}
          </g>
        ))}
        {initialBodies().map((b, i) => (
          <g
            key={strands[i]}
            ref={(el) => {
              groups.current[i] = el;
            }}
            transform={`translate(${b.x.toFixed(4)} ${(-b.y).toFixed(4)})`}
          >
            <circle r="0.034" className={`orbit__body fill--${strands[i]}`} />
            <text className="orbit__label" x="0" y="-0.07" textAnchor="middle">
              {strands[i]}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="orbit__caption">
        <p>
          Three equal masses chasing one another along a single curve, integrated live with velocity Verlet. The same
          orbit is one of SimSketch’s built-in examples.
        </p>
        <div className="orbit__controls" style={{ visibility: ready ? "visible" : "hidden" }}>
          <button type="button" onClick={() => setPlaying((p) => !p)}>
            {playing ? "Pause" : "Play"}
          </button>
          <button type="button" onClick={onNudge}>
            Nudge a body
          </button>
          <button type="button" onClick={() => reset("")}>
            Start over
          </button>
        </div>
        <p className="orbit__status" role="status">
          {status}
        </p>
      </figcaption>
    </figure>
  );
}
