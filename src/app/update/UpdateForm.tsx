"use client";
// Fixed UpdateFormProps interface and removed stray JSX (build error resolved)

import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@components/ui/button";
import type { Experience, Project, SocialLink, TechStackItem } from "@lib/content-types";

const generateId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

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
  experiences: Experience[];
  projects: Project[];
  socialLinks: SocialLink[];
  techStack: TechStackItem[];
  handleSubmit: (formData: FormData) => Promise<void>;
  // Optional UI feedback props
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

function InputField({ name, label, defaultValue, value, onChange, placeholder, type = "text" }: { name: string; label: string; defaultValue?: string; value?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string; type?: string }) {
  const inputProps = value !== undefined ? { value, onChange } : { defaultValue };
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <input id={name} name={name} type={type} {...inputProps} className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" placeholder={placeholder} />
    </div>
  );
}

function TextAreaField({ name, label, defaultValue, value, onChange, placeholder, rows = 4 }: { name: string; label: string; defaultValue?: string; value?: string; onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; placeholder: string; rows?: number }) {
  const textareaProps = value !== undefined ? { value, onChange } : { defaultValue };
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <textarea id={name} name={name} {...textareaProps} className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" placeholder={placeholder} rows={rows} />
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="min-w-[150px]" disabled={pending}>
      {pending ? "Saving..." : "Save Changes"}
    </Button>
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
          clientId: `exp-${idx}-${generateId()}`,
        }))
      : [
          {
            clientId: `exp-${generateId()}`,
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
          clientId: `proj-${idx}-${generateId()}`,
        }))
      : [
          {
            clientId: `proj-${generateId()}`,
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
          clientId: `link-${idx}-${generateId()}`,
        }))
      : [
          {
            clientId: `link-${generateId()}`,
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
          clientId: `tech-${idx}-${generateId()}`,
        }))
      : [
          {
            clientId: `tech-${generateId()}`,
            name: '',
            iconUrl: '',
          },
        ]
  );

  // Add handlers
  const addExperience = () => {
    setExperiences([
      ...experiences,
      { clientId: `exp-${generateId()}`, title: "", company: "", year: "", companyLink: "", description: [] },
    ]);
  };

  const removeExperience = (clientId: string) => {
    setExperiences(experiences.filter((exp) => exp.clientId !== clientId));
  };
  const updateExperience = (index: number, field: string, value: string) => {
    setExperiences(experiences.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp)));
  };

  const addProject = () => {
    setProjects([
      ...projects,
      { clientId: `proj-${generateId()}`, title: "", link: "", desc: "", imgUrl: "" },
    ]);
  };

  const removeProject = (clientId: string) => {
    setProjects(projects.filter((proj) => proj.clientId !== clientId));
  };
  const updateProject = (index: number, field: string, value: string) => {
    setProjects(projects.map((proj, i) => (i === index ? { ...proj, [field]: value } : proj)));
  };

  const addSocial = () => {
    setSocialLinks([
      ...socialLinks,
      { clientId: `link-${generateId()}`, name: "", href: "", link: "" },
    ]);
  };

  const removeSocial = (clientId: string) => {
    setSocialLinks(socialLinks.filter((link) => link.clientId !== clientId));
  };
  const updateSocial = (index: number, field: string, value: string) => {
    setSocialLinks(socialLinks.map((link, i) => (i === index ? { ...link, [field]: value } : link)));
  };

  const addTech = () => {
    setTechStack([
      ...techStack,
      { clientId: `tech-${generateId()}`, name: "", iconUrl: "" },
    ]);
  };

  const removeTech = (clientId: string) => {
    setTechStack(techStack.filter((tech) => tech.clientId !== clientId));
  };
  const updateTech = (index: number, field: string, value: string) => {
    setTechStack(techStack.map((tech, i) => (i === index ? { ...tech, [field]: value } : tech)));
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
                  <InputField name={`experiences[${index}][title]`} label="Role or title" value={item.title} onChange={(e) => updateExperience(index, "title", e.target.value)} placeholder="Senior Developer" />
                  <InputField name={`experiences[${index}][company]`} label="Company" value={item.company} onChange={(e) => updateExperience(index, "company", e.target.value)} placeholder="Acme Inc." />
                  <InputField name={`experiences[${index}][year]`} label="Year" value={item.year} onChange={(e) => updateExperience(index, "year", e.target.value)} placeholder="2020 - Present" />
                  <InputField name={`experiences[${index}][companyLink]`} label="Company link" value={item.companyLink} onChange={(e) => updateExperience(index, "companyLink", e.target.value)} placeholder="https://..." />
                </div>
                <div className="mt-4">
                  <TextAreaField name={`experiences[${index}][description]`} label="Description" value={item.description?.join("\n") ?? ""} onChange={(e) => updateExperience(index, "description", e.target.value)} placeholder="Add one bullet per line" rows={4} />
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
                  <InputField name={`projects[${index}][title]`} label="Project title" value={item.title} onChange={(e) => updateProject(index, "title", e.target.value)} placeholder="My Project" />
                  <InputField name={`projects[${index}][link]`} label="Project link" value={item.link} onChange={(e) => updateProject(index, "link", e.target.value)} placeholder="https://..." />
                  <InputField name={`projects[${index}][imgUrl]`} label="Image URL" value={item.imgUrl} onChange={(e) => updateProject(index, "imgUrl", e.target.value)} placeholder="https://..." />
                </div>
                <div className="mt-4">
                  <TextAreaField
                    name={`projects[${index}][desc]`}
                    label="Description"
                    value={item.desc}
                    onChange={(e) => updateProject(index, "desc", e.target.value)}
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
                  <InputField name={`socialLinks[${index}][name]`} label="Label" value={item.name} onChange={(e) => updateSocial(index, "name", e.target.value)} placeholder="GitHub" />
                  <InputField name={`socialLinks[${index}][href]`} label="URL" value={item.href} onChange={(e) => updateSocial(index, "href", e.target.value)} placeholder="https://github.com/..." />
                  <InputField name={`socialLinks[${index}][link]`} label="Icon URL" value={item.link} onChange={(e) => updateSocial(index, "link", e.target.value)} placeholder="https://..." />
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
                  <InputField name={`techStack[${index}][name]`} label="Tech name" value={item.name} onChange={(e) => updateTech(index, "name", e.target.value)} placeholder="React" />
                  <InputField name={`techStack[${index}][iconUrl]`} label="Icon URL" value={item.iconUrl} onChange={(e) => updateTech(index, "iconUrl", e.target.value)} placeholder="https://..." />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sticky Submit Footer */}
        <div className="sticky bottom-6 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-lg flex items-center justify-between">
          <p className="text-sm text-slate-500">All changes will be published immediately.</p>
          <SubmitButton />
        </div>

      </form>
    </div>
  );
}
