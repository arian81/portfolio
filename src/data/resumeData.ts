export const personalInfo = {
  "name": "Arian Ahmadinejad",
  "title": "Computer Science Student",
  "email": "ahmadinejadarian@gmail.com",
  "website": "https://arian.gg",
  "github": "https://github.com/arian81",
  "linkedin": "https://linkedin.com/in/arian81"
};

export const education = [
  {
    "school": "McMaster University",
    "degree": "Bachelor of Computer Science",
    "gpa": "4.0",
    "date": "Sept 2021 — Apr 2026",
    "achievements": [
      "Provost Honour Roll and Dean's honour roll for achieving a GPA of 4.0"
    ]
  }
];

export const experience = [
  {
    "title": "Software Engineering / Machine Learning Intern",
    "organization": "Bell Canada",
    "organizationUrl": "https://bell.ca/",
    "date": "May 2023 — Aug 2024",
    "location": "Toronto, ON",
    "technologies": "Python, VertexAI(GCP), LLM, Next.js, React, FastAPI, Big Query, PostgreSQL, Cloud Run",
    "achievements": [
      "Led planning and implementation of a fullstack generative AI app, reducing training costs by <span className=\"font-semibold\">65%</span> through simulating a customer.",
      "Collaborated with a team of <span className=\"font-semibold\">5</span> to scale the app for <span className=\"font-semibold\">5,000+</span> agents, leveraging <span className=\"font-semibold\">Next.js, FastAPI, and PostgreSQL</span>.",
      "Improved agent's performance by <span className=\"font-semibold\">30%</span>, utilizing Gemini's tool calling and dynamic rubrics to provide personalized feedback",
      "Increased the realism of scenarios through prompt engineering and fine tuning the LLM's weights"
    ]
  },
  {
    "title": "Teaching Assistant",
    "organization": "McMaster University",
    "organizationUrl": "https://mcmaster.ca/",
    "date": "June 2022 — Present",
    "location": "Hamilton, ON",
    "technologies": "Python, Bash, PostgreSQL, Discord API",
    "achievements": [
      "Optimized grading process for <span className=\"font-semibold\">1,000+</span> course materials (labs, assignments, exams) by developing <span className=\"font-semibold\">Python and Bash</span> scripts",
      "Taught <span className=\"font-semibold\">Python, C, Bash, and Linux fundamentals</span> to <span className=\"font-semibold\">100+</span> students through tutorials and labs"
    ]
  },
  {
    "title": "Technical VP",
    "organization": "DeltaHacks",
    "organizationUrl": "https://deltahacks.com/",
    "date": "Jul 2022 — Present",
    "location": "Hamilton, ON",
    "technologies": "Next.js, TRPC, Prisma, Netlify, Tailwind, NextAuth.js, Typeform, PostgreSQL",
    "achievements": [
      "Managed <span className=\"font-semibold\">7</span> developers building a stack ranking based judging platform, streamlining <span className=\"font-semibold\">30+</span> judges' evaluation of <span className=\"font-semibold\">100+</span> projects",
      "Integrated <span className=\"font-semibold\">TRPC, Prisma, and Netlify functions</span> stack which <span className=\"font-semibold\">scaled</span> the backend to handle <span className=\"font-semibold\">10,000+</span> requests throughout the year",
      "Developed a graph-based matchmaking tool that paired over <span className=\"font-semibold\">500</span> hackers into compatible teams based on interest and skillset"
    ]
  }
];

export const projects = [
  {
    "title": "When the Assignment",
    "subtitle": "A Tool for Tracking Upcoming Deadlines",
    "url": "https://mcwta.vercel.app/",
    "technologies": "Next.js, Tailwind, Shadcn, TypeScript, PostgreSQL, Prisma",
    "achievements": [
      "Employed a session-based architecture to eliminate the need for authentication and user sign up",
      "Developed a deadline-priority task tracking system to ensure appropriate time management.",
      "Implemented a platform-agnostic calendar syncing by hosting remote ICS files using <span className=\"font-semibold\">Next.js</span> middleware"
    ]
  },
  {
    "title": "PoC Agentic diner management system",
    "subtitle": "A Tool for Tracking Upcoming Deadlines",
    "url": "https://agentic-dining.vercel.app/",
    "technologies": "Next.js, Tailwind, Shadcn, TypeScript, PostgreSQL, Prisma, Fastapi, Llamaindex",
    "achievements": [
      "Created a minimalistic frontend using <span className=\"font-semibold\">Shadcn</span> based on enterprise diner management systems",
      "Used <span className=\"font-semibold\">Llamaindex</span> hosted on <span className=\"font-semibold\">Fastapi</span> to create an agentic system to manage diner reservations based on emails and past reviews"
    ]
  }
];

export const hackathons = [
  {
    "title": "Scuba",
    "subtitle": "Declutter your email with ai agents",
    "event": "HackMIT",
    "url": "https://ballot.hackmit.org/project/mjetc-fjkza-ittbc-vrirn",
    "technologies": "Python, LlamaIndex, Langchain",
    "achievements": [
      "Developed 5 LLM agents to automate emails using <span className=\"font-semibold\">LlamaIndex</span> and the <span className=\"font-semibold\">ReAct</span> reasoning method",
      "Created a <span className=\"font-semibold\">RAG</span> model based on past emails to allow extensive personalization and accuracy"
    ]
  },
  {
    "title": "Dash",
    "subtitle": "All in one dashboard for digital life",
    "event": "HacktheNorth",
    "url": "https://devpost.com/software/dash-um2zil",
    "technologies": "GCP, Next.js, React, Typescript, Tailwind, Prisma ORM, CockroachDB",
    "achievements": [
      "Integrated with Yahoo, GitHub and Google APIs such as <span className=\"font-semibold\">Gmail, Calendar</span> to provide realtime updates",
      "Implemented a custom grid component in React to allow maximum user customizability"
    ]
  }
];

export const skills = [
  {
    "category": "Languages",
    "items": "Python, Web Development (JavaScript, Typescript, HTML, CSS), Java, C++, C, Rust, Bash, Haskell"
  },
  {
    "category": "Frameworks",
    "items": "React, Next.js, Tailwind, Django, FastAPI"
  },
  {
    "category": "Tools",
    "items": "Linux, Git, Cloud Services (Google Cloud Platform, AWS), Relational Databases (SQL, PostgreSQL)"
  },
  {
    "category": "Design",
    "items": "Prototype design with Figma, Photoshop"
  }
];
