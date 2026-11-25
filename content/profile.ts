export const site = {
  url: "https://berkayceylan.github.io",
  name: "Berkay Ceylan",
  title: "Berkay Ceylan: Full-Stack Engineer and EdTech Researcher",
  description:
    "Full-stack software engineer and visiting researcher at Utrecht University. I build SimSketch, AImPLANT and other software for science education.",
} as const;

export const profile = {
  name: "Berkay Ceylan",
  jobTitle: "Full-stack software engineer and educational technology researcher",
  lead: "I build educational software and study how people learn with it.",
  intro:
    "I’m a full-stack software engineer and a visiting researcher at Utrecht University, where I design and develop SimSketch, a tool that turns students’ drawings into running simulations.",
  location: "Utrecht, Netherlands",
  email: "b.ceylan@uu.nl",
  orcid: "0000-0001-6729-3256",
  bio: [
    "I studied science education in Manisa, Türkiye, with programming, algorithms and web technologies alongside it. After graduating I ran the IT systems at a private school in Muğla and taught web design there, which showed me how teachers, students and school leaders actually use educational technology.",
    "Since then I have built web, mobile and desktop software for more than six years: client projects as BctSoft, a corporate e-learning platform at GmPly, and open-source Flutter packages.",
    "My master’s thesis at Muğla Sıtkı Koçman University joined the two sides. I designed and built AImPLANT, an AI-based plant identification app, and tested it with 24 prospective science teachers. I’m now a PhD student in science education there, focusing on AI and educational technology.",
  ],
  now: [
    { label: "Research", text: "Visiting researcher, Faculty of Science, Utrecht University" },
    { label: "Building", text: "SimSketch, drawing-based modelling for science and maths" },
    { label: "Studying", text: "PhD in Science Education, Muğla Sıtkı Koçman University" },
    { label: "Based in", text: "Utrecht, Netherlands" },
  ],
  interests: [
    "AI in education",
    "Educational technology design",
    "Computational modelling and simulation in science education",
    "Mobile learning",
    "LLM-based tutoring and assessment",
  ],
  links: {
    github: "https://github.com/berkayceylan",
    linkedin: "https://www.linkedin.com/in/hi-berkay-ceylan",
    orcid: "https://orcid.org/0000-0001-6729-3256",
    pubdev: "https://pub.dev/publishers/berkayceylan.com/packages",
    portfolio: "https://me.bctsoft.net",
    studio: "https://bctsoft.net",
  },
} as const;

export const contactLinks = [
  { label: "GitHub", href: profile.links.github },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "ORCID", href: profile.links.orcid },
  { label: "pub.dev", href: profile.links.pubdev },
  { label: "BctSoft", href: profile.links.studio },
] as const;
