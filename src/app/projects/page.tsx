import React from "react";
import PageWrap from "@components/PageWrap";
import Link from "next/link";
import { getPortfolioProjects } from "@lib/content";
import Image from "next/image";
import { kebabCase } from "@lib/utils";

interface ProjectProps {
  project: {
    // Make idx optional
    imgUrl: string;
    title: string;
    desc: string;
    link: string;
    tags?: string[];
    // Add more properties if necessary
  };
}

export default function Projects() {
  const projects = getPortfolioProjects();

  return (
    <PageWrap title="Projects">
      <div className="grid grid-cols-1 gap-12 md:gap-5 md:grid-cols-3 items-start">
        {projects.map((item, index) => (
          <Project key={index} project={item} />
        ))}
      </div>
    </PageWrap>
  );
}

function Project({ project }: ProjectProps) {
  return (
    <div className="project-card max-w-sm mx-auto flex flex-col items-center md:items-start md:justify-center border shadow-sm rounded-xl  p-3">
      <Link href={project.link} target="_blank" className="project-image-wrapper w-full relative rounded-xl border-fun-gray border p-2 transition hover:-translate-y-2 hover:opacity-75 hover:border-fun-pink will-change-projectCard">
        <Image
          className="w-full h-48 rounded-md object-cover" // Added object-cover for better image display
          src={project.imgUrl}
          alt={project.title} // Use project title for alt text
          width={300}
          height={300}
        />
      </Link>
      <div className="project-info w-full mt-5">
        <div className="flex items-center justify-between">
          <a href={project.link} target="_blank">
            <h3 className="text-lg font-bold">{project.title}</h3>
          </a>
          <div className="project-links space-x-2">
            {project.link && (
              <Link href={project.link} target="_blank" rel="noreferrer">
                <Image
                  src="https://img.icons8.com/glyph-neue/64/000000/link.png"
                  width={20}
                  height={20}
                  alt="Visit Project" // More descriptive alt text
                />
              </Link>
            )}
            {project.link && ( // Assuming a github link property
              <Link href={project.link} target="_blank" rel="noreferrer">
                <Image
                  src="https://img.icons8.com/glyph-neue/64/000000/github.png"
                  width={20}
                  height={20}
                  alt="View on Github" // More descriptive alt text
                />
              </Link>
            )}
          </div>
        </div>
        <p className="text-fun-gray text-left text-sm">{project.desc}</p>
        <ul className="tags-list flex flex-wrap items-center mt-2 -ml-2 list-none">
          {project.tags?.map((tag, index) => (
            <li key={index}>
              <Link href={`/projects/tag/${kebabCase(tag)}`}>
                <div className="tag m-1 rounded-lg text-sm bg-fun-pink-dark py-1 px-2 cursor-pointer hover:opacity-75">
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