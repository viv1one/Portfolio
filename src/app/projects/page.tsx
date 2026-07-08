import React from "react";
import PageWrap from "@components/PageWrap";
import Link from "next/link";
import { getPortfolioProjects } from "@lib/content";
import Image from "next/image";
import { kebabCase } from "@lib/utils";
import type { Project } from "@lib/content-types";

interface ProjectProps {
  project: Project;
}

// Dynamic helper to infer project tags based on keywords in title or desc
function getProjectTags(project: { title: string; desc: string }): string[] {
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
  
  // Default tags if none matched
  if (tags.length === 0) {
    tags.push("Web Development", "React");
  }
  
  return tags;
}

export default function Projects() {
  const projects = getPortfolioProjects();

  return (
    <PageWrap title="Projects">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-start px-4 md:px-0">
        {projects.map((item, index) => {
          const projectWithTags = {
            ...item,
            tags: getProjectTags(item)
          };
          return <Project key={index} project={projectWithTags} />;
        })}
      </div>
    </PageWrap>
  );
}

function Project({ project }: ProjectProps) {
  return (
    <div className="project-card group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-4 shadow-xs hover:border-orange-500/40 hover:shadow-md transition-all duration-300">
      <Link href={project.link} target="_blank" className="absolute inset-0 z-10" aria-label={project.title}>
        <span aria-hidden="true" />
      </Link>
      <div className="project-image-wrapper w-full relative rounded-lg overflow-hidden">
        <Image
          className="w-full h-48 object-cover rounded-md transition duration-500 group-hover:scale-105"
          src={project.imgUrl}
          alt={project.title}
          width={300}
          height={300}
        />
      </div>
      <div className="project-info w-full mt-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold group-hover:text-orange-500 transition-colors">{project.title}</h3>
            <div className="project-links flex gap-2 relative z-20">
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
              <div className="tag rounded-full text-xs bg-muted text-muted-foreground py-1 px-3 border border-border">
                {tag}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}