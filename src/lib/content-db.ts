import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';
import type { PortfolioContent, Experience, Project, SocialLink, TechStackItem } from './content-types';

const dbPath = path.join(process.cwd(), 'data', 'portfolio.sqlite');
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

function initializeDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      first_name TEXT NOT NULL,
      name TEXT NOT NULL,
      avatar TEXT NOT NULL,
      github_username TEXT NOT NULL,
      linkedin_url TEXT NOT NULL,
      designation TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT NOT NULL,
      about_title TEXT NOT NULL,
      about_current_project TEXT NOT NULL,
      about_current_project_url TEXT NOT NULL,
      resume_url TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS profile_descriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      profile_id INTEGER NOT NULL DEFAULT 1,
      text TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (profile_id) REFERENCES profile(id)
    );

    CREATE TABLE IF NOT EXISTS experiences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      company TEXT NOT NULL,
      year TEXT NOT NULL,
      company_link TEXT NOT NULL,
      description_json TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      link TEXT NOT NULL,
      desc TEXT NOT NULL,
      img_url TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS social_links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      href TEXT NOT NULL,
      link TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS tech_stack (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      icon_url TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );
  `);

  const profileCount = db.prepare('SELECT COUNT(*) as count FROM profile').get() as { count: number };
  if (profileCount.count === 0) {
    db.prepare(`
      INSERT INTO profile (
        id, first_name, name, avatar, github_username, linkedin_url, designation, email, phone,
        address, about_title, about_current_project, about_current_project_url, resume_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      1,
      'Vivek',
      'Vivek Kumar',
      'https://avatars.githubusercontent.com/u/41392917',
      'l-fifa-l',
      'https://www.linkedin.com/in/fifa/',
      'Project Manager',
      'vivone.corp@gmail.com',
      '+91 9049872675',
      'Lucknow, Uttar Pradesh, India.',
      'Project Manager with a knack for solving problems and driving impact, bridging the gap between tech and user needs',
      '@Google',
      'https://www.google.com',
      'https://drive.google.com/file/d/1r7Pw3eZcnQY8uiYv_6d2nNDznKtUIrfj/view?usp=sharing'
    );

    const descriptions = [
      'My journey began in software development, where I learned the intricacies of building web applications using various technologies like Python, Django, React, and Node.js.',
      'This technical foundation allows me to effectively collaborate with development teams and understand the feasibility of Project features.',
      "I'm passionate about the entire Project lifecycle, from ideation and development to launch and iteration, always keeping the user at the center of every decision.",
      'Now, as a Project Manager, I leverage my technical background and passion for creating impactful Projects to deliver user-centric solutions that solve real problems.',
      'I believe in the power of collaboration and the ability to bring ideas to life through collaboration.'
    ];

    const insertDescription = db.prepare('INSERT INTO profile_descriptions (profile_id, text, sort_order) VALUES (?, ?, ?)');
    descriptions.forEach((text, index) => {
      insertDescription.run(1, text, index);
    });
  }

  const experienceCount = db.prepare('SELECT COUNT(*) as count FROM experiences').get() as { count: number };
  if (experienceCount.count === 0) {
    const data = [
      {
        title: 'Project Management (Current)',
        company: 'Google',
        year: '2024',
        companyLink: 'https://www.google.com/',
        description: [
          'Responsible for making products at Google better.',
          'Working on enhancing product features and user experience.',
          'Collaborating with cross-functional teams to ensure project success.'
        ]
      },
      {
        title: 'Founder/CTO',
        company: 'Grinler',
        year: '2023',
        companyLink: 'https://www.grinler.com/',
        description: [
          'Founded and led a startup focused on creating and sharing memes.',
          'Oversaw the development of the platform and technical architecture.',
          'Engaged with the community to promote the platform and gather feedback.'
        ]
      },
      {
        title: 'Google Developer Group Co-Lead',
        company: 'Google Developer Group',
        year: '2021',
        companyLink: '',
        description: [
          'Co-led the Google Developer Group, organizing events and workshops.',
          'Managed and coordinated events for students.',
          'Facilitated knowledge sharing and networking among developers.'
        ]
      }
    ];

    const insertExperience = db.prepare('INSERT INTO experiences (title, company, year, company_link, description_json, sort_order) VALUES (?, ?, ?, ?, ?, ?)');
    data.forEach((item, index) => {
      insertExperience.run(item.title, item.company, item.year, item.companyLink, JSON.stringify(item.description), index);
    });
  }

  const projectCount = db.prepare('SELECT COUNT(*) as count FROM projects').get() as { count: number };
  if (projectCount.count === 0) {
    const data = [
      {
        title: 'Youcert',
        link: 'https://github.com/l-fifa-l/OPenEd',
        desc: 'A service that helps you to learn and get certified for free. Currently in development',
        imgUrl: 'https://images.unsplash.com/photo-1613826488066-5a115a53a1fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=853&q=80'
      },
      {
        title: 'Blockchain',
        link: 'https://github.com/l-fifa-l/blockchain',
        desc: 'Blockchain implementation in javascript.',
        imgUrl: 'https://images.unsplash.com/photo-1621579429200-846d23fe54d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
      },
      {
        title: 'vivek-is-me',
        link: 'https://github.com/l-fifa-l/vivek-is-me',
        desc: 'Portfolio site. Describes me',
        imgUrl: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80'
      }
    ];

    const insertProject = db.prepare('INSERT INTO projects (title, link, desc, img_url, sort_order) VALUES (?, ?, ?, ?, ?)');
    data.forEach((item, index) => {
      insertProject.run(item.title, item.link, item.desc, item.imgUrl, index);
    });
  }

  const socialCount = db.prepare('SELECT COUNT(*) as count FROM social_links').get() as { count: number };
  if (socialCount.count === 0) {
    const data = [
      { name: 'LinkedIn', href: 'https://www.linkedin.com/in/vivone/', link: 'https://img.icons8.com/fluency/48/000000/linkedin.png' },
      { name: 'Twitter', href: 'https://twitter.com/l__fifa__l', link: 'https://img.icons8.com/fluency/48/000000/twitter.png' },
      { name: 'GitHub', href: 'https://github.com/viv1one', link: 'https://img.icons8.com/glyph-neue/64/000000/github.png' },
      { name: 'Mail', href: 'mailto:vivone.corp@gmail.com', link: 'https://img.icons8.com/fluency/48/000000/email-sign.png' }
    ];

    const insertSocial = db.prepare('INSERT INTO social_links (name, href, link, sort_order) VALUES (?, ?, ?, ?)');
    data.forEach((item, index) => {
      insertSocial.run(item.name, item.href, item.link, index);
    });
  }

  const techStackCount = db.prepare('SELECT COUNT(*) as count FROM tech_stack').get() as { count: number };
  if (techStackCount.count === 0) {
    const data = [
      { name: 'Python', iconUrl: 'https://img.icons8.com/color/96/000000/python--v2.png' },
      { name: 'C++', iconUrl: 'https://img.icons8.com/color/96/000000/c-plus-plus-logo.png' },
      { name: 'Javascript', iconUrl: 'https://img.icons8.com/color/96/000000/javascript--v2.png' },
      { name: 'Django', iconUrl: 'https://img.icons8.com/color/96/000000/django.png' },
      { name: 'React', iconUrl: 'https://img.icons8.com/color/96/000000/react-native.png' },
      { name: 'Nodejs', iconUrl: 'https://img.icons8.com/color/96/000000/nodejs.png' }
    ];

    const insertTech = db.prepare('INSERT INTO tech_stack (name, icon_url, sort_order) VALUES (?, ?, ?)');
    data.forEach((item, index) => {
      insertTech.run(item.name, item.iconUrl, index);
    });
  }
}

