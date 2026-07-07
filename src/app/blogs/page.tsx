import { Categories } from "@components/categories";
import { Pagination } from "@components/pagination";
import { Posts } from "@components/posts";
import { getPaginatedPosts, postsPerPage } from "../../blogs";
import type { Metadata } from "next";
import PageWrap from "@components/PageWrap";
import SearchBar from "@components/search/SearchBar";

export default async function Home() {
  const { posts, total } = await getPaginatedPosts({
    page: 1,
    limit: postsPerPage,
  });

  return (
    <>
      <SearchBar />
      <Categories />
      <Posts posts={posts} />

      <Pagination
        baseUrl="/blogs/page"
        page={1}
        perPage={postsPerPage}
        total={total}
      />
    </>
  );
}

// SEO metadata for the blog home page
export const metadata: Metadata = {
  title: "Blog – Vivek Kumar",
  description: "Latest articles on AI, tech, and more.",
  openGraph: {
    title: "Blog – Vivek Kumar",
    description: "Latest articles on AI, tech, and more.",
    url: "https://viv1.vercel.app/blogs",
    siteName: "Vivek Kumar",
    // Use a static fallback image for Open Graph. Dynamic post data is not
    // available at build time for the metadata export.
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
