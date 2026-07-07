import Link from "next/link";
import { cn } from "@lib/utils";

/**
 * Pagination component with first/last links, ellipsis, and accessible markup.
 */
export function Pagination({
  baseUrl,
  page,
  perPage,
  total,
}: {
  baseUrl: string;
  page: number;
  perPage: number;
  total: number;
}) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;

  const createLink = (p: number, label?: string, ariaCurrent = false) => (
    <Link
      key={p}
      href={`${baseUrl}/${p}`}
      aria-current={ariaCurrent ? "page" : undefined}
      className={cn(
        "px-3 py-1 rounded",
        p === page ? "bg-primary text-primary-foreground" : "bg-muted"
      )}
    >
      {label ?? p}
    </Link>
  );

  const window = 2; // number of pages before/after current to show
  const pages: (number | "ellipsis")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - window && i <= page + window)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "ellipsis") {
      pages.push("ellipsis");
    }
  }

  return (
    <nav aria-label="Pagination Navigation" className="flex space-x-2 items-center">
      {/* First page link */}
      {page > 1 && createLink(1, "« First")}
      {pages.map((p, idx) =>
        p === "ellipsis" ? (
          <span key={`e-${idx}`} className="px-2">…</span>
        ) : (
          createLink(p as number, undefined, p === page)
        )
      )}
      {/* Last page link */}
      {page < totalPages && createLink(totalPages, "Last »")}
    </nav>
  );
}