initializeDb();

export function getDb() {
  return db;
}

export function savePortfolioContent(content: {
  profile: {
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
  };
  descriptions: string[];
  experiences: Array<{
    title: string;
    company: string;
    year: string;
    companyLink: string;
    description: string[];
  }>;
  projects: Array<{
    title: string;
    link: string;
    desc: string;
    imgUrl: string;
  }>;
  socialLinks: Array<{
    name: string;
    href: string;
    link: string;
  }>;
  techStack: Array<{
    name: string;
    iconUrl: string;
  }>;
}) {
  const tx = (db as any).transaction(() => {
    try {
      db.prepare('DELETE FROM profile_descriptions WHERE profile_id = 1').run();
      db.prepare('DELETE FROM profile WHERE id = 1').run();
      db.prepare(` INSERT INTO profile ( id, first_name, name, avatar, github_username, linkedin_url, designation, email, phone, address, about_title, about_current_project, about_current_project_url, resume_url ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `).run(
        1,
        content.profile.firstName,
        content.profile.name,
        content.profile.avatar,
        content.profile.githubUsername,
        content.profile.linkedInUrl,
        content.profile.designation,
        content.profile.email,
        content.profile.phone,
        content.profile.address,
        content.profile.aboutTitle,
        content.profile.aboutCurrentProject,
        content.profile.aboutCurrentProjectUrl,
        content.profile.resumeUrl
      );
      const insertDescription = db.prepare('INSERT INTO profile_descriptions (profile_id, text, sort_order) VALUES (?, ?, ?)');
      content.descriptions.forEach((text: string, index: number) => {
        const cleanText = text.trim();
        if (cleanText) {
          insertDescription.run(1, cleanText, index);
        }
      });
      db.prepare('DELETE FROM experiences').run();
      const insertExperience = db.prepare('INSERT INTO experiences (title, company, year, company_link, description_json, sort_order) VALUES (?, ?, ?, ?, ?, ?)');
      content.experiences.forEach((item: Experience, index: number) => {
        insertExperience.run(
          item.title,
          item.company,
          item.year,
          item.companyLink,
          JSON.stringify(item.description),
          index
        );
      });
      db.prepare('DELETE FROM projects').run();
      const insertProject = db.prepare('INSERT INTO projects (title, link, desc, img_url, sort_order) VALUES (?, ?, ?, ?, ?)');
      content.projects.forEach((item: Project, index: number) => {
        insertProject.run(item.title, item.link, item.desc, item.imgUrl, index);
      });
      db.prepare('DELETE FROM social_links').run();
      const insertSocial = db.prepare('INSERT INTO social_links (name, href, link, sort_order) VALUES (?, ?, ?, ?)');
      content.socialLinks.forEach((item: SocialLink, index: number) => {
        insertSocial.run(item.name, item.href, item.link, index);
      });
      db.prepare('DELETE FROM tech_stack').run();
      const insertTech = db.prepare('INSERT INTO tech_stack (name, icon_url, sort_order) VALUES (?, ?, ?)');
      content.techStack.forEach((item: TechStackItem, index: number) => {
        insertTech.run(item.name, item.iconUrl, index);
      });
    } catch (e) {
      console.error('Transaction error while saving portfolio content:', e);
      throw e;
    }
  });
  tx();
}

