"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Simple client‑side search bar that queries the `/api/posts` endpoint.
 * It debounces input and navigates to the blogs page with a `q` query param.
 */
export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Debounce to avoid excessive requests
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim().length > 0) {
        router.push(`/blogs?q=${encodeURIComponent(query.trim())}`);
      } else {
        router.push(`/blogs`);
      }
    }, 400);
    return () => clearTimeout(handler);
  }, [query, router]);

  return (
    <div className="flex items-center gap-2 mb-4">
      <input
        type="search"
        placeholder="Search posts…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Search blog posts"
      />
    </div>
  );
}
