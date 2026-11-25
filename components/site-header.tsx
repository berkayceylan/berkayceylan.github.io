import Link from "next/link";

const nav = [
  { href: "/projects/", label: "Projects" },
  { href: "/research/", label: "Research" },
  { href: "/cv/", label: "CV" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap site-header__row">
        <Link href="/" className="site-header__name">
          Berkay Ceylan
        </Link>
        <nav aria-label="Main">
          <ul className="site-nav">
            {nav.map((item) => (
              <li key={item.href}>
                {item.href.startsWith("#") ? <a href={item.href}>{item.label}</a> : <Link href={item.href}>{item.label}</Link>}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
