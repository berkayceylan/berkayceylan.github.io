import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="wrap page-head">
      <h1>Page not found</h1>
      <p className="lead">There is nothing at this address. This site was rebuilt in 2026, so an old link may have moved.</p>
      <p>
        <Link href="/">Home</Link>, <Link href="/projects/">projects</Link> or <Link href="/cv/">CV</Link>
      </p>
    </div>
  );
}
