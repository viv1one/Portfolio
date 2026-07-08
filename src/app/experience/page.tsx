import PageWrap from "@components/PageWrap";
import Link from "next/link";
import React from "react";
import { getPortfolioExperiences } from "@lib/content";

interface ExperienceItem {
  title: string;
  company: string;
  companyLink?: string;
  year: string;
  description: string[];
}

export default function Experiences() {
  const experience = getPortfolioExperiences() as ExperienceItem[];
  return (
    <PageWrap title="Experiences">
      <Experience experience={experience} />
    </PageWrap>
  );
}

function Experience({ experience }: { experience: ExperienceItem[] }) {
  return (
    <div className="max-w-3xl mx-auto relative border-l border-border pl-6 sm:pl-8 space-y-12">
      {experience.map((exp, idx) => (
        <div key={idx} className="relative group">
          
          {/* Glowing timeline dot */}
                <div className="absolute -left-7.75 sm:-left-9.75 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-background border-2 border-indigo-500 shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-ping group-hover:scale-125 transition-transform" />
          </div>

          <div className="space-y-4">
            
            {/* Header section: Title, Year, Company */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-foreground group-hover:text-indigo-500 transition-colors">
                  {exp.title}
                </h2>
                
                <Link
                  className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  href={exp.companyLink || "#"}
                >
                  {exp.company}
                  {exp.companyLink && <span className="ml-1 text-[10px]">↗</span>}
                </Link>
              </div>

              <time className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 px-3 py-1.5 rounded-full w-fit self-start sm:self-center">
                {exp.year}
              </time>
            </div>

            {/* Description bullet list */}
            <div className="rounded-xl border border-border bg-card/45 backdrop-blur-xs p-5 shadow-xs">
              <ul className="list-disc list-inside space-y-2.5 pl-0 m-0">
                {exp.description.map((desc: string, index: number) => (
                  <li key={index} className="text-sm text-muted-foreground leading-relaxed list-none relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-indigo-500/60">
                    {desc}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}
