import { contactLinks, profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="wrap site-footer__grid">
        <h2 className="site-footer__title">Contact</h2>
        <div>
          <a className="site-footer__mail" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <p className="muted">{profile.location}</p>
          <ul className="link-row" aria-label="Profiles">
            {contactLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} rel="me">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
