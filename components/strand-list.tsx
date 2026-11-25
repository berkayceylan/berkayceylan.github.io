import type { Strand } from "@/content/strands";

/** Coloured dots always come with their names, so colour is never the only cue. */
export function StrandList({ items }: { items: readonly Strand[] }) {
  return (
    <ul className="strands" aria-label="Strands">
      {items.map((s) => (
        <li key={s} className="strand">
          <span className={`dot dot--${s}`} aria-hidden="true" />
          {s}
        </li>
      ))}
    </ul>
  );
}
