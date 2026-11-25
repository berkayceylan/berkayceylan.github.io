/** Before/after chart for one measure. Both ends are labelled and the axis starts at zero. */
export function Slope({
  title,
  before,
  after,
  max,
  unit = "",
  axisNote,
}: {
  title: string;
  before: number;
  after: number;
  max: number;
  unit?: string;
  axisNote: string;
}) {
  const W = 260;
  const H = 170;
  const x0 = 72;
  const x1 = W - 72;
  const top = 12;
  const bottom = H - 28;
  const y = (v: number) => bottom - (v / max) * (bottom - top);
  const fmt = (v: number) => `${v.toFixed(2)}${unit}`;

  return (
    <div className="slope">
      <p className="slope__title">{title}</p>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${title}: ${fmt(before)} before, ${fmt(after)} after. ${axisNote}`}>
        {[x0, x1].map((x) => (
          <line key={x} className="slope__axis" x1={x} x2={x} y1={top} y2={bottom} />
        ))}
        <line className="slope__line" x1={x0} y1={y(before)} x2={x1} y2={y(after)} />
        <g>
          <title>{`Before: ${fmt(before)}`}</title>
          <circle className="slope__hit" cx={x0} cy={y(before)} r="16" />
          <circle className="slope__dot" cx={x0} cy={y(before)} r="5" />
        </g>
        <g>
          <title>{`After: ${fmt(after)}`}</title>
          <circle className="slope__hit" cx={x1} cy={y(after)} r="16" />
          <circle className="slope__dot" cx={x1} cy={y(after)} r="5" />
        </g>
        <text className="slope__value" x={x0 - 12} y={y(before)} dy="0.35em" textAnchor="end">
          {fmt(before)}
        </text>
        <text className="slope__value" x={x1 + 12} y={y(after)} dy="0.35em">
          {fmt(after)}
        </text>
        <text className="slope__tick" x={x0} y={H - 8} textAnchor="middle">
          Before
        </text>
        <text className="slope__tick" x={x1} y={H - 8} textAnchor="middle">
          After
        </text>
      </svg>
      <p className="slope__note">{axisNote}</p>
    </div>
  );
}

export function AimplantResults() {
  return (
    <figure className="results">
      <div className="slopes">
        <Slope title="Mean knowledge-test score" before={16.71} after={21.54} max={35} axisNote="35-item test, axis 0–35, p < .0001" />
        <Slope title="Spontaneous mentions of plants" before={28.33} after={56.66} max={100} unit="%" axisNote="Axis 0–100%, p < .001" />
      </div>
      <figcaption>
        Five-week outdoor field study with 24 prospective science teachers, before and after. Ceylan &amp; Altıparmak
        Karakuş, 2024.
      </figcaption>
    </figure>
  );
}
