/**
 * The figure-eight solution of the three-body problem (Chenciner & Montgomery, 2000):
 * three equal masses follow one another along a single closed curve. G = m = 1.
 */
export type Body = { x: number; y: number; vx: number; vy: number };

export const PERIOD = 6.32591398;

export function initialBodies(): Body[] {
  const x = 0.97000436;
  const y = -0.24308753;
  const vx = 0.93240737;
  const vy = 0.86473146;
  return [
    { x, y, vx: vx / 2, vy: vy / 2 },
    { x: -x, y: -y, vx: vx / 2, vy: vy / 2 },
    { x: 0, y: 0, vx: -vx, vy: -vy },
  ];
}

function accelerations(bodies: Body[]): { ax: number; ay: number }[] {
  const acc = bodies.map(() => ({ ax: 0, ay: 0 }));
  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const dx = bodies[j].x - bodies[i].x;
      const dy = bodies[j].y - bodies[i].y;
      // A little softening keeps close encounters finite after a nudge.
      const d2 = dx * dx + dy * dy + 1e-5;
      const inv = 1 / (d2 * Math.sqrt(d2));
      acc[i].ax += dx * inv;
      acc[i].ay += dy * inv;
      acc[j].ax -= dx * inv;
      acc[j].ay -= dy * inv;
    }
  }
  return acc;
}

/** One velocity Verlet step, in place. */
export function step(bodies: Body[], dt: number): void {
  const a0 = accelerations(bodies);
  bodies.forEach((b, i) => {
    b.x += b.vx * dt + 0.5 * a0[i].ax * dt * dt;
    b.y += b.vy * dt + 0.5 * a0[i].ay * dt * dt;
  });
  const a1 = accelerations(bodies);
  bodies.forEach((b, i) => {
    b.vx += 0.5 * (a0[i].ax + a1[i].ax) * dt;
    b.vy += 0.5 * (a0[i].ay + a1[i].ay) * dt;
  });
}

/** Kick one body; the other two share the opposite momentum so the system doesn’t drift away. */
export function nudge(bodies: Body[], index: number, angle: number, strength: number): void {
  const dvx = Math.cos(angle) * strength;
  const dvy = Math.sin(angle) * strength;
  bodies.forEach((b, i) => {
    const k = i === index ? 1 : -1 / (bodies.length - 1);
    b.vx += k * dvx;
    b.vy += k * dvy;
  });
}

/** SVG path of the full orbit, sampled over one period. */
export function orbitPath(samples = 160): string {
  const bodies = initialBodies();
  const sub = 20;
  const dt = PERIOD / samples / sub;
  const points: string[] = [];
  for (let i = 0; i < samples; i++) {
    points.push(`${bodies[2].x.toFixed(3)} ${bodies[2].y.toFixed(3)}`);
    for (let s = 0; s < sub; s++) step(bodies, dt);
  }
  return `M${points.join("L")}Z`;
}
