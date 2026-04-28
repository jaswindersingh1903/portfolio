import contentData from './content.json';
import type { Skill, Experience, Project, SocialLink } from './types';
import { YEARS_OF_EXPERIENCE, AI_YEARS_OF_EXPERIENCE } from './utils/yearsOfExperience';

export const PROFILE = {
  ...contentData.profile,
  about: contentData.profile.about
    .replace('{years}', String(YEARS_OF_EXPERIENCE))
    .replace('{aiYears}', String(AI_YEARS_OF_EXPERIENCE)),
};
export const SKILLS       = contentData.skills       as Skill[];
export const EXPERIENCE   = contentData.experience   as Experience[];
export const PROJECTS     = contentData.projects     as Project[];
export const EDUCATION    = contentData.education;
export const SOCIAL_LINKS = contentData.socialLinks  as SocialLink[];
