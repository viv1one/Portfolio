import { type Post } from "../../blogs";
import Link from "next/link";
import Image from "next/image";

export function Posts({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-6">
      {posts.map(({ slug, title, image, publishDate, categories, excerpt }) => (
        <article key={slug} className="group relative flex flex-col md:flex-row gap-6 md:gap-8 rounded-2xl border border-border bg-card p-4 md:p-6 shadow-xs hover:border-orange-500/40 hover:shadow-md transition-all duration-300">
          <Link href={`/blogs/${slug}`} className="absolute inset-0 z-10" aria-label={title}>
            <span aria-hidden="true" />
          </Link>
          
          {/* Post Image wrapper */}
          <div className="w-full md:w-80 shrink-0 aspect-video md:aspect-auto md:h-44 overflow-hidden rounded-xl bg-muted">
            <Image
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              src={image}
              alt={title}
              width={400}
              height={225}
              priority={false}
            />
          </div>

          {/* Post info content */}
          <div className="flex-1 flex flex-col justify-between py-1 space-y-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <time>{new Date(publishDate).toLocaleDateString()}</time>
                <span className="text-border">•</span>
                <div className="flex flex-wrap gap-1">
                  {categories.map((cat) => (
                    <span key={cat} className="bg-muted px-2 py-0.5 rounded-full font-medium text-[10px] text-muted-foreground">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-orange-500 transition-colors">
                  {title}
              </h2>
              {/* Optional excerpt from post metadata */}
              {excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {excerpt}
                </p>
              )}
            </div>

            <div className="text-xs font-semibold text-orange-500 group-hover:underline inline-flex items-center gap-1">
              Read article
              <span>&rarr;</span>
            </div>
          </div>

        </article>
      ))}
    </div>
  );
}

