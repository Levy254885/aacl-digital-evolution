import { Link } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { absUrl } from "@/lib/site-url";

export type Crumb = {
  label: string;
  href?: string;
};

type Props = {
  items: Crumb[];
  className?: string;
};

/**
 * Visible, accessible breadcrumbs + helper to build BreadcrumbList JSON-LD.
 * Pass the same items used for the visual trail so schema stays in sync.
 */
export function SiteBreadcrumbs({ items, className }: Props) {
  if (!items.length) return null;

  return (
    <div className={className ?? "container-x pt-6 pb-2"}>
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <span key={`${item.label}-${i}`} className="contents">
                {i > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {isLast || !item.href ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </span>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

/** Build schema.org BreadcrumbList for the given trail (Home is added if missing). */
export function breadcrumbJsonLd(items: Crumb[]) {
  const trail =
    items[0]?.href === "/" || items[0]?.label.toLowerCase() === "home"
      ? items
      : [{ label: "Home", href: "/" }, ...items];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absUrl(item.href) } : {}),
    })),
  };
}
