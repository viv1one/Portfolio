"use client";

import React, { useState } from "react";
import { Button } from "@components/ui/button";

interface ProfileData {
  firstName: string;
  name: string;
  avatar: string;
  githubUsername: string;
  linkedInUrl: string;
  designation: string;
  email: string;
  phone: string;
  address: string;
  about: {
    title: string;
    description: string[];
    currentProject: string;
    currentProjectUrl: string;
  };
  resumeUrl: string;
}

interface UpdateFormProps {
  profile: ProfileData;
  experiences: any[];
  projects: any[];
  socialLinks: any[];
  techStack: any[];
  handleSubmit: (formData: FormData) => Promise<void>;
  status?: string;
  error?: string;
}

function SectionHeader({ title, description, emoji }: { title: string; description: string; emoji: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2">
        <span className="text-xl">{emoji}</span>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  );
}

function InputField({ name, label, defaultValue, placeholder, type = "text" }: { name: string; label: string; defaultValue?: string; placeholder: string; type?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
        placeholder={placeholder}
      />
    </div>
  );
}

function TextAreaField({ name, label, defaultValue, placeholder, rows = 4 }: { name: string; label: string; defaultValue?: string; placeholder: string; rows?: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  );
}

export default function UpdateForm({
  profile,
  experiences: initialExperiences,
  projects: initialProjects,
  socialLinks: initialSocialLinks,
  techStack: initialTechStack,
  handleSubmit,
  status,
  error,
}: UpdateFormProps) {
  // Add React state arrays with unique client-side IDs
  const [experiences, setExperiences] = useState(
    initialExperiences.length > 0
      ? initialExperiences.map((exp, idx) => ({
          ...exp,
          clientId: `exp-${idx}-${Date.now()}`,
        }))
      : [
          {
            clientId: `exp-${Date.now()}`,
            title: '',
            company: '',
            year: '',
            companyLink: '',
            description: [],
          },
        ]
  );
  const [projects, setProjects] = useState(
    initialProjects.length > 0
      ? initialProjects.map((proj, idx) => ({
          ...proj,
          clientId: `proj-${idx}-${Date.now()}`,
        }))
      : [
          {
            clientId: `proj-${Date.now()}`,
            title: '',
            link: '',
            desc: '',
            imgUrl: '',
          },
        ]
  );
  const [socialLinks, setSocialLinks] = useState(
    initialSocialLinks.length > 0
      ? initialSocialLinks.map((link, idx) => ({
          ...link,
          clientId: `link-${idx}-${Date.now()}`,
        }))
      : [
          {
            clientId: `link-${Date.now()}`,
            name: '',
            href: '',
            link: '',
          },
        ]
  );
  const [techStack, setTechStack] = useState(
    initialTechStack.length > 0
      ? initialTechStack.map((tech, idx) => ({
          ...tech,
          clientId: `tech-${idx}-${Date.now()}`,
        }))
      : [
          {
            clientId: `tech-${Date.now()}`,
            name: '',
            iconUrl: '',
          },
        ]
  );

  // Add handlers
  const addExperience = () => {
    setExperiences([
      ...experiences,
      { clientId: `exp-${Date.now()}`, title: "", company: "", year: "", companyLink: "", description: [] },
    ]);
  };

  const removeExperience = (clientId: string) => {
    setExperiences(experiences.filter((exp) => exp.clientId !== clientId));
  };

  const addProject = () => {
    setProjects([
      ...projects,
      { clientId: `proj-${Date.now()}`, title: "", link: "", desc: "", imgUrl: "" },
    ]);
  };

  const removeProject = (clientId: string) => {
    setProjects(projects.filter((proj) => proj.clientId !== clientId));
  };

  const addSocial = () => {
    setSocialLinks([
      ...socialLinks,
      { clientId: `link-${Date.now()}`, name: "", href: "", link: "" },
    ]);
  };

  const removeSocial = (clientId: string) => {
    setSocialLinks(socialLinks.filter((link) => link.clientId !== clientId));
  };

  const addTech = () => {
    setTechStack([
      ...techStack,
      { clientId: `tech-${Date.now()}`, name: "", iconUrl: "" },
    ]);
  };

  const removeTech = (clientId: string) => {
    setTechStack(techStack.filter((tech) => tech.clientId !== clientId));
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 rounded-xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-6 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Manage your portfolio</h1>
            <p className="mt-1 text-sm text-slate-500">Update your profile, experience, projects, and more dynamically.</p>
          </div>
          <div className="mt-3 flex items-center gap-2 sm:mt-0">
            {status === "saved" && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Saved
              </span>
            )}
            {error === "unauthorized" && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-sm font-medium text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                Session expired
              </span>
            )}
          </div>
        </div>
      </div>

      <form action={handleSubmit} className="space-y-6">
        
        {/* Profile Section */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-700 dark:bg-slate-800">
          <SectionHeader title="Profile" description="Tell visitors who you are and how to reach you." emoji="👤" />
          <div className="grid gap-4 md:grid-cols-2">
            <InputField name="firstName" label="First name" defaultValue={profile.firstName} placeholder="John" />
            <InputField name="name" label="Full name" defaultValue={profile.name} placeholder="John Doe" />
            <InputField name="avatar" label="Avatar URL" defaultValue={profile.avatar} placeholder="https://..." />
            <InputField name="githubUsername" label="GitHub username" defaultValue={profile.githubUsername} placeholder="johndoe" />
            <InputField name="linkedInUrl" label="LinkedIn URL" defaultValue={profile.linkedInUrl} placeholder="https://linkedin.com/in/..." />
            <InputField name="designation" label="Designation" defaultValue={profile.designation} placeholder="Full Stack Developer" />
            <InputField name="email" label="Email" defaultValue={profile.email} placeholder="john@example.com" type="email" />
            <InputField name="phone" label="Phone" defaultValue={profile.phone} placeholder="+1 234 567 890" />
            <InputField name="address" label="Address" defaultValue={profile.address} placeholder="San Francisco, CA" />
            <InputField name="aboutTitle" label="About title" defaultValue={profile.about?.title} placeholder="A short tagline" />
            <InputField name="aboutCurrentProject" label="Current project" defaultValue={profile.about?.currentProject} placeholder="Building something cool" />
            <InputField name="aboutCurrentProjectUrl" label="Current project URL" defaultValue={profile.about?.currentProjectUrl} placeholder="https://..." />
            <InputField name="resumeUrl" label="Resume URL" defaultValue={profile.resumeUrl} placeholder="https://..." />
          </div>
          <div className="mt-4">
            <TextAreaField
              name="descriptions"
              label="About description"
              defaultValue={profile.about?.description?.join("\n")}
              placeholder="Add one paragraph per line"
              rows={6}
            />
          </div>
        </section>

        {/* Experience Section */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center justify-between mb-6">
            <SectionHeader title="Experience" description="Add your work history and keep the story current." emoji="💼" />
            <Button type="button" onClick={addExperience} variant="outline" size="sm">
              + Add Experience
            </Button>
          </div>
          <div className="space-y-6">
            {experiences.map((item, index) => (
              <div key={item.clientId} className="rounded-lg border border-slate-200 bg-slate-50/50 p-5 dark:border-slate-600 dark:bg-slate-900/50 relative">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Entry {index + 1}</span>
                  <Button
                    type="button"
                    onClick={() => removeExperience(item.clientId)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    ✕ Remove
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <InputField name={`experiences[${index}][title]`} label="Role or title" defaultValue={item.title} placeholder="Senior Developer" />
                  <InputField name={`experiences[${index}][company]`} label="Company" defaultValue={item.company} placeholder="Acme Inc." />
                  <InputField name={`experiences[${index}][year]`} label="Year" defaultValue={item.year} placeholder="2020 - Present" />
                  <InputField name={`experiences[${index}][companyLink]`} label="Company link" defaultValue={item.companyLink} placeholder="https://..." />
                </div>
                <div className="mt-4">
                  <TextAreaField
                    name={`experiences[${index}][description]`}
                    label="Description"
                    defaultValue={item.description?.join("\n") ?? ""}
                    placeholder="Add one bullet per line"
                    rows={4}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center justify-between mb-6">
            <SectionHeader title="Projects" description="Highlight the work you want visitors to notice." emoji="🚀" />
            <Button type="button" onClick={addProject} variant="outline" size="sm">
              + Add Project
            </Button>
          </div>
          <div className="space-y-6">
            {projects.map((item, index) => (
              <div key={item.clientId} className="rounded-lg border border-slate-200 bg-slate-50/50 p-5 dark:border-slate-600 dark:bg-slate-900/50 relative">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Project {index + 1}</span>
                  <Button
                    type="button"
                    onClick={() => removeProject(item.clientId)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    ✕ Remove
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <InputField name={`projects[${index}][title]`} label="Project title" defaultValue={item.title} placeholder="My Project" />
                  <InputField name={`projects[${index}][link]`} label="Project link" defaultValue={item.link} placeholder="https://..." />
                  <InputField name={`projects[${index}][imgUrl]`} label="Image URL" defaultValue={item.imgUrl} placeholder="https://..." />
                </div>
                <div className="mt-4">
                  <TextAreaField
                    name={`projects[${index}][desc]`}
                    label="Description"
                    defaultValue={item.desc}
                    placeholder="Short project description"
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Social Links Section */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center justify-between mb-6">
            <SectionHeader title="Social Links" description="Make it easier for people to connect with you." emoji="🔗" />
            <Button type="button" onClick={addSocial} variant="outline" size="sm">
              + Add Link
            </Button>
          </div>
          <div className="space-y-6">
            {socialLinks.map((item, index) => (
              <div key={item.clientId} className="rounded-lg border border-slate-200 bg-slate-50/50 p-5 dark:border-slate-600 dark:bg-slate-900/50 relative">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Link {index + 1}</span>
                  <Button
                    type="button"
                    onClick={() => removeSocial(item.clientId)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    ✕ Remove
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <InputField name={`socialLinks[${index}][name]`} label="Label" defaultValue={item.name} placeholder="GitHub" />
                  <InputField name={`socialLinks[${index}][href]`} label="URL" defaultValue={item.href} placeholder="https://github.com/..." />
                  <InputField name={`socialLinks[${index}][link]`} label="Icon URL" defaultValue={item.link} placeholder="https://..." />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center justify-between mb-6">
            <SectionHeader title="Tech Stack" description="Show the tools and technologies you work with." emoji="⚡" />
            <Button type="button" onClick={addTech} variant="outline" size="sm">
              + Add Skill
            </Button>
          </div>
          <div className="space-y-6">
            {techStack.map((item, index) => (
              <div key={item.clientId} className="rounded-lg border border-slate-200 bg-slate-50/50 p-5 dark:border-slate-600 dark:bg-slate-900/50 relative">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Skill {index + 1}</span>
                  <Button
                    type="button"
                    onClick={() => removeTech(item.clientId)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    ✕ Remove
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <InputField name={`techStack[${index}][name]`} label="Tech name" defaultValue={item.name} placeholder="React" />
                  <InputField name={`techStack[${index}][iconUrl]`} label="Icon URL" defaultValue={item.iconUrl} placeholder="https://..." />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sticky Submit Footer */}
        <div className="sticky bottom-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-lg flex items-center justify-between">
          <p className="text-sm text-slate-500">All changes will be published immediately.</p>
          <Button type="submit" size="lg" className="min-w-[150px]">
            Save Changes
          </Button>
        </div>

      </form>
    </div>
  );
}
