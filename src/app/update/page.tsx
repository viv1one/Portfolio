import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import PageWrap from '@components/PageWrap';
import { getPortfolioProfile, getPortfolioExperiences, getPortfolioProjects, getPortfolioSocialLinks, getPortfolioTechStack, savePortfolioContent } from '@lib/content';
import { Button } from '@components/ui/button';
import UpdateForm from './UpdateForm';

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

        <UpdateForm profile={profile} experiences={experienceEntries} projects={projectEntries} socialLinks={socialEntries} techStack={techEntries} handleSubmit={handleSubmit} status={status} error={error} />
      </div>
    </PageWrap>
  );
}
