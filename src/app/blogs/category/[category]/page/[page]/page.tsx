import { Category, categories } from "@lib/categories";
// Import Pagination component using explicit index file to ensure module resolution
import { Pagination } from "@components/pagination/index";
import { Posts } from "@components/posts";
import {
  getPaginatedPostsByCategory,
  getPostsByCategory,
  postsPerPage,
} from "../../../../../../blogs";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { category: string; page: string };
}): Promise<Metadata> => {
  const pageNum = Number(params.page);
  return {
    title: `Blog – ${params.category} – Page ${pageNum}`,
    description: `Page ${pageNum} of posts in the ${params.category} category.`,
  };
};

export default async function Page({
  params,
}: {
  params: { category: Category; page: number };
}) {
  let { category, page } = params;
  page = Number(page);

  if (page < 1) notFound();

  // Redirect first page to the base category route for SEO consistency
  if (page === 1) redirect(`/blogs/category/${category}`);

  const { posts, total } = await getPaginatedPostsByCategory({
    category,
    page,
    limit: postsPerPage,
  });

  if (!posts.length) notFound();

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Category: {category} (Page: {page})
      </h1>
      <Posts posts={posts} />
      <div className="mt-8">
        <Pagination
          baseUrl={`/blogs/category/${category}/page`}
          page={page}
          perPage={postsPerPage}
          total={total}
        />
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const paths = await Promise.all(
    categories.map(async (category) => {
      const posts = await getPostsByCategory({ category });
      const pages = Math.ceil(posts.length / postsPerPage);
      return [...Array(pages)].map((_, i) => ({
        category,
        page: `${i + 1}`,
      }));
    })
  );
  return paths.flat();
}
