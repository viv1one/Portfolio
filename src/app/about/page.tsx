import Link from "next/link";
import Image from "next/image";
import React from "react";
import PageWrap from "@components/PageWrap";
import { getPortfolioProfile, getPortfolioSocialLinks, getPortfolioTechStack } from "@lib/content";

interface Profile {
  firstName: string;
  name: string;
  avatar: string;
  githubUsername: string;
  linkedInUrl: string;
  designation: string;
  email: string;
  phone: string;
  address: string;
  aboutTitle: string;
  aboutCurrentProject: string;
  aboutCurrentProjectUrl: string;
  resumeUrl: string;
}

interface AboutData {
  title: string;
  currentProject: string;
  currentProjectUrl: string;
  description: string[];
}

interface UserData {
  firstName: string;
  name: string;
  avatar: string;
  githubUsername: string;
  linkedInUrl: string;
  designation: string;
  email: string;
  phone: string;
  address: string;
  aboutTitle: string;
  aboutCurrentProject: string;
  aboutCurrentProjectUrl: string;
  resumeUrl: string;
  about: AboutData;
}

interface TechStackItem {
  name: string;
  iconUrl: string;
}

interface SocialLink {
  name: string;
  href: string;
  link: string;
}

export default function AboutMe() {
  const userData = getPortfolioProfile() as UserData;
  const techStack = getPortfolioTechStack() as TechStackItem[];
  const socialLinks = getPortfolioSocialLinks() as SocialLink[];
  return (
    <PageWrap title="About Me">
      <About userData={userData} techStack={techStack} socialLinks={socialLinks} />
    </PageWrap>
  );
}

function About({ userData, techStack, socialLinks }: { userData: UserData; techStack: TechStackItem[]; socialLinks: SocialLink[] }) {
  return (
    <div className="space-y-16 px-4 md:px-0">
      
      {/* Title Intro Block */}
      <div className="max-w-4xl">
        <p
          className="text-2xl md:text-4xl font-semibold text-foreground/90 leading-relaxed md:leading-extra-loose"
          style={{ lineHeight: "3.2rem" }}
        >
          {userData.about.title}. Currently working{" "}
          <Link
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-lg bg-orange-500 px-3 py-1.5 text-base font-bold text-white shadow-xs hover:bg-orange-600 transition-colors"
            href={userData.about.currentProjectUrl}
          >
            {userData.about.currentProject} ✈️
          </Link>
        </p>
      </div>

      {/* Grid Layout splits Contact Block and Text Block */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
        
        {/* Left Column: Info Deck */}
        <div className="space-y-6 lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            <ContactInfo userData={userData} socialLinks={socialLinks} />
          </div>
        </div>

        {/* Right Column: Narrative Biography & Tech Stack */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Biography Content */}
          <div className="space-y-6">
            {userData.about.description?.map((desc: string, idx: number) => (
              <p
                key={idx}
                className="text-lg text-muted-foreground leading-relaxed font-normal"
              >
                {desc}
              </p>
            ))}
          </div>

          {/* Tech Stack Block */}
          <div className="space-y-6 pt-4">
            <div className="inline-flex items-center gap-2 rounded-lg bg-primary/10 border border-primary/20 px-3 py-1 text-sm font-semibold text-primary">
              ⚡ Skill Set
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Technologies I Work With</h2>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {techStack.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col items-center justify-center rounded-xl border border-border bg-card/40 backdrop-blur-xs p-4 hover:border-orange-500/50 hover:bg-card transition-all duration-300"
                >
                  <Image
                    src={item.iconUrl}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain hover:scale-105 transition-transform duration-300"
                  />
                  <span className="mt-2 text-xs font-semibold text-muted-foreground text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

function ContactInfo({ userData, socialLinks }: { userData: ProfileWithAbout; socialLinks: SocialLink[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-md p-6 space-y-8 shadow-xs">
      
      {/* Contact Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-foreground">Get In Touch</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          For help, project inquiries, or simply a quick hello, drop a{" "}
          <a
            href={`mailto:${userData.email}`}
            className="font-bold text-foreground underline decoration-orange-500 hover:text-orange-500 transition-colors"
          >
            mail
          </a>{" "}
          and I will write back.
        </p>
      </div>

      {/* Opportunities Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-foreground">Opportunities</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          If you have a role that matches my skills, you can review my{" "}
          <a
            href={userData.resumeUrl}
            target="_blank"
            className="font-bold text-foreground underline decoration-orange-500 hover:text-orange-500 transition-colors"
          >
            resume
          </a>{" "}
          or forward it along.
        </p>
      </div>

      {/* Social Links Section */}
      <div className="space-y-4 pt-2 border-t border-border">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Social Channels</h3>
        <div className="space-y-2">
          {socialLinks.map((item) => (
            <Link
              target="_blank"
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-lg border border-border bg-card/30 p-2.5 hover:border-orange-500/50 hover:bg-card transition-all duration-300"
            >
              <Image
                src={item.link}
                alt={item.name}
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
