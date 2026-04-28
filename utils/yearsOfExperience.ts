export const CAREER_START_YEAR = 2018;
export const AI_FOCUS_START_YEAR = 2023;

export const yearsSince = (startYear: number): number => {
  const diff = new Date().getFullYear() - startYear;
  return diff < 1 ? 1 : diff;
};

export const YEARS_OF_EXPERIENCE = yearsSince(CAREER_START_YEAR);
export const AI_YEARS_OF_EXPERIENCE = yearsSince(AI_FOCUS_START_YEAR);
