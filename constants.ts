import { Experience, Project, Skill } from './types';

export const PROFILE = {
  name: "Jaswinder Singh",
  title: "Full Stack Developer",
  tagline: "Building scalable, high-performance applications with React, Node.js, and Cloud Architectures.",
  about: "Full Stack Developer with 6+ years of experience specializing in React.js, Node.js, and the MERN stack. Skilled in building scalable, high-performance applications, developing and integrating RESTful APIs, and implementing microservices architecture. Proficient in cloud platforms (Azure, OpenShift, Docker) and security protocols (JWT, OAuth2.0, OIDC). Strong background in Agile development, CI/CD pipelines, and automated testing. Experienced in designing and delivering distributed systems with a focus on performance, security, and user experience.",
  location: "Toronto, Canada",
  email: "jaswindersingh1903@gmail.com",
  phone: "+1(647-819-0355)",
  resumeUrl: "/assets/Jaswinder_Singh_Resume.pdf" // Placeholder for actual file
};

export const SKILLS: Skill[] = [
  { name: 'React / React.js', level: 95, category: 'Frontend' },
  { name: 'Node.js', level: 90, category: 'Backend' },
  { name: 'TypeScript', level: 85, category: 'Frontend' },
  { name: 'PHP / Laravel', level: 85, category: 'Backend' },
  { name: 'AWS / Azure', level: 75, category: 'DevOps' },
  { name: 'Docker / OpenShift', level: 75, category: 'DevOps' },
  { name: 'MySQL', level: 85, category: 'Backend' },
  { name: 'WebSocket', level: 80, category: 'Backend' },
  { name: 'Microservices', level: 80, category: 'Backend' },
  { name: 'HTML / CSS', level: 95, category: 'Frontend' },
  { name: 'Version Control (Git)', level: 90, category: 'Tools' },
  { name: 'Agile Methodologies', level: 90, category: 'Tools' },
];

export const EXPERIENCE: Experience[] = [
  {
    id: '1',
    company: 'Loom Analytics',
    role: 'Sr. Software Engineer',
    period: "Oct '22 - Present",
    description: [
      'Integrated backend services with frontend applications, ensuring seamless data flow and functionality while reducing API response times by 15%, demonstrating a strong understanding of RESTful APIs.',
      'Collaborated with UX designers in an Agile team to convert user-centric designs into functional web interfaces, enhancing user engagement by 20% and streamlining feedback iteration cycles by 15%.',
      'Developed a dynamic user interface for a data visualization platform using React.js and PHP, enabling users to customize charts and graphs in real-time, leading to a 25% reduction in data analysis time.',
    ],
  },
  {
    id: '2',
    company: 'Classic Informatics',
    role: 'Software Engineer',
    period: "Sep '19 - Sep '21",
    description: [
      'Collected and documented user requirements, translating them into detailed logical and physical specifications, which reduced development cycle time by 20% and ensured alignment with stakeholder expectations.',
      'Evaluated project specifications to design technology solutions that exceeded performance expectations, improving system efficiency by 25% and ensuring high-quality outcomes.',
      'Collaborated cross-functionally with data scientists, business users, project managers, and engineers to implement effective solutions, improving project alignment by 20% and fostering a cohesive team environment.',
    ],
  },
  {
    id: '3',
    company: 'Enact E services',
    role: 'PHP Developer',
    period: "Jun '18 - Aug '19",
    description: [
      'Researched, assessed, and implemented over 10 client feature requests to enhance internal content management systems and content delivery applications, improving system efficiency by 20% and aligning with user needs and business objectives.',
      'Achieved significant improvements in the proprietary framework, resulting in a 70% boost in efficiency, which streamlined operations and reduced processing times.',
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Live Transcription with Closed Captions",
    description: "Independently designed and implemented a real-time closed captioning and live transcription module. Significantly improved accessibility and enhanced user experience.",
    technologies: ["React", "Node.js", "PHP", "Laravel", "Socket.IO", "Web-Socket"],
    liveLink: "#", 
    image: "https://picsum.photos/600/400?random=10" // Placeholder
  },
  {
    title: "BTG Global",
    description: "Directed the development process utilizing Laravel and React. Integrated backend with frontend ensuring seamless data flow. Delivered front-end UX improvements and broad structural changes across codebases. Contributed to a 30% revenue increase by attracting 8 new clients.",
    technologies: ["Laravel", "React.js", "Node.js", "MySQL", "HTML", "CSS"],
    liveLink: "https://btgglobal.ca",
    image: "https://picsum.photos/600/400?random=11" // Placeholder
  },
  {
    title: "Patient Promoter",
    description: "Designed a robust RESTful API using PHP. Created a user-friendly email marketing survey form integrated with PHP Laravel and MySQL to calculate Net Promoter Score (NPS). Enables real-time data collection and personalized patient follow-up.",
    technologies: ["React", "Laravel", "MySQL", "RESTful API"],
    liveLink: "https://patientpromoter.com",
    image: "https://picsum.photos/600/400?random=12" // Placeholder
  },
  {
    title: "GetPlasma.in (Volunteer)",
    description: "Engineered a responsive user interface using Bootstrap (30% improvement in user satisfaction). Deployed robust RESTful APIs in PHP handling over 15,000 hits and 6,000 registrations efficiently even on 2G networks.",
    technologies: ["PHP", "MySQL", "CSS", "HTML", "Bootstrap"],
    liveLink: "https://getplasma.in",
    image: "https://picsum.photos/600/400?random=13" // Placeholder
  }
];

export const EDUCATION = [
  {
    institution: "I.K. Gujral Punjab Technical University Jalandhar - Punjab",
    degree: "Bachelor of Technology, Computer Science",
    year: ""
  },
  {
    institution: "Centennial College",
    degree: "Advanced Diplomas, Software Engineering",
    year: "",
    location: "Scarborough, ON"
  }
];

export const SOCIAL_LINKS = [
  { platform: 'LinkedIn', url: 'https://linkedin.com/in/devjaswindersingh', icon: 'Linkedin' },
  { platform: 'GitHub', url: 'https://github.com/jaswindersingh1903', icon: 'Github' },
  { platform: 'Email', url: `mailto:${PROFILE.email}`, icon: 'Mail' },
];