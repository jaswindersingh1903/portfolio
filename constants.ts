import contentData from './content.json';
import type { Skill, Experience, Project, SocialLink } from './types';

export const PROFILE      = contentData.profile;
export const SKILLS       = contentData.skills       as Skill[];
export const EXPERIENCE   = contentData.experience   as Experience[];
export const PROJECTS     = contentData.projects     as Project[];
export const EDUCATION    = contentData.education;
export const SOCIAL_LINKS = contentData.socialLinks  as SocialLink[];
