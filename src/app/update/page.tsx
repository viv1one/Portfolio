import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import PageWrap from '@components/PageWrap';
import { getPortfolioProfile, getPortfolioExperiences, getPortfolioProjects, getPortfolioSocialLinks, getPortfolioTechStack, savePortfolioContent } from '@lib/content';

export const dynamic = 'force-dynamic';

export default function UpdatePage() {
  const profile = getPortfolioProfile();
  const experiences = getPortfolioExperiences();
  const projects = getPortfolioProjects();
  const socialLinks = getPortfolioSocialLinks();
  const techStack = getPortfolioTechStack();

  async function handleSubmit(formData: FormData) {
    'use server';

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
      descriptions: String(formData.get('descriptions') ?? '')
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      experiences: [
        {
          title: String(formData.get('experienceTitle') ?? ''),
          company: String(formData.get('experienceCompany') ?? ''),
          year: String(formData.get('experienceYear') ?? ''),
          companyLink: String(formData.get('experienceCompanyLink') ?? ''),
          description: String(formData.get('experienceDescription') ?? '')
            .split('\n')
            .map((item) => item.trim())
            .filter(Boolean),
        },
      ],
      projects: [
        {
          title: String(formData.get('projectTitle') ?? ''),
          link: String(formData.get('projectLink') ?? ''),
          desc: String(formData.get('projectDesc') ?? ''),
          imgUrl: String(formData.get('projectImgUrl') ?? ''),
        },
      ],
      socialLinks: [
        {
          name: String(formData.get('socialName') ?? ''),
          href: String(formData.get('socialHref') ?? ''),
          link: String(formData.get('socialLink') ?? ''),
        },
      ],
      techStack: [
        {
          name: String(formData.get('techName') ?? ''),
          iconUrl: String(formData.get('techIconUrl') ?? ''),
        },
      ],
    };

    savePortfolioContent(payload);
    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/experience');
    revalidatePath('/projects');
    redirect('/');
  }

  return (
    <PageWrap title="Update Portfolio">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-semibold mb-6">Update your portfolio content</h1>
        <form action={handleSubmit} className="space-y-8">
          <section className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input name="firstName" defaultValue={profile.firstName} className="border rounded p-2" placeholder="First name" />
              <input name="name" defaultValue={profile.name} className="border rounded p-2" placeholder="Full name" />
              <input name="avatar" defaultValue={profile.avatar} className="border rounded p-2" placeholder="Avatar URL" />
              <input name="githubUsername" defaultValue={profile.githubUsername} className="border rounded p-2" placeholder="GitHub username" />
              <input name="linkedInUrl" defaultValue={profile.linkedInUrl} className="border rounded p-2" placeholder="LinkedIn URL" />
              <input name="designation" defaultValue={profile.designation} className="border rounded p-2" placeholder="Designation" />
              <input name="email" defaultValue={profile.email} className="border rounded p-2" placeholder="Email" />
              <input name="phone" defaultValue={profile.phone} className="border rounded p-2" placeholder="Phone" />
              <input name="address" defaultValue={profile.address} className="border rounded p-2" placeholder="Address" />
              <input name="aboutTitle" defaultValue={profile.about.title} className="border rounded p-2" placeholder="About title" />
              <input name="aboutCurrentProject" defaultValue={profile.about.currentProject} className="border rounded p-2" placeholder="Current project" />
              <input name="aboutCurrentProjectUrl" defaultValue={profile.about.currentProjectUrl} className="border rounded p-2" placeholder="Current project URL" />
              <input name="resumeUrl" defaultValue={profile.resumeUrl} className="border rounded p-2" placeholder="Resume URL" />
            </div>
            <textarea name="descriptions" defaultValue={profile.about.description.join('\n')} className="w-full border rounded p-2 mt-4" rows={6} placeholder="One paragraph per line" />
          </section>

          <section className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Experience</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input name="experienceTitle" defaultValue={experiences[0]?.title ?? ''} className="border rounded p-2" placeholder="Title" />
              <input name="experienceCompany" defaultValue={experiences[0]?.company ?? ''} className="border rounded p-2" placeholder="Company" />
              <input name="experienceYear" defaultValue={experiences[0]?.year ?? ''} className="border rounded p-2" placeholder="Year" />
              <input name="experienceCompanyLink" defaultValue={experiences[0]?.companyLink ?? ''} className="border rounded p-2" placeholder="Company link" />
            </div>
            <textarea name="experienceDescription" defaultValue={experiences[0]?.description?.join('\n') ?? ''} className="w-full border rounded p-2 mt-4" rows={6} placeholder="One bullet per line" />
          </section>

          <section className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Projects</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input name="projectTitle" defaultValue={projects[0]?.title ?? ''} className="border rounded p-2" placeholder="Project title" />
              <input name="projectLink" defaultValue={projects[0]?.link ?? ''} className="border rounded p-2" placeholder="Project link" />
              <input name="projectImgUrl" defaultValue={projects[0]?.imgUrl ?? ''} className="border rounded p-2" placeholder="Image URL" />
            </div>
            <textarea name="projectDesc" defaultValue={projects[0]?.desc ?? ''} className="w-full border rounded p-2 mt-4" rows={4} placeholder="Project description" />
          </section>

          <section className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Social links</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input name="socialName" defaultValue={socialLinks[0]?.name ?? ''} className="border rounded p-2" placeholder="Label" />
              <input name="socialHref" defaultValue={socialLinks[0]?.href ?? ''} className="border rounded p-2" placeholder="URL" />
              <input name="socialLink" defaultValue={socialLinks[0]?.link ?? ''} className="border rounded p-2" placeholder="Icon URL" />
            </div>
          </section>

          <section className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Tech stack</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input name="techName" defaultValue={techStack[0]?.name ?? ''} className="border rounded p-2" placeholder="Tech name" />
              <input name="techIconUrl" defaultValue={techStack[0]?.iconUrl ?? ''} className="border rounded p-2" placeholder="Icon URL" />
            </div>
          </section>

          <button type="submit" className="rounded bg-red-500 px-4 py-2 text-white">Save changes</button>
        </form>
      </div>
    </PageWrap>
  );
}
