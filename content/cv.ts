import type { Strand } from "./strands";

export type Role = {
  title: string;
  org: string;
  place: string;
  period: string;
  strands: Strand[];
  /** One line, used on the home page. */
  short: string;
  points: string[];
};

export const experience: Role[] = [
  {
    title: "Visiting Researcher",
    org: "Utrecht University, Faculty of Science",
    place: "Utrecht, Netherlands",
    period: "2026–present",
    strands: ["research", "software", "education"],
    short: "Research on digital modelling tools for science education. Sole designer and developer of SimSketch.",
    points: [
      "Research on educational technology and science education, focused on digital modelling tools. Supervisor: Prof. Dr. W.R. van Joolingen.",
      "Sole designer and developer of SimSketch, a ground-up rebuild of the research-based drawing-to-simulation tool (Bollen & van Joolingen, 2013): product and UX design, frontend, backend, security, testing and deployment.",
      "Built one Flutter/Dart codebase (194 source files, about 80,000 lines) that runs in the browser and on Windows, macOS, Linux, Android and iOS, and works offline.",
      "Delivered four simulation studios: a multi-agent sandbox, an ecology lab, a gear engine and a maths studio with its own expression compiler and Euler, RK2 and RK4 integrators.",
      "Rewrote the 2D physics engine: step time at 200 bodies fell from 15 ms to 0.5 ms, and results no longer depend on frame rate.",
      "Integrated a multi-provider AI assistant (Gemini, OpenAI, Claude) that proposes model changes as schema-validated JSON for learners to accept or reject.",
      "Wrote 16 TypeScript Cloud Functions, role-based Firestore security rules and TOTP two-factor authentication for staff accounts.",
      "Covered the work with more than 1,600 automated tests: 1,100+ Flutter unit and widget tests, 107 Cloud Functions tests and 460 security-rules tests.",
    ],
  },
  {
    title: "Full-Stack Developer (part-time)",
    org: "GmPly",
    place: "İstanbul, Türkiye (remote)",
    period: "2020–2025",
    strands: ["software", "education"],
    short: "Interactive corporate e-learning platform with Flutter and React clients.",
    points: [
      "Delivered the end-to-end implementation of an interactive corporate e-learning platform: a Flutter/Dart mobile client and React and TypeScript web interfaces with questions, polls and click hotspots.",
      "Designed a modular component architecture and state management across Flutter and React that keeps points and badges in sync across phones, tablets and desktops.",
      "Integrated REST APIs for content management, authentication and reporting; built in-app notifications, announcements and usage analytics.",
      "Worked asynchronously in an Agile/Scrum team with Git/GitLab, automated testing, code review and technical documentation.",
    ],
  },
  {
    title: "Founder and Full-Stack Developer",
    org: "BctSoft (self-employed)",
    place: "Muğla, Türkiye (hybrid)",
    period: "2021–2024",
    strands: ["software"],
    short: "More than ten web and mobile projects for business and individual clients.",
    points: [
      "Delivered 10+ web and mobile projects, from requirements and architecture to deployment and maintenance. Freelance 2021–2023, sole proprietorship 2023–2024.",
      "Built backend services, REST APIs and relational databases with Python/Django, PostgreSQL, MySQL and PHP/CodeIgniter; cross-platform apps in Flutter; websites in React and WordPress.",
      "Primary technical contact: turned client requirements into specifications and roadmaps and reported progress to non-technical stakeholders.",
    ],
  },
  {
    title: "IT Specialist and Web Design Teacher",
    org: "Muğla Bahçeşehir Private School",
    place: "Muğla, Türkiye",
    period: "2019–2020",
    strands: ["education", "software"],
    short: "Ran the school’s IT, supported 40+ staff and taught web design to high-school students.",
    points: [
      "Managed the school’s IT infrastructure and supported 40+ teachers and staff.",
      "Taught web design classes to high-school students.",
    ],
  },
];

export type Degree = {
  title: string;
  org: string;
  place: string;
  period: string;
  points: string[];
};

export const education: Degree[] = [
  {
    title: "PhD in Science Education",
    org: "Muğla Sıtkı Koçman University",
    place: "Muğla, Türkiye",
    period: "2024–present",
    points: [
      "Focus on AI and educational technology: AI and software in science and computer science education, and tools for collecting research data.",
    ],
  },
  {
    title: "Associate Degree in Computer Programming",
    org: "Istanbul University",
    place: "İstanbul, Türkiye",
    period: "2024–present",
    points: ["Object-oriented programming, algorithms, data structures, database management systems and web development."],
  },
  {
    title: "Master’s Degree in Science Education",
    org: "Muğla Sıtkı Koçman University, Institute of Educational Sciences",
    place: "Muğla, Türkiye",
    period: "2021–2024",
    points: [
      "GPA 3.93/4.00. Focus on AI and educational technology.",
      "Thesis: development of an AI-based mobile application and its evaluation with prospective science teachers (AImPLANT). Supervisor: Dr. Melek Altıparmak Karakuş.",
    ],
  },
  {
    title: "Erasmus+ Exchange in Computer Engineering",
    org: "Jan Evangelista Purkyně University (UJEP)",
    place: "Czech Republic",
    period: "2023",
    points: ["Five months."],
  },
  {
    title: "Research Internship",
    org: "University of Łódź",
    place: "Poland",
    period: "2023",
    points: ["Three months."],
  },
  {
    title: "Bachelor’s Degree in Science Education",
    org: "Manisa Celal Bayar University",
    place: "Manisa, Türkiye",
    period: "2015–2019",
    points: ["Digital learning environments, instructional design and web technologies; C programming, sorting algorithms and complexity analysis."],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Dart", "TypeScript", "JavaScript", "Python", "PHP", "SQL", "HTML/CSS", "C/C++ (Arduino)"] },
  {
    group: "Frontend and mobile",
    items: ["Flutter (web, mobile, desktop)", "React", "Next.js", "Tailwind CSS", "Vite", "ElectronJS", "Riverpod", "Bloc", "Provider", "Redux"],
  },
  {
    group: "Backend and cloud",
    items: ["Firebase (Auth, Firestore, Cloud Functions, Storage, Hosting, App Check)", "Node.js", "Django", "CodeIgniter", "REST APIs", "PostgreSQL", "MySQL", "WordPress"],
  },
  {
    group: "AI and LLM",
    items: ["OpenAI, Gemini and Claude APIs", "schema-validated structured output", "multimodal prompts", "prompt engineering", "Pl@ntNet API", "AI-assisted development (Claude, Cursor)"],
  },
  {
    group: "Security and privacy",
    items: ["role-based access control", "Firestore security rules", "TOTP 2FA", "App Check / reCAPTCHA", "rate limiting", "prompt-injection screening", "GDPR consent (Consent Mode v2)"],
  },
  {
    group: "Simulation and numerics",
    items: ["multi-agent simulation", "2D rigid-body physics", "Euler/RK2/RK4 integration", "expression compilers", "sandboxed interpreters"],
  },
  {
    group: "Engineering practice",
    items: ["unit, widget and emulator testing", "Git/GitHub/GitLab", "code review", "technical documentation", "Agile/Scrum", "Docker (foundations)"],
  },
  {
    group: "Research and pedagogy",
    items: ["quasi-experimental design", "test reliability analysis (KR-20)", "t-tests", "qualitative content analysis", "instructional design"],
  },
  { group: "Educational tools", items: ["Scratch", "Arduino (mBlock)", "MIT App Inventor", "Zappar (AR)", "SketchUp", "Photoshop"] },
  { group: "Spoken languages", items: ["Turkish (native)", "English (publishes and presents research in English)"] },
];