export function getProfile() {
  const profile = db.prepare(`
    SELECT first_name as firstName, name, avatar, github_username as githubUsername,
           linkedin_url as linkedInUrl, designation, email, phone, address,
           about_title as aboutTitle, about_current_project as aboutCurrentProject,
           about_current_project_url as aboutCurrentProjectUrl, resume_url as resumeUrl
    FROM profile WHERE id = 1
  `).get() as any;

  const descriptions = db.prepare(`
    SELECT text FROM profile_descriptions WHERE profile_id = 1 ORDER BY sort_order ASC
  `).all() as Array<{ text: string }>;

  return {
    ...profile,
    about: {
      title: profile.aboutTitle,
      description: descriptions.map((entry) => entry.text),
      currentProject: profile.aboutCurrentProject,
      currentProjectUrl: profile.aboutCurrentProjectUrl,
    },
    resumeUrl: profile.resumeUrl,
  };
}

export function getExperiences() {
  return (db.prepare(`
    SELECT title, company, year, company_link as companyLink, description_json as descriptionJson, sort_order as sortOrder
    FROM experiences
    ORDER BY sort_order ASC, id ASC
  `).all() as Array<{
    title: string;
    company: string;
    year: string;
    companyLink: string;
    descriptionJson: string;
    sortOrder: number;
  }>).map((entry) => ({
    ...entry,
    description: JSON.parse(entry.descriptionJson),
  }));
}

export function getProjects() {
  return db.prepare(`
    SELECT title, link, desc, img_url as imgUrl, sort_order as sortOrder
    FROM projects
    ORDER BY sort_order ASC, id ASC
  `).all() as Array<{
    title: string;
    link: string;
    desc: string;
    imgUrl: string;
    sortOrder: number;
  }>;
}

export function getSocialLinks() {
  return db.prepare(`
    SELECT name, href, link, sort_order as sortOrder
    FROM social_links
    ORDER BY sort_order ASC, id ASC
  `).all() as Array<{
    name: string;
    href: string;
    link: string;
    sortOrder: number;
  }>;
}

export function getTechStack() {
  return db.prepare(`
    SELECT name, icon_url as iconUrl, sort_order as sortOrder
    FROM tech_stack
    ORDER BY sort_order ASC, id ASC
  `).all() as Array<{
    name: string;
    iconUrl: string;
    sortOrder: number;
  }>;
}

export function getAllContent() {
  return {
    profile: getProfile(),
    experiences: getExperiences(),
    projects: getProjects(),
    socialLinks: getSocialLinks(),
    techStack: getTechStack(),
  };
}
