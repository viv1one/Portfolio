import { getServerContentData, getServerPortfolioExperiences, getServerPortfolioProfile, getServerPortfolioProjects, getServerPortfolioSocialLinks, getServerPortfolioTechStack, saveServerPortfolioContent } from './content-server';

export function getContentData() {
  return getServerContentData();
}

export const getPortfolioProfile = () => getServerPortfolioProfile();
export const getPortfolioExperiences = () => getServerPortfolioExperiences();
export const getPortfolioProjects = () => getServerPortfolioProjects();
export const getPortfolioSocialLinks = () => getServerPortfolioSocialLinks();
export const getPortfolioTechStack = () => getServerPortfolioTechStack();
export const savePortfolioContent = (content: any) => saveServerPortfolioContent(content);
