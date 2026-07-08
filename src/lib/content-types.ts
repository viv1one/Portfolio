// Portfolio content types

export interface Profile {
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

export interface ProfileWithAbout extends Profile {
    about: {
        title: string;
        description: string[];
        currentProject: string;
        currentProjectUrl: string;
    };
    resumeUrl: string;
}

export interface Experience {
    title: string;
    company: string;
    year: string;
    companyLink: string;
    description: string[];
    sortOrder?: number;
}

export interface Project {
    title: string;
    link: string;
    desc: string;
    imgUrl: string;
    sortOrder?: number;
}

export interface SocialLink {
    name: string;
    href: string;
    link: string;
    sortOrder?: number;
}

export interface TechStackItem {
    name: string;
    iconUrl: string;
    sortOrder?: number;
}

export interface PortfolioContent {
    profile: Profile;
    descriptions: string[];
    experiences: Experience[];
    projects: Project[];
    socialLinks: SocialLink[];
    techStack: TechStackItem[];
}

export interface PortfolioData {
    profile: ProfileWithAbout;
    experiences: Experience[];
    projects: Project[];
    socialLinks: SocialLink[];
    techStack: TechStackItem[];
}