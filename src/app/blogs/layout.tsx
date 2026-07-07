"use client";
import type { Metadata } from "next";
import PageWrap from "@components/PageWrap";
import { usePathname } from "next/navigation";

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
  const shouldSkipLayout = pathname?.match(/\/blogs\/\d+|\/blogs\/\w+/);

  if (shouldSkipLayout) {
    return (
      <>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-9xl font-bold mt-12 text-center md:text-left bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient" />
          {children}
        </div>
      </>
    );
  }

  return <PageWrap title={"Blogs"}>{children}</PageWrap>;
}
