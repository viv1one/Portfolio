import { getAllContent, getExperiences, getProfile, getProjects, getSocialLinks, getTechStack, savePortfolioContent } from './content-db';
import type { PortfolioContent, PortfolioData, ProfileWithAbout, Experience, Project, SocialLink, TechStackItem } from './content-types';

export const getServerContentData = (): PortfolioData => getAllContent();
export const getServerPortfolioProfile = (): ProfileWithAbout => getProfile();
export const getServerPortfolioExperiences = (): Experience[] => getExperiences();
export const getServerPortfolioProjects = (): Project[] => getProjects();
export const getServerPortfolioSocialLinks = (): SocialLink[] => getSocialLinks();
export const getServerPortfolioTechStack = (): TechStackItem[] => getTechStack();
export const saveServerPortfolioContent = (content: PortfolioContent): void => savePortfolioContent(content);
