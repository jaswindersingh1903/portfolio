import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PROFILE, EXPERIENCE, SKILLS, PROJECTS, EDUCATION } from '../constants';

let ai: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  if (!ai) {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
      throw new Error('VITE_API_KEY is not set. Add it to a .env file as VITE_API_KEY=your_key');
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}

const RESUME_CONTEXT = `
FULL NAME: ${PROFILE.name}
TITLE: ${PROFILE.title}
EMAIL: ${PROFILE.email}
PHONE: ${PROFILE.phone}
LOCATION: ${PROFILE.location}
SUMMARY: ${PROFILE.about}

SKILLS:
${SKILLS.map(s => `- ${s.name} (${s.category})`).join('\n')}

PROFESSIONAL EXPERIENCE:
${EXPERIENCE.map(e => `
ROLE: ${e.role}
COMPANY: ${e.company}
PERIOD: ${e.period}
HIGHLIGHTS:
${e.description.map(d => `- ${d}`).join('\n')}
`).join('\n')}

PROJECTS:
${PROJECTS.map(p => `
TITLE: ${p.title}
TECH STACK: ${p.technologies.join(', ')}
DESCRIPTION: ${p.description}
LINK: ${p.liveLink || 'N/A'}
`).join('\n')}

EDUCATION:
${EDUCATION.map(e => `- ${e.degree} at ${e.institution} ${e.location ? `(${e.location})` : ''}`).join('\n')}

ADDITIONAL DETAILS:
- Experienced in Agile development, CI/CD pipelines, and automated testing.
- Proficient in cloud platforms like Azure, OpenShift, Docker.
- Security protocols: JWT, OAuth2.0, OIDC.
`;

const SYSTEM_PROMPT = `
You are an AI portfolio assistant for ${PROFILE.name}, a ${PROFILE.title} based in ${PROFILE.location}.
Your goal is to effectively communicate Jaswinder's value to recruiters and potential clients.

CONTEXT DATA:
${RESUME_CONTEXT}

INSTRUCTIONS FOR RESPONSE GENERATION:

1.  **Prioritize Impact & Metrics:**
    - Always look for quantifiable results in the context (percentages, numbers, time saved).
    - Emphasize specific metrics to make them stand out (e.g., "reduced API response times by 15%").

2.  **Contextualize Technical Skills:**
    - When asked about a specific skill (e.g., React, Node.js, AWS), do not just say "he knows it."
    - Instead, explain *how* he used it in a specific role or project found in the context.
    - Example: "He utilized React at Loom Analytics to build a dynamic visualization platform..."

3.  **Detail-Oriented Project Explanations:**
    - When discussing projects, explain the problem, the solution (tech stack), and the outcome.
    - Mention specific technologies used in conjunction (e.g., "Integrated Laravel with React...").

4.  **Professional & Engaging Tone:**
    - Be professional, confident, and concise.
    - Avoid generic fluff.
    - Refer to Jaswinder in the third person ("Jaswinder", "He").

5.  **Handling Unknowns:**
    - If a question cannot be answered from the provided context, politely say: "I don't have that specific information in my records, but I can tell you about his experience with [related topic]..." or suggest contacting him directly.

6.  **Formatting:**
    - Use bullet points for lists to improve readability.
    - Keep paragraphs short and scannable.
`;

export const chatWithPortfolio = async (userMessage: string, history: {role: 'user' | 'model', text: string}[]): Promise<string> => {
  try {
    const response: GenerateContentResponse = await getAI().models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] }, 
        ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
         systemInstruction: SYSTEM_PROMPT
      }
    });

    return response.text || "I apologize, but I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "Sorry, I'm having trouble connecting to the AI service right now. Please try again later.";
  }
};