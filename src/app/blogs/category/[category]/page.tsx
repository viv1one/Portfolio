import { categories, type Category } from "@lib/categories";
import { Pagination } from "@components/pagination";
import { Posts } from "@components/posts";
import {
  getPaginatedPostsByCategory,
  postsPerPage,
} from "../../../../blogs";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

export default async function Category({
  params,
}: {
  // Accept any string from the URL; we validate against the known categories manually.
  params: { category: string };
}) {
  const { category } = params;

  // Handle case‑insensitive category URLs.
  const matchedCategory = categories.find(
    (c) => c.toLowerCase() === (category as string).toLowerCase()
  );
  if (!matchedCategory) {
    // No matching category – show 404.
    notFound();
  } else if (matchedCategory !== category) {
    // Redirect to the canonical case‑sensitive URL.
    redirect(`/blogs/category/${matchedCategory}`);
  }

  const { posts, total } = await getPaginatedPostsByCategory({
    category,
    page: 1,
    limit: postsPerPage,
  });
  // Render fallback UI when no posts are available for the selected category.
  const hasPosts = posts && posts.length > 0;

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Category: {category}</h1>
      {hasPosts ? (
        <>
          <Posts posts={posts} />
          <div className="mt-8">
            <Pagination
              baseUrl={`/blogs/category/${category}/page`}
              page={1}
              perPage={postsPerPage}
              total={total}
            />
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
          No posts found in this category.
        </p>
      )}
    </main>
  );
}

// SEO metadata for category pages
export const generateMetadata = async ({ params }: { params: { category: string } }): Promise<Metadata> => {
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
