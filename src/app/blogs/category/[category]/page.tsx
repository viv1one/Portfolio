import { categories, type Category } from "@lib/categories";
import { Pagination } from "@components/pagination";
import { Posts } from "@components/posts";
import {
  getPaginatedPostsByCategory,
  postsPerPage,
} from "../../../../blogs";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export default async function Category({
  params,
}: {
  params: { category: Category };
}) {
  const { category } = params;

  // 404 if the category does not exist
  if (categories.indexOf(category) == -1) notFound();

  const { posts, total } = await getPaginatedPostsByCategory({
    category,
    page: 1,
    limit: postsPerPage,
  });

  return (
    <main>
      <h1>Category: {category}</h1>
      <Posts posts={posts} />

      <Pagination
        baseUrl={`/blogs/category/${category}/page`}
        page={1}
        perPage={postsPerPage}
        total={total}
      />
    </main>
  );
}

// SEO metadata for category pages
export const generateMetadata = async ({ params }: { params: { category: Category } }): Promise<Metadata> => {
  const { category } = params;
  return {
    title: `Blog – ${category}`,
    description: `Posts in the ${category} category.`,
    openGraph: {
      title: `Blog – ${category}`,
      description: `Posts in the ${category} category.`,
      url: `https://viv1.vercel.app/blogs/category/${category}`,
      siteName: "Vivek Kumar",
      images: [],
      locale: "en_US",
      type: "website",
    },
  };
};

export function generateStaticParams() {
  return categories.map((category) => ({
    category,
  }));
}
