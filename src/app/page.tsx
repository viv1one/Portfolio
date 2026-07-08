import { getPortfolioProfile, getPortfolioProjects, getPortfolioTechStack } from "@lib/content";
import { getPosts, type Post } from "../blogs";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const userData = getPortfolioProfile();
  const projects = getPortfolioProjects().slice(0, 3);
  const techStack = getPortfolioTechStack().slice(0, 8);
  
  let recentPosts: Post[] = [];
  try {
    recentPosts = (await getPosts()).slice(0, 2);
  } catch (e) {
    console.error("Error fetching posts:", e);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90 text-foreground pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-600 dark:text-orange-400">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              Available for new projects
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-orange-600 via-blue-500 to-green-500 bg-clip-text text-transparent animate-gradient">
                {userData.firstName}
              </span>{" "}
              🤘
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {userData.about?.title || "Building digital products, brands, and experiences."} Currently building value at{" "}
              <a
                href={userData.about?.currentProjectUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-foreground underline decoration-orange-500 hover:text-orange-500 transition-colors"
              >
                {userData.about?.currentProject || "@Google"}
              </a>.
            </p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <a
                href={`mailto:${userData.email}`}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:scale-[1.02]"
              >
                Connect With Me
              </a>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-all hover:bg-accent hover:text-accent-foreground"
              >
                About Me
              </Link>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-orange-500 to-blue-500 opacity-30 blur-lg transition duration-1000 group-hover:opacity-50" />
            <img
              src={userData.avatar}
              alt={userData.name}
              className="relative w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-background object-cover shadow-2xl transition duration-500 group-hover:scale-105"
            />
          </div>
        </section>

        {/* Tech Stack Bar */}
        <section className="space-y-6">
          <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase text-center md:text-left">
            Tech Stack & Tools
          </h3>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2 rounded-xl border border-border bg-card/50 backdrop-blur-xs px-4 py-2 hover:border-orange-500/50 hover:bg-card transition-all duration-300"
              >
                <img src={tech.iconUrl} alt={tech.name} className="w-6 h-6 object-contain" />
                <span className="text-sm font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Projects Grid */}
        <section className="space-y-8">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
              <p className="text-muted-foreground">Some of my recent developments and open source contributions.</p>
            </div>
            <Link href="/projects" className="text-sm font-medium text-orange-500 hover:underline">
              View all projects &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="p-4 space-y-4">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <img
                      src={project.imgUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold group-hover:text-orange-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {project.desc}
                    </p>
                  </div>
                </div>
                <div className="border-t border-border p-4 bg-muted/20">
                  <Link
                    href={project.link}
                    target="_blank"
                    className="text-xs font-semibold text-primary inline-flex items-center gap-1 hover:underline"
                  >
                    Explore live site
                    <span className="text-lg leading-none transition-transform group-hover:translate-x-1">&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Articles */}
        {recentPosts.length > 0 && (
          <section className="space-y-8">
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold tracking-tight">Latest Writings</h2>
                <p className="text-muted-foreground">Thoughts and ideas about technology and software development.</p>
              </div>
              <Link href="/blogs" className="text-sm font-medium text-orange-500 hover:underline">
                Read all articles &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="group block rounded-xl border border-border bg-card p-6 shadow-xs hover:border-orange-500/50 transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <time>{new Date(post.publishDate).toLocaleDateString()}</time>
                      <div className="flex gap-1.5">
                        {post.categories.map((cat) => (
                          <span key={cat} className="bg-muted px-2 py-0.5 rounded-full font-medium text-[10px]">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-orange-500 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Click to read this article, learn key concepts and discover tips for implementation.
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
