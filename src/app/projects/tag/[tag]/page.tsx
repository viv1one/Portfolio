import React from "react";
import PageWrap from "@components/PageWrap";
import Link from "next/link";
import { getPortfolioProjects } from "@lib/content";
import Image from "next/image";
import { kebabCase } from "@lib/utils";

interface ProjectProps {
  project: {
    imgUrl: string;
    title: string;
    desc: string;
    link: string;
    tags: string[];
  };
}

function getProjectTags(project: { title: string; desc: string }) {
  const tags: string[] = [];
  const combined = (project.title + " " + project.desc).toLowerCase();
  
  if (combined.includes("certif") || combined.includes("learn") || combined.includes("open")) {
    tags.push("EdTech", "Education");
  }
  if (combined.includes("blockchain") || combined.includes("web3")) {
    tags.push("Web3", "Blockchain");
  }
  if (combined.includes("javascript") || combined.includes("node")) {
    tags.push("JavaScript", "Node.js");
  }
  if (combined.includes("portfolio") || combined.includes("me")) {
    tags.push("Next.js", "React", "Portfolio");
  }
  
  if (tags.length === 0) {
    tags.push("Web Development", "React");
  }
  
  return tags;
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const resolvedParams = await params;
  const tagQuery = decodeURIComponent(resolvedParams.tag).toLowerCase();
  const allProjects = getPortfolioProjects();

  const filteredProjects = allProjects
    .map((proj) => ({
      ...proj,
      tags: getProjectTags(proj),
    }))
    .filter((proj) =>
      proj.tags.some((t) => kebabCase(t) === tagQuery || t.toLowerCase() === tagQuery)
    );

  return (
    <PageWrap title={`Projects tagged "${resolvedParams.tag}"`}>
      <div className="space-y-8 px-4 md:px-0">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">
            Showing {filteredProjects.length} projects matching this tag.
          </p>
          <Link href="/projects" className="text-sm font-medium text-orange-500 hover:underline">
            &larr; Back to all projects
          </Link>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border rounded-xl">
            <p className="text-muted-foreground">No projects found with tag "{resolvedParams.tag}".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-start">
            {filteredProjects.map((item, index) => (
              <Project key={index} project={item} />
            ))}
          </div>
        )}
      </div>
    </PageWrap>
  );
}

function Project({ project }: ProjectProps) {
  return (
    <div className="project-card flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-4 shadow-xs hover:shadow-md transition-all duration-300">
      <Link href={project.link} target="_blank" className="project-image-wrapper w-full relative rounded-lg overflow-hidden block transition duration-500 hover:scale-[1.01]">
        <Image
          className="w-full h-48 object-cover rounded-md"
          src={project.imgUrl}
          alt={project.title}
          width={300}
          height={300}
        />
      </Link>
      <div className="project-info w-full mt-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Link href={project.link} target="_blank">
              <h3 className="text-lg font-bold hover:text-orange-500 transition-colors">{project.title}</h3>
            </Link>
            <div className="project-links flex gap-2">
              {project.link && (
                <Link href={project.link} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
                  <Image
                    src="https://img.icons8.com/glyph-neue/64/000000/link.png"
                    width={20}
                    height={20}
                    alt="Visit Project"
                    className="dark:invert"
                  />
                </Link>
              )}
              {project.link && (
                <Link href={project.link} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
                  <Image
                    src="https://img.icons8.com/glyph-neue/64/000000/github.png"
                    width={20}
                    height={20}
                    alt="View on Github"
                    className="dark:invert"
                  />
                </Link>
              )}
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">{project.desc}</p>
        </div>
        <ul className="tags-list flex flex-wrap gap-1.5 mt-4 list-none pl-0">
          {project.tags?.map((tag, index) => (
            <li key={index}>
              <Link href={`/projects/tag/${kebabCase(tag)}`}>
                <div className="tag rounded-full text-xs bg-muted text-muted-foreground py-1 px-3 border border-border hover:bg-orange-500/10 hover:text-orange-500 transition-colors cursor-pointer">
                  {tag}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
