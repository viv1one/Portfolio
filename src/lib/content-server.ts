import { getAllContent, getExperiences, getProfile, getProjects, getSocialLinks, getTechStack, savePortfolioContent } from './content-db';

export const getServerContentData = () => getAllContent();
export const getServerPortfolioProfile = () => getProfile();
export const getServerPortfolioExperiences = () => getExperiences();
export const getServerPortfolioProjects = () => getProjects();
export const getServerPortfolioSocialLinks = () => getSocialLinks();
export const getServerPortfolioTechStack = () => getTechStack();
export const saveServerPortfolioContent = (content: any) => savePortfolioContent(content);
