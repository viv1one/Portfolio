import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import PageWrap from '@components/PageWrap';
import { getPortfolioProfile, getPortfolioExperiences, getPortfolioProjects, getPortfolioSocialLinks, getPortfolioTechStack, savePortfolioContent } from '@lib/content';
import { Button } from '@components/ui/button';

export const dynamic = 'force-dynamic';

const ADMIN_COOKIE_NAME = 'portfolio-admin-auth';

function splitLines(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseEntries(formData: FormData, prefix: string, fields: string[]) {
  const valuesByIndex = new Map<number, Record<string, string>>();
  for (const [name, value] of formData.entries()) {
    const match = name.match(new RegExp(`^${prefix}\\[(\\d+)\\]\\[([a-zA-Z0-9_]+)\\]$`));
    if (!match) continue;
    const [, rawIndex, field] = match;
    if (!fields.includes(field)) continue;
    const index = Number(rawIndex);
    if (!valuesByIndex.has(index)) {
      valuesByIndex.set(index, {});
    }
    valuesByIndex.get(index)![field] = String(value);
  }
  return Array.from(valuesByIndex.entries())
    .sort(([left], [right]) => left - right)
    .map(([, value]) => value);
}

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE_NAME)?.value === 'true';
}

async function handleLogin(formData: FormData) {
  'use server';
  const expectedPassword = process.env.PORTFOLIO_ADMIN_PASSWORD;
  const submittedPassword = String(formData.get('password') ?? '');
  if (!expectedPassword) {
    redirect('/update?error=not-configured');
  }
  if (submittedPassword === expectedPassword) {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, 'true', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 8,
    });
    redirect('/update');
  }
  redirect('/update?error=wrong-password');
}

