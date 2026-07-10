import { getAllContent, getExperiences, getProfile, getProjects, getSocialLinks, getTechStack } from './content-db';
import type { PortfolioContent, ProfileWithAbout, Experience, Project, SocialLink, TechStackItem } from './content-types';

export const getPortfolioProfile = (): ProfileWithAbout => getProfile();
export const getPortfolioExperiences = (): Experience[] => getExperiences();
export const getPortfolioProjects = (): Project[] => getProjects();
export const getPortfolioSocialLinks = (): SocialLink[] => getSocialLinks();
export const getPortfolioTechStack = (): TechStackItem[] => getTechStack();
export { savePortfolioContent } from './content-db';
