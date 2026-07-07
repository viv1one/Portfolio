import { Pagination } from "@components/pagination";
import { Posts } from "@components/posts";
import { getPaginatedPostsByCategory, postsPerPage } from "../../../../../../blogs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const generateMetadata = async ({ params }: { params: { category: string; page: string } }): Promise<Metadata> => {
  const pageNum = Number(params.page);
  return {
    title: `Blog – ${params.category} – Page ${pageNum}`,
    description: `Page ${pageNum} of posts in the ${params.category} category.`,
  };
};

export default async function CategoryPage({
  params,
}: {
  params: { category: string; page: string };
}) {
  const page = Number(params.page);
  if (Number.isNaN(page) || page < 1) notFound();

  const { posts, total } = await getPaginatedPostsByCategory({
    category: params.category,
    page,
    limit: postsPerPage,
  });

  if (posts.length === 0) notFound();

  return (
    <main>
      <h1>Category: {params.category} – Page {page}</h1>
      <Posts posts={posts} />
      <Pagination
        baseUrl={`/blogs/category/${params.category}/page`}
        page={page}
        perPage={postsPerPage}
        total={total}
      />
    </main>
  );
}
import { Category, categories } from "@lib/categories";
import { Pagination } from "@components/pagination";
import { Posts } from "@components/posts";
import {
  getPaginatedPostsByCategory,
  getPostsByCategory,
  postsPerPage,
} from "../../../../../../blogs";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { category: Category; page: number };
}) {
  let { category, page } = params;
  page = Number(page);

  if (page < 1) notFound();

  if (page == 1) redirect(`/category/${category}`);

  const { posts, total } = await getPaginatedPostsByCategory({
    category,
    page,
    limit: postsPerPage,
  });

  if (!posts.length) notFound();

  return (
    <main>
      <h1>
        Category: {category} (Page: {page})
      </h1>
      <Posts posts={posts} />

      <Pagination
        baseUrl={`/blogs/category/${category}/page`}
        page={page}
        perPage={postsPerPage}
        total={total}
      />
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
