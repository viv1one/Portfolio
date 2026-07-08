"use client";
import type { Metadata } from "next";
import PageWrap from "@components/PageWrap";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// export const metadata: Metadata = {
//   title: "Blog",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Define a pattern to match paths that should skip the layout.
  // `usePathname` can return `null` during server rendering, so we guard
  // against that possibility using optional chaining.
  // Skip the default layout only for individual blog post pages (e.g., /blogs/my-post)
  // but keep it for category listings and other blog routes.
  // The regex matches paths that start with /blogs/ followed by a slug that does not contain a slash.
  // It explicitly excludes paths that contain '/category/' to avoid skipping layout for category pages.
  const shouldSkipLayout = pathname?.match(/^\/blogs\/(?!category\/)[^\/]+$/);

  if (shouldSkipLayout) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
          {/* Back navigation */}
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Blogs
          </Link>

          {/* Blog post content */}
          <article className="max-w-none">
            {children}
          </article>
        </div>
      </div>
    );
  }

  // For all other blog routes, wrap content with the standard PageWrap component.
  return <PageWrap title={"Blogs"}>{children}</PageWrap>;
}