async function handleSubmit(formData: FormData) {
  'use server';
  const cookieStore = await cookies();
  const isAllowed = cookieStore.get(ADMIN_COOKIE_NAME)?.value === 'true' && Boolean(process.env.PORTFOLIO_ADMIN_PASSWORD);
  if (!isAllowed) {
    redirect('/update?error=unauthorized');
  }
  const payload = {
    profile: {
      firstName: String(formData.get('firstName') ?? ''),
      name: String(formData.get('name') ?? ''),
      avatar: String(formData.get('avatar') ?? ''),
      githubUsername: String(formData.get('githubUsername') ?? ''),
      linkedInUrl: String(formData.get('linkedInUrl') ?? ''),
      designation: String(formData.get('designation') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      address: String(formData.get('address') ?? ''),
      aboutTitle: String(formData.get('aboutTitle') ?? ''),
      aboutCurrentProject: String(formData.get('aboutCurrentProject') ?? ''),
      aboutCurrentProjectUrl: String(formData.get('aboutCurrentProjectUrl') ?? ''),
      resumeUrl: String(formData.get('resumeUrl') ?? ''),
    },
    descriptions: splitLines(String(formData.get('descriptions') ?? '')),
    experiences: parseEntries(formData, 'experiences', ['title', 'company', 'year', 'companyLink', 'description']).map((entry) => ({
      title: String(entry.title ?? ''),
      company: String(entry.company ?? ''),
      year: String(entry.year ?? ''),
      companyLink: String(entry.companyLink ?? ''),
      description: splitLines(String(entry.description ?? '')),
    })),
    projects: parseEntries(formData, 'projects', ['title', 'link', 'desc', 'imgUrl']).map((entry) => ({
      title: String(entry.title ?? ''),
      link: String(entry.link ?? ''),
      desc: String(entry.desc ?? ''),
      imgUrl: String(entry.imgUrl ?? ''),
    })),
    socialLinks: parseEntries(formData, 'socialLinks', ['name', 'href', 'link']).map((entry) => ({
      name: String(entry.name ?? ''),
      href: String(entry.href ?? ''),
      link: String(entry.link ?? ''),
    })),
    techStack: parseEntries(formData, 'techStack', ['name', 'iconUrl']).map((entry) => ({
      name: String(entry.name ?? ''),
      iconUrl: String(entry.iconUrl ?? ''),
    })),
  };
  savePortfolioContent(payload);
  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/experience');
  revalidatePath('/projects');
  redirect('/update?status=saved');
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

function InputField({ name, label, defaultValue, placeholder, type = 'text' }: { name: string; label: string; defaultValue?: string; placeholder: string; type?: string }) {
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

export default async function UpdatePage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const profile = getPortfolioProfile();
  const experiences = getPortfolioExperiences();
  const projects = getPortfolioProjects();
  const socialLinks = getPortfolioSocialLinks();
  const techStack = getPortfolioTechStack();
  const authenticated = await isAuthenticated();
  const params = await searchParams;
  const status = params?.status;
  const error = params?.error;

  if (!process.env.PORTFOLIO_ADMIN_PASSWORD) {
    return (
      <PageWrap title="Update Portfolio">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <h1 className="mb-6 text-3xl font-semibold">Update your portfolio content</h1>
          <div className="rounded-lg border border-amber-300 bg-amber-50 p-6 text-amber-900">
            Admin access is not configured. Set PORTFOLIO_ADMIN_PASSWORD in your environment to enable editing.
          </div>
        </div>
      </PageWrap>
    );
  }

  if (!authenticated) {
    return (
      <PageWrap title="Update Portfolio">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <div className="mx-auto max-w-sm">
            <div className="mb-8 text-center">
              <div className="mb-4 text-4xl">🔐</div>
              <h1 className="mb-2 text-2xl font-semibold">Admin Access</h1>
              <p className="text-sm text-slate-500">Enter the admin password to manage your portfolio content.</p>
            </div>
            <form action={handleLogin} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              {error === 'wrong-password' && (
                <div className="rounded-md border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-300">
                  Incorrect password. Please try again.
                </div>
              )}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </form>
          </div>
        </div>
      </PageWrap>
    );
  }

  const experienceEntries = experiences.length > 0 ? experiences : [{ title: '', company: '', year: '', companyLink: '', description: [] }];
  const projectEntries = projects.length > 0 ? projects : [{ title: '', link: '', desc: '', imgUrl: '' }];
  const socialEntries = socialLinks.length > 0 ? socialLinks : [{ name: '', href: '', link: '' }];
  const techEntries = techStack.length > 0 ? techStack : [{ name: '', iconUrl: '' }];

  return (
    <PageWrap title="Update Portfolio">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-8 rounded-xl border border-slate-200 bg-linear-to-r from-slate-50 to-white p-6 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Manage your portfolio</h1>
              <p className="mt-1 text-sm text-slate-500">Update your profile, experience, projects, and more.</p>
            </div>
            <div className="mt-3 flex items-center gap-2 sm:mt-0">
              {status === 'saved' && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Saved
                </span>
              )}
              {error === 'unauthorized' && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-sm font-medium text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                  Session expired
                </span>
              )}
            </div>
          </div>
        </div>

        <form action={handleSubmit} className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
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
              <InputField name="aboutTitle" label="About title" defaultValue={profile.about.title} placeholder="A short tagline" />
              <InputField name="aboutCurrentProject" label="Current project" defaultValue={profile.about.currentProject} placeholder="Building something cool" />
              <InputField name="aboutCurrentProjectUrl" label="Current project URL" defaultValue={profile.about.currentProjectUrl} placeholder="https://..." />
              <InputField name="resumeUrl" label="Resume URL" defaultValue={profile.resumeUrl} placeholder="https://..." />
            </div>
            <div className="mt-4">
              <TextAreaField
                name="descriptions"
                label="About description"
                defaultValue={profile.about.description.join('\n')}
                placeholder="Add one paragraph per line"
                rows={6}
              />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <SectionHeader title="Experience" description="Add your work history and keep the story current." emoji="💼" />
            <div className="space-y-4">
              {experienceEntries.map((item, index) => (
                <div key={`exp-${item.title}-${index}`} className="rounded-lg border border-slate-200 bg-slate-50/50 p-5 dark:border-slate-600 dark:bg-slate-900/50">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Entry {index + 1}</span>
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
                      defaultValue={item.description?.join('\n') ?? ''}
                      placeholder="Add one bullet per line"
                      rows={4}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <SectionHeader title="Projects" description="Highlight the work you want visitors to notice." emoji="🚀" />
            <div className="space-y-4">
              {projectEntries.map((item, index) => (
                <div key={`proj-${item.title}-${index}`} className="rounded-lg border border-slate-200 bg-slate-50/50 p-5 dark:border-slate-600 dark:bg-slate-900/50">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Project {index + 1}</span>
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

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <SectionHeader title="Social Links" description="Make it easier for people to connect with you." emoji="🔗" />
            <div className="space-y-4">
              {socialEntries.map((item, index) => (
                <div key={`social-${item.name}-${index}`} className="rounded-lg border border-slate-200 bg-slate-50/50 p-5 dark:border-slate-600 dark:bg-slate-900/50">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Link {index + 1}</span>
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

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <SectionHeader title="Tech Stack" description="Show the tools and technologies you work with." emoji="⚡" />
            <div className="space-y-4">
              {techEntries.map((item, index) => (
                <div key={`tech-${item.name}-${index}`} className="rounded-lg border border-slate-200 bg-slate-50/50 p-5 dark:border-slate-600 dark:bg-slate-900/50">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Skill {index + 1}</span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <InputField name={`techStack[${index}][name]`} label="Tech name" defaultValue={item.name} placeholder="React" />
                    <InputField name={`techStack[${index}][iconUrl]`} label="Icon URL" defaultValue={item.iconUrl} placeholder="https://..." />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <p className="text-sm text-slate-500">All changes will be published immediately.</p>
            <Button type="submit" size="lg">
              Save changes
            </Button>
          </div>
        </form>
      </div>
    </PageWrap>
  );
}
