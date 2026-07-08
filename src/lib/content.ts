import { getServerContentData, getServerPortfolioExperiences, getServerPortfolioProfile, getServerPortfolioProjects, getServerPortfolioSocialLinks, getServerPortfolioTechStack, saveServerPortfolioContent } from './content-server';
import type { PortfolioContent, PortfolioData, ProfileWithAbout, Experience, Project, SocialLink, TechStackItem } from './content-types';

export function getContentData(): PortfolioData {
  return getServerContentData();
}

export const getPortfolioProfile = (): ProfileWithAbout => getServerPortfolioProfile();
export const getPortfolioExperiences = (): Experience[] => getServerPortfolioExperiences();
export const getPortfolioProjects = (): Project[] => getServerPortfolioProjects();
export const getPortfolioSocialLinks = (): SocialLink[] => getServerPortfolioSocialLinks();
export const getPortfolioTechStack = (): TechStackItem[] => getServerPortfolioTechStack();
export const savePortfolioContent = (content: PortfolioContent): void => saveServerPortfolioContent(content);
