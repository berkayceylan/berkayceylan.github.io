import type { Strand } from "./strands";

export type ProjectImage = { src: string; alt: string; width: number; height: number };

export type ProjectSection = { heading: string; body?: string[]; list?: string[] };

export type ProjectPage = {
  metaDescription: string;
  role?: string;
  facts?: { label: string; value: string }[];
  sections: ProjectSection[];
  images?: ProjectImage[];
};

export type Project = {
  slug: string;
  title: string;
  period?: string;
  strands: Strand[];
  kind: string;
  summary: string;
  stack: string[];
  links: { label: string; href: string }[];
  /** Projects with a page get their own URL; the rest are listed on /projects/. */
  page?: ProjectPage;
};

const raw = "https://raw.githubusercontent.com";

export const projects: Project[] = [
  {
    slug: "simsketch",
    title: "SimSketch",
    period: "2026–present",
    strands: ["software", "research", "education"],
    kind: "Modelling platform",
    summary:
      "A drawing-based modelling and simulation platform for science and maths education. Learners sketch a phenomenon, give its parts behaviours, and run the drawing.",
    stack: ["Flutter", "Dart", "TypeScript", "Firebase", "Next.js", "OpenAI, Gemini and Claude APIs"],
    links: [
      { label: "simsketch.eu", href: "https://simsketch.eu" },
      { label: "simsketch.nl", href: "https://simsketch.nl" },
    ],
    page: {
      metaDescription:
        "SimSketch turns students’ drawings into running simulations. How I designed and built it at Utrecht University with Flutter, TypeScript and Firebase.",
      role: "Sole designer and developer, Utrecht University",
      facts: [
        { label: "Runs on", value: "Browser, Windows, macOS, Linux, Android, iOS" },
        { label: "Codebase", value: "194 Dart files, about 80,000 lines" },
        { label: "Physics step", value: "15 ms → 0.5 ms at 200 bodies" },
        { label: "Backend", value: "16 TypeScript Cloud Functions" },
        { label: "Tests", value: "1,100+ Flutter, 107 functions, 460 security rules" },
      ],
      sections: [
        {
          heading: "What it is",
          body: [
            "SimSketch is a ground-up rebuild of the research-based SimSketch drawing-to-simulation tool (Bollen & van Joolingen, 2013). A learner draws the objects in a phenomenon, gives them behaviours such as orbit, wander, eat or reproduce, and presses play. If the result isn’t what they expected, they change the drawing and run it again.",
            "I design and develop it at Utrecht University’s Faculty of Science, supervised by Prof. Dr. W.R. van Joolingen. That covers product and UX design, frontend, backend, security, testing and deployment.",
          ],
        },
        {
          heading: "Four studios in one codebase",
          body: [
            "One Flutter codebase runs in the browser and natively on five operating systems. It is offline-first: every studio works without a network, AI features work with the user’s own key and no account, and cloud features degrade gracefully.",
          ],
          list: [
            "Sandbox: multi-agent simulation with 22 composable behaviours, including predation, flocking, SIR epidemics, orbits and raycast light",
            "Ecology: a population lab with live graphs",
            "Gears: involute meshing, compound axles, chain drives and jam detection",
            "Math Studio: a custom expression compiler with Euler, RK2 and RK4 integrators",
          ],
        },
        {
          heading: "A faster, frame-rate-independent physics engine",
          body: [
            "I rewrote the 2D physics engine around velocity Verlet sub-stepping, impulse contacts with Coulomb friction and a sort-and-sweep broad phase. Step time at 200 bodies fell from 15 ms to 0.5 ms, and results no longer depend on the frame rate.",
          ],
        },
        {
          heading: "An AI assistant that proposes, not decides",
          body: [
            "The assistant works with Gemini, OpenAI or Claude and has Socratic and directive teaching modes. It reads the live workspace and proposes changes as schema-validated JSON, which learners accept or reject. It can also turn text into drawings and photos into models.",
            "Guard rails include prompt-injection screening, strict output validation, rate limiting and API keys held in the system keystore.",
          ],
        },
        {
          heading: "Tools for teachers",
          body: [
            "In the Customizer Studio, teachers choose the studios, behaviour palette, starter scene and AI policy for a lesson and publish it as a link. They can build new behaviours with visual blocks, a composite mixer or a small scripting language. All three compile to a JSON AST that a sandboxed, deterministic interpreter runs without eval.",
            "The optional Firebase backend adds classrooms with join codes, submissions and feedback, teacher and admin dashboards, moderation and audit logging. Staff accounts use TOTP two-factor authentication, and Firestore access is governed by role-based security rules.",
          ],
        },
      ],
    },
  },
  {
    slug: "aimplant",
    title: "AImPLANT",
    period: "2024",
    strands: ["research", "software", "education"],
    kind: "MSc research software",
    summary:
      "A mobile app that helps prospective science teachers notice, identify and collect plants outdoors, built for and evaluated in my master’s thesis.",
    stack: ["Flutter", "Dart", "Firebase", "Firestore", "OpenAI API", "Pl@ntNet API"],
    links: [
      { label: "Case study", href: "https://aimplant.bctsoft.net" },
      { label: "Paper", href: "https://doi.org/10.46328/ijtes.595" },
    ],
    page: {
      metaDescription:
        "AImPLANT is an AI-based plant identification app I built and evaluated with 24 prospective science teachers. Design, features and published results.",
      role: "Designer, developer and researcher",
      sections: [
        {
          heading: "The problem",
          body: [
            "People tend to overlook the plants around them, which researchers call plant blindness. AImPLANT was built to make plants easier to notice, identify and learn about when prospective science teachers work outdoors.",
          ],
        },
        {
          heading: "What I built",
          body: ["I designed and wrote the cross-platform app from scratch in Flutter, with participant data stored anonymously in Cloud Firestore."],
          list: [
            "Photo capture with AI plant identification through the Pl@ntNet API",
            "A geotagged virtual herbarium for each participant’s collection",
            "A botanical chatbot powered by ChatGPT",
            "An AI-evaluated assessment module",
            "In-app help",
          ],
        },
        {
          heading: "What happened in the field",
          body: [
            "The app was evaluated in a five-week outdoor field study with 24 prospective science teachers at Muğla Sıtkı Koçman University. The mean knowledge-test score rose from 16.71 to 21.54 (p < .0001), and spontaneous mentions of plants rose from 28.33% to 56.66% (p < .001).",
            "The study was published as a peer-reviewed article in the International Journal of Technology in Education and Science in 2024 and presented at ICEMST 2024.",
          ],
        },
      ],
    },
  },
  {
    slug: "e-learning-platform",
    title: "E-learning platform",
    period: "2020–2025",
    strands: ["software", "education"],
    kind: "Client work at GmPly",
    summary:
      "Corporate training with questions, polls and click hotspots, on a Flutter mobile client and React web interfaces that share one set of REST services.",
    stack: ["Flutter", "Dart", "React", "TypeScript", "REST APIs", "Docker"],
    links: [{ label: "Case study", href: "https://lms.bctsoft.net" }],
    page: {
      metaDescription:
        "How I built an interactive corporate e-learning platform at GmPly: a Flutter mobile client and React and TypeScript web interfaces on shared REST services.",
      role: "Full-stack developer (part-time), GmPly",
      sections: [
        {
          heading: "The goal",
          body: [
            "Corporate training teams needed interactive lessons that run on any HTML5-supported screen. I delivered the implementation end to end: a cross-platform Flutter mobile client and React and TypeScript web interfaces.",
          ],
        },
        {
          heading: "Interactive lessons",
          list: [
            "Lesson layers with questions, polls and click hotspots",
            "Points and badges that stay in sync across phones, tablets and desktops",
            "In-app notifications and announcements for corporate communication",
            "Usage analytics that connect what learners do with reporting services",
          ],
        },
        {
          heading: "How it was built",
          body: [
            "The Flutter and React clients share a modular widget and component architecture and the same approach to state management, so the experience stays consistent across devices. REST APIs cover content management, authentication and reporting.",
            "The team worked asynchronously in Agile/Scrum, with Git/GitLab, automated testing, code review, technical documentation and Docker.",
          ],
        },
      ],
    },
  },
  {
    slug: "bc-image-editor",
    title: "BC Image Editor",
    period: "2021–2022",
    strands: ["software"],
    kind: "Open-source Flutter package",
    summary:
      "A Flutter package for layering, positioning and rotating images with gestures, published on pub.dev under a verified publisher.",
    stack: ["Flutter", "Dart"],
    links: [
      { label: "pub.dev", href: "https://pub.dev/packages/bc_image_editor" },
      { label: "GitHub", href: "https://github.com/berkayceylan/bc_image_editor" },
    ],
    page: {
      metaDescription:
        "bc_image_editor is an open-source Flutter package for layering, positioning and rotating images with gestures. 130 pub points, MIT licensed.",
      role: "Author and maintainer",
      facts: [
        { label: "pub.dev", value: "130 pub points, 34 likes" },
        { label: "Licence", value: "MIT" },
        { label: "Publisher", value: "berkayceylan.com (verified)" },
      ],
      sections: [
        {
          heading: "What it does",
          body: ["bc_image_editor places a foreground image on a background and lets people edit it by touch. It works with asset files and files on the device."],
          list: [
            "Background and optional foreground layers",
            "Resize and position on the x and y axes",
            "3D rotation on the x and y axes, and 2D rotation",
            "Zoom for detail view",
            "Six gesture-driven modes: size and position, horizontal 3D, vertical 3D, 2D, view only and no edit",
          ],
        },
        {
          heading: "Maintaining it",
          body: ["I managed semantic versioning, public documentation and issue triage. I also built Merge Images, a mobile app, on top of the package."],
        },
      ],
      images: [
        { src: `${raw}/berkayceylan150/bc-image-editor/master/media/examples/horizontal.gif`, alt: "Rotating the foreground image horizontally in 3D", width: 696, height: 1422 },
        { src: `${raw}/berkayceylan150/bc-image-editor/master/media/examples/2d.gif`, alt: "Rotating the foreground image in 2D", width: 696, height: 1422 },
      ],
    },
  },
  {
    slug: "periodic-table",
    title: "Periodic Table 3D",
    period: "2022–2023",
    strands: ["education", "software"],
    kind: "Flutter app",
    summary: "An interactive periodic table with details for each element and a 3D Bohr model of its electrons.",
    stack: ["Flutter", "Dart"],
    links: [{ label: "GitHub", href: "https://github.com/berkayceylan/periodic_table_flutter" }],
    page: {
      metaDescription:
        "An open-source Flutter periodic table app for chemistry students and teachers, with element details and a 3D Bohr model for each element.",
      role: "Designer and developer",
      sections: [
        {
          heading: "What it does",
          body: [
            "The app helps students, teachers and enthusiasts explore the periodic table. Tap an element to see its atomic number, symbol, name, electron configuration and a short summary, then open a 3D Bohr model to see how its electrons are arranged.",
          ],
          list: [
            "Interactive periodic table",
            "Atomic number, symbol, name, electron configuration and summary for each element",
            "3D Bohr model for each element",
          ],
        },
        { heading: "Open source", body: ["The full source is on GitHub."] },
      ],
      images: [
        { src: `${raw}/berkayceylan/periodic_table_flutter/main/screenshots/ss-1.png`, alt: "Periodic table app, screenshot 1", width: 1080, height: 1920 },
        { src: `${raw}/berkayceylan/periodic_table_flutter/main/screenshots/ss-2.png`, alt: "Periodic table app, screenshot 2", width: 1080, height: 1920 },
        { src: `${raw}/berkayceylan/periodic_table_flutter/main/screenshots/ss-3.png`, alt: "Periodic table app, screenshot 3", width: 1080, height: 1920 },
      ],
    },
  },
  {
    slug: "robotic-hand",
    title: "Robotic hand",
    strands: ["education", "software"],
    kind: "Arduino project",
    summary: "A 3D-printed hand driven by servo motors and controlled from a phone over Bluetooth, by sliders or by tilting the phone.",
    stack: ["Arduino C", "MIT App Inventor", "Servo motors", "3D printing"],
    links: [{ label: "Video (Turkish)", href: "https://www.youtube.com/watch?v=SIXhPPS5Zoc" }],
    page: {
      metaDescription:
        "A 3D-printed robotic hand with Arduino and servo motors, controlled from a phone over Bluetooth with sliders, tilt or an infrared remote.",
      role: "Designer and builder",
      sections: [
        {
          heading: "How it works",
          body: ["The hand is 3D-printed and moved by servo motors. An Arduino drives the motors and listens for commands in three ways."],
          list: [
            "Sliders in a phone app built with MIT App Inventor, over a Bluetooth module",
            "Tilting the phone",
            "An infrared remote, through an IR module on the Arduino",
          ],
        },
      ],
      images: [
        { src: `${raw}/berkayceylan/other-projects/main/robotic_hand/ss/1.png`, alt: "The robotic hand, photo 1", width: 2232, height: 1186 },
        { src: `${raw}/berkayceylan/other-projects/main/robotic_hand/ss/2.png`, alt: "The robotic hand, photo 2", width: 1640, height: 836 },
      ],
    },
  },
  {
    slug: "rfid-puzzle",
    title: "RFID digital puzzle",
    strands: ["education", "software"],
    kind: "Arduino project",
    summary: "A classroom puzzle whose pieces carry RFID tags. Match a piece to the right word or picture and a light turns on.",
    stack: ["Arduino C", "RFID"],
    links: [{ label: "Photos and video", href: "https://drive.google.com/drive/folders/1ZyJR4rpOvc2jGK9pFxgGdNyIA6yh7XCM" }],
    page: {
      metaDescription:
        "A classroom puzzle built with Arduino and RFID: each piece carries a tag, and a light confirms when a student matches it to the right word or picture.",
      role: "Designer and builder",
      sections: [
        {
          heading: "How it works",
          body: [
            "Each piece has its own RFID tag and stands for a word or an image from the topic being taught. When a student matches a piece correctly, a light turns on to confirm the answer.",
            "Words and images can be swapped, so the same puzzle works for different subjects.",
          ],
        },
      ],
      images: [
        { src: `${raw}/berkayceylan/other-projects/main/digital_puzzle/ss/2.jpeg`, alt: "The RFID digital puzzle, photo 1", width: 1600, height: 1200 },
        { src: `${raw}/berkayceylan/other-projects/main/digital_puzzle/ss/1.jpeg`, alt: "The RFID digital puzzle, photo 2", width: 1600, height: 1200 },
      ],
    },
  },
  {
    slug: "daily-planner",
    title: "Daily Planner",
    strands: ["software"],
    kind: "Web app",
    summary: "Plan tasks by date and priority, tick them off, and come back to them after signing in.",
    stack: ["React", "Vite", "Tailwind CSS"],
    links: [{ label: "planner.bctsoft.net", href: "https://planner.bctsoft.net/" }],
    page: {
      metaDescription: "Daily Planner is a React web app for planning tasks by date and priority, with sign-in and dark mode. Live at planner.bctsoft.net.",
      role: "Designer and developer",
      sections: [
        {
          heading: "What it does",
          list: [
            "Add tasks for a date with high, medium or low priority",
            "Mark tasks complete or delete them",
            "Pick a date, or show every date at once",
            "Sign in to save tasks and manage them across visits",
            "Dark mode",
          ],
        },
      ],
      images: [{ src: "/images/daily-planner.webp", alt: "Daily Planner in dark mode, with tasks coloured by priority", width: 943, height: 609 }],
    },
  },
  {
    slug: "qr-code-generator",
    title: "QR Code Generator",
    strands: ["software"],
    kind: "Web app",
    summary: "Turn any text or link into a QR code, choose its size and colours, and download it as an image.",
    stack: ["React", "Vite", "Tailwind CSS"],
    links: [{ label: "qr.bctsoft.net", href: "https://qr.bctsoft.net/" }],
    page: {
      metaDescription: "A free QR code generator built with React: live preview, custom colours and size, and image download. Live at qr.bctsoft.net.",
      role: "Designer and developer",
      sections: [
        {
          heading: "What it does",
          list: [
            "Generates a QR code from text or a URL",
            "Background and code colours by picker or HEX value",
            "Size slider with a live preview",
            "Download as an image, or reset everything",
            "Dark mode",
          ],
        },
      ],
      images: [{ src: "/images/qr-code-generator.webp", alt: "QR Code Generator with colour and size controls", width: 800, height: 607 }],
    },
  },
  {
    slug: "markdown-editor",
    title: "Markdown Editor",
    strands: ["software"],
    kind: "Web app",
    summary: "Write Markdown and see it rendered as you type. Your text stays in the browser.",
    stack: ["React", "Vite", "Tailwind CSS"],
    links: [
      { label: "markdown.bctsoft.net", href: "https://markdown.bctsoft.net/" },
      { label: "Plain JavaScript version", href: "https://github.com/berkayceylan/markdown_editor_html_js" },
    ],
    page: {
      metaDescription: "A Markdown editor built with React: real-time preview, text saved in the browser and dark mode. Live at markdown.bctsoft.net.",
      role: "Designer and developer",
      sections: [
        {
          heading: "What it does",
          list: [
            "Renders Markdown in real time as you type",
            "Saves your text in the browser, so a refresh doesn’t lose it",
            "Clean layout with dark mode",
          ],
        },
        {
          heading: "An earlier version",
          body: ["I first wrote a Markdown editor in plain HTML, CSS and JavaScript. That version is open source on GitHub."],
        },
      ],
    },
  },
  {
    slug: "15-puzzle",
    title: "15 Puzzle",
    strands: ["software"],
    kind: "Flutter game",
    summary: "The classic sliding puzzle for web, mobile and desktop. Every shuffle can be solved.",
    stack: ["Flutter", "Dart"],
    links: [
      { label: "Play", href: "/15_puzzle/" },
      { label: "GitHub", href: "https://github.com/berkayceylan/15_puzzle_flutter" },
    ],
  },
  {
    slug: "merge-images",
    title: "Merge Images",
    strands: ["software"],
    kind: "Flutter app",
    summary: "A mobile app for combining and editing images, built on BC Image Editor.",
    stack: ["Flutter", "Dart"],
    links: [
      { label: "GitHub", href: "https://github.com/berkayceylan/merge_images" },
      { label: "Video", href: "https://youtu.be/oyC3qfUXX6g" },
    ],
  },
  {
    slug: "time-bar",
    title: "Time Bar",
    strands: ["software", "education"],
    kind: "Flutter package and tutorial",
    summary: "A one-line time bar widget, with a video on building a package and publishing it on pub.dev.",
    stack: ["Flutter", "Dart"],
    links: [
      { label: "pub.dev", href: "https://pub.dev/packages/time_bar" },
      { label: "Tutorial", href: "https://youtu.be/EHFAX42EVcE" },
    ],
  },
  {
    slug: "music-player",
    title: "Music Player",
    strands: ["software"],
    kind: "Desktop app",
    summary: "A desktop music player with drag-and-drop playlists.",
    stack: ["ElectronJS", "JavaScript"],
    links: [{ label: "GitHub", href: "https://github.com/berkayceylan/music-player-electronjs" }],
  },
  {
    slug: "php-cms",
    title: "PHP content management system",
    strands: ["software"],
    kind: "Web app",
    summary: "A CMS without a framework: accounts, blog, comments, messages and an admin panel.",
    stack: ["PHP", "MySQL", "jQuery"],
    links: [{ label: "GitHub", href: "https://github.com/berkayceylan/website-script-pure" }],
  },
  {
    slug: "digestive-system-ar",
    title: "Digestive system in AR",
    strands: ["education"],
    kind: "Augmented reality lesson",
    summary: "Cards that open 3D models and videos of the digestive system in augmented reality.",
    stack: ["Zappar"],
    links: [{ label: "Photos and video", href: "https://drive.google.com/drive/folders/1eDE49TGPVbWCYg1STHoM5FeDz2DaKE9l" }],
  },
  {
    slug: "biodiversity-3d",
    title: "Biodiversity in 3D",
    strands: ["education"],
    kind: "3D model and video",
    summary: "3D models of plant and animal species, used in a video for teaching biodiversity.",
    stack: ["SketchUp"],
    links: [{ label: "Photos and video", href: "https://drive.google.com/drive/folders/12vtWVexhMlbK0C5oewJzI-LagivrHA6w" }],
  },
];

export const projectsWithPage = projects.filter((p): p is Project & { page: ProjectPage } => Boolean(p.page));

export function getProject(slug: string) {
  return projectsWithPage.find((p) => p.slug === slug);
}
