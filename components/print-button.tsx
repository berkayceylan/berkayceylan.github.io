"use client";

export function PrintButton() {
  return (
    <button type="button" className="screen-only" onClick={() => window.print()}>
      Print or save as PDF
    </button>
  );
}
