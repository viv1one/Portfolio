"use client";

import { useState, useEffect } from "react";
import { Button } from "@components/ui/button";

interface ProfileData {
  name: string;
  role: string;
  bio: string;
  email: string;
  location: string;
  avatar: string;
  resume: string;
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
  descriptions: string;
}

interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
}

interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  tech: string;
  link: string;
}

interface SocialLinkEntry {
  id: string;
  platform: string;
  url: string;
}

interface TechStackEntry {
  id: string;
  category: string;
  items: string;
}

interface FormData {
  profile: ProfileData;
  experiences: ExperienceEntry[];
  projects: ProjectEntry[];
  socialLinks: SocialLinkEntry[];
  techStack: TechStackEntry[];
}

const initialFormData: FormData = {
  profile: {
    name: "",
    role: "",
    bio: "",
    email: "",
    location: "",
    avatar: "",
    resume: "",
    github: "",
    linkedin: "",
    twitter: "",
    website: "",
    descriptions: "",
  },
  experiences: [],
  projects: [],
  socialLinks: [],
  techStack: [],
};

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export default function UpdateFormClient({
  initialData,
}: {
  initialData: FormData;
}) {
  const [formData, setFormData] = useState<FormData>(initialData || initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [activeSection, setActiveSection] = useState<string>("profile");

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const updateProfile = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      profile: { ...prev.profile, [field]: value },
    }));
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, { id: generateId(), company: "", role: "", period: "", description: "" }],
    }));
  };

  const updateExperience = (id: string, field: keyof ExperienceEntry, value: string) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }));
  };

  const removeExperience = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, { id: generateId(), title: "", description: "", tech: "", link: "" }],
    }));
  };

  const updateProject = (id: string, field: keyof ProjectEntry, value: string) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)),
    }));
  };

  const removeProject = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));
  };

  const addSocialLink = () => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { id: generateId(), platform: "", url: "" }],
    }));
  };

  const updateSocialLink = (id: string, field: keyof SocialLinkEntry, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link) => (link.id === id ? { ...link, [field]: value } : link)),
    }));
  };

  const removeSocialLink = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((link) => link.id !== id),
    }));
  };

  const addTechStack = () => {
    setFormData((prev) => ({
      ...prev,
      techStack: [...prev.techStack, { id: generateId(), category: "", items: "" }],
    }));
  };

  const updateTechStack = (id: string, field: keyof TechStackEntry, value: string) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.map((tech) => (tech.id === id ? { ...tech, [field]: value } : tech)),
    }));
  };

  const removeTechStack = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((tech) => tech.id !== id),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const form = new FormData();
      form.append("profile", JSON.stringify(formData.profile));
      formData.experiences.forEach((exp, i) => {
        form.append(`experience_${i}`, JSON.stringify(exp));
      });
      formData.projects.forEach((proj, i) => {
        form.append(`project_${i}`, JSON.stringify(proj));
      });
      formData.socialLinks.forEach((link, i) => {
        form.append(`social_${i}`, JSON.stringify(link));
      });
      formData.techStack.forEach((tech, i) => {
        form.append(`tech_${i}`, JSON.stringify(tech));
      });

      const res = await fetch("/api/update/submit", {
        method: "POST",
        body: form,
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Portfolio updated successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to update portfolio. Please try again." });
      }
    } catch {
      setMessage({ type: "error", text: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sections = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "experience", label: "Experience", icon: "💼" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "social", label: "Social Links", icon: "🔗" },
    { id: "tech", label: "Tech Stack", icon: "⚡" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-4">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSection === section.id
                ? "bg-primary text-primary-foreground"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <span>{section.icon}</span>
            <span>{section.label}</span>
          </button>
        ))}
      </div>

      {/* Message */}
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800"
              : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Profile Section */}
      {activeSection === "profile" && (
        <div className="space-y-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span>👤</span> Profile Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name *</label>
              <input
                type="text"
                value={formData.profile.name}
                onChange={(e) => updateProfile("name", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Your name"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Role *</label>
              <input
                type="text"
                value={formData.profile.role}
                onChange={(e) => updateProfile("role", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g. Full Stack Developer"
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
              <textarea
                value={formData.profile.bio}
                onChange={(e) => updateProfile("bio", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="A short bio about yourself"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                value={formData.profile.email}
                onChange={(e) => updateProfile("email", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
              <input
                type="text"
                value={formData.profile.location}
                onChange={(e) => updateProfile("location", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="City, Country"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Avatar URL</label>
              <input
                type="url"
                value={formData.profile.avatar}
                onChange={(e) => updateProfile("avatar", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Resume URL</label>
              <input
                type="url"
                value={formData.profile.resume}
                onChange={(e) => updateProfile("resume", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">GitHub</label>
              <input
                type="url"
                value={formData.profile.github}
                onChange={(e) => updateProfile("github", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://github.com/..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn</label>
              <input
                type="url"
                value={formData.profile.linkedin}
                onChange={(e) => updateProfile("linkedin", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Twitter</label>
              <input
                type="url"
                value={formData.profile.twitter}
                onChange={(e) => updateProfile("twitter", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://twitter.com/..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Website</label>
              <input
                type="url"
                value={formData.profile.website}
                onChange={(e) => updateProfile("website", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Descriptions (one per line)
              </label>
              <textarea
                value={formData.profile.descriptions}
                onChange={(e) => updateProfile("descriptions", e.target.value)}
                rows={4}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Description 1&#10;Description 2&#10;Description 3"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Each line will be displayed as a separate description on your profile
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Experience Section */}
      {activeSection === "experience" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span>💼</span> Work Experience
            </h2>
            <Button type="button" onClick={addExperience} variant="default" size="sm">
              + Add Experience
            </Button>
          </div>
          {formData.experiences.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">No experience entries yet</p>
              <Button type="button" onClick={addExperience} variant="outline" className="mt-4">
                Add your first experience
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 relative"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Experience #{index + 1}</h3>
                    <Button
                      type="button"
                      onClick={() => removeExperience(exp.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      ✕ Remove
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Company *</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Company name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Role *</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Job title"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Period</label>
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => updateExperience(exp.id, "period", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="e.g. 2020 - Present"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Describe your responsibilities and achievements"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Projects Section */}
      {activeSection === "projects" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span>🚀</span> Projects
            </h2>
            <Button type="button" onClick={addProject} variant="default" size="sm">
              + Add Project
            </Button>
          </div>
          {formData.projects.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">No projects yet</p>
              <Button type="button" onClick={addProject} variant="outline" className="mt-4">
                Add your first project
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.projects.map((proj, index) => (
                <div
                  key={proj.id}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 relative"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Project #{index + 1}</h3>
                    <Button
                      type="button"
                      onClick={() => removeProject(proj.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      ✕ Remove
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title *</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => updateProject(proj.id, "title", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Project name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Link</label>
                      <input
                        type="url"
                        value={proj.link}
                        onChange={(e) => updateProject(proj.id, "link", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description *</label>
                      <textarea
                        value={proj.description}
                        onChange={(e) => updateProject(proj.id, "description", e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Describe what this project does"
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Technologies (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={proj.tech}
                        onChange={(e) => updateProject(proj.id, "tech", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="React, TypeScript, Node.js"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Social Links Section */}
      {activeSection === "social" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span>🔗</span> Social Links
            </h2>
            <Button type="button" onClick={addSocialLink} variant="default" size="sm">
              + Add Link
            </Button>
          </div>
          {formData.socialLinks.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">No social links yet</p>
              <Button type="button" onClick={addSocialLink} variant="outline" className="mt-4">
                Add your first link
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.socialLinks.map((link, index) => (
                <div
                  key={link.id}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 relative"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Link #{index + 1}</h3>
                    <Button
                      type="button"
                      onClick={() => removeSocialLink(link.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      ✕ Remove
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Platform *</label>
                      <input
                        type="text"
                        value={link.platform}
                        onChange={(e) => updateSocialLink(link.id, "platform", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="e.g. GitHub, LinkedIn, Twitter"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">URL *</label>
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) => updateSocialLink(link.id, "url", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="https://..."
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tech Stack Section */}
      {activeSection === "tech" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span>⚡</span> Tech Stack
            </h2>
            <Button type="button" onClick={addTechStack} variant="default" size="sm">
              + Add Category
            </Button>
          </div>
          {formData.techStack.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">No tech stack categories yet</p>
              <Button type="button" onClick={addTechStack} variant="outline" className="mt-4">
                Add your first category
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.techStack.map((tech, index) => (
                <div
                  key={tech.id}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 relative"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Category #{index + 1}</h3>
                    <Button
                      type="button"
                      onClick={() => removeTechStack(tech.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      ✕ Remove
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category *</label>
                      <input
                        type="text"
                        value={tech.category}
                        onChange={(e) => updateTechStack(tech.id, "category", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="e.g. Frontend, Backend, Databases"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Technologies (comma-separated) *
                      </label>
                      <textarea
                        value={tech.items}
                        onChange={(e) => updateTechStack(tech.id, "items", e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="React, Vue, Angular"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Submit Button */}
      <div className="sticky bottom-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Make sure all required fields are filled before saving
          </p>
          <Button type="submit" disabled={isSubmitting} size="lg" className="min-w-[200px]">
            {isSubmitting ? "Saving..." : "💾 Save Changes"}
          </Button>
        </div>
      </div>
    </form>
  );
}
