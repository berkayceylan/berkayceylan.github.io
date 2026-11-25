import Link from "next/link";
import type { ComponentProps } from "react";

/** next/link for pages of this app; a plain anchor for other sites and the static files in public/. */
export function SmartLink({ href, ...rest }: { href: string } & Omit<ComponentProps<"a">, "href">) {
  const isStaticFile = href.startsWith("/15_puzzle") || href.startsWith("/others");
  if (href.startsWith("/") && !isStaticFile) return <Link href={href} {...rest} />;
  return <a href={href} {...rest} />;
}
