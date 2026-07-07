import Link from "next/link";
import React from "react";
import PageWrap from "@components/PageWrap";
import { getPortfolioProfile, getPortfolioSocialLinks, getPortfolioTechStack } from "@lib/content";

export default function AboutMe() {
  const userData = getPortfolioProfile();
  const techStack = getPortfolioTechStack();
  const socialLinks = getPortfolioSocialLinks();
  return (
    <PageWrap title="About Me">
      <About userData={userData} techStack={techStack} socialLinks={socialLinks} />
    </PageWrap>
  );
}

function About({ userData, techStack, socialLinks }: { userData: any; techStack: any[]; socialLinks: any[] }) {
  return (
    <>
      <div className="-mt-14">
        <div className="text-container max-w-6xl mx-auto">
          <p
            className="leading-loose text-2xl md:text-4xl font-semibold mx-4"
            style={{ lineHeight: "3rem" }}
          >
            {userData.about.title}. Currently working {" "}
            <Link target="_blank"
            // rel="noopener noreferrer"
              className="bg-red-500 rounded-md px-2 py-1 text-white"
              href={userData.about.currentProjectUrl}
            >
              {userData.about.currentProject} ✈️
            </Link>
          </p>
        </div>
      </div>
      <div className=" px-4">
        <div className="pt-20 grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto gap-y-20 gap-x-20">
          <ContactInfo userData={userData} socialLinks={socialLinks} />
          <div className="col-span-1 md:col-span-2">
            {userData.about.description?.map((desc: string, idx: number) => (
              <p
                key={idx}
                className="text-xl text-gray-700 mb-4 dark:text-gray-300"
              >
                {desc}
              </p>
            ))}
            <h1 className="bg-red-500 text-3xl rounded-md px-2 py-1 inline-block font-bold text-white">
              Tech Stack
            </h1>
            <div className="flex flex-row flex-wrap mt-8">
              {techStack.map((item) => (
                <img
                  key={item.name}
                  src={item.iconUrl}
                  className="h-20 w-20 mx-4 my-4"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ContactInfo({ userData, socialLinks }: { userData: any; socialLinks: any[] }) {
  return (
    <div className="inline-flex flex-col">
      <div>
        <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          Contact
        </h1>
        <p className="text-lg text-gray-500 mt-4 dark:text-gray-300">
          For any sort help / enquiry, shoot a{" "}
          <a
            href={`mailto:${userData.email}`}
            className="text-gray-800 border-b-2 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300"
          >
            mail
          </a>{" "}
          and I'll get back. I swear.
        </p>
      </div>
      <div className="mt-8">
        <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          Job Opportunities
        </h1>
        <p className="text-lg text-gray-500 mt-4 dark:text-gray-300">
          I'm looking for a job currently, If you see me as a good fit, check my{" "}
          <a
            href={userData.resumeUrl}
            target="__blank"
            className="text-gray-800 border-b-2 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300"
          >
            resume
          </a>{" "}
          and I'd love to work for you.
        </p>
      </div>
      {/* Social Links */}
      <h1 className="text-xl font-semibold text-gray-700 mt-8 dark:text-gray-200">
        Social Links
      </h1>
      <div className="mt-4 ml-4">
        {socialLinks.map((item) => (
          <Link target="__blank" key={item.name} href={item.href}>
            <div className="flex flex-row justify-start items-center">
              <div className="flex flex-row items-center space-x-4 group">
                <div className="my-4 dark:text-gray-300">&rarr;</div>
                <img className="h-8 w-8" aria-hidden="true" src={item.link} />
                <p className="text-lg text-gray-500 font-mono relative overflow-hidden dark:text-gray-300">
                  <span className="absolute h-0.5 w-full bg-gray-400 bottom-0 transform -translate-x-24 group-hover:translate-x-0 transition duration-300"></span>
                  {item.name}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
