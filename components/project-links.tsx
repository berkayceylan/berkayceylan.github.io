import { SmartLink } from "./smart-link";

export function ProjectLinks({ links, title }: { links: { label: string; href: string }[]; title: string }) {
  return (
    <ul className="link-row">
      {links.map((l) => (
        <li key={l.href}>
          <SmartLink href={l.href}>
            {l.label}
            <span className="sr-only">, {title}</span>
          </SmartLink>
        </li>
      ))}
    </ul>
  );
}
