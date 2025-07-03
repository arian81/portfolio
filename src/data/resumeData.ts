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
    "title": "Software Engineering Intern",
    "organization": "Vidyard",
    "organizationUrl": "https://vidyard.com/",
    "date": "May 2024 — Present",
    "location": "Remote",
    "technologies": "TypeScript, ElysiaJS, Ruby, Vue 2",
    "achievements": [
      "Collaborated with a fulltime engineering team to maintain and enhance the core platform dashboard using <span className=\"font-semibold\">Ruby and Vue 2</span>",
      "Developed and maintained an AI microservice using <span className=\"font-semibold\">TypeScript and ElysiaJS</span>, serving as the backend for LLM-related operations"
    ]
  },
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
  },
  {
    "title": "Teaching Assistant",
    "organization": "McMaster University",
    "organizationUrl": "https://mcmaster.ca/",
    "date": "June 2022 — Dec 2024",
    "location": "Hamilton, ON",
    "technologies": "Python, Bash, PostgreSQL, Discord API",
    "achievements": [
      "Optimized grading process for <span className=\"font-semibold\">1,000+</span> course materials (labs, assignments, exams) by developing <span className=\"font-semibold\">Python and Bash</span> scripts",
      "Taught <span className=\"font-semibold\">Python, C, Bash, and Linux fundamentals</span> to <span className=\"font-semibold\">100+</span> students through tutorials and labs"
    ]
  }
];

export const projects = [
  {
    "title": "WebAssembly IDE",
    "subtitle": "Browser-based WASM Development Environment",
    "url": "https://wasm.arian.gg/",
    "technologies": "WebAssembly, Monaco Editor, Shadcn, TypeScript, React",
    "achievements": [
      "Built an online IDE for writing <span className=\"font-semibold\">WebAssembly</span> code with <span className=\"font-semibold\">Monaco Editor</span> providing syntax highlighting and code completion",
      "Implemented in-browser compilation and execution of WASM code with real-time console output"
    ]
  },
  {
    "title": "When the Assignment",
    "subtitle": "A Tool for Tracking Upcoming Deadlines",
    "url": "https://mcwta.vercel.app/",
    "technologies": "Next.js, Tailwind, Shadcn, TypeScript, PostgreSQL, Prisma",
    "achievements": [
      "Employed a session-based architecture to eliminate the need for authentication and user sign up",
      "Developed a deadline-priority task tracking system to ensure appropriate time management."
    ]
  }
];

export const hackathons = [
  {
    "title": "GitFaster",
    "subtitle": "Blazing fast GitHub client",
    "event": "Next.js Global Hackathon Speed Category Winner",
    "url": "https://gitfaster.dev/",
    "technologies": "Next.js, TypeScript, React, PostgreSQL, Redis, Drizzle ORM, GitHub API",
    "achievements": [
      "Implemented <span className=\"font-semibold\">just-in-time prefetching</span> on link hover and intelligent caching strategies to achieve blazing fast page transitions",
      "Optimized GitHub API integration with smart caching mechanisms to minimize redundant requests and improve response times"
    ]
  },
  {
    "title": "Grassy",
    "subtitle": "Friendly bracket bot",
    "event": "Bracket Bot Hackathon Top 3 Winner",
    "url": "https://github.com/arian81/bracket-bot-controller",
    "technologies": "Python, Rive, Next.js, OpenCV, websockets, MQTT",
    "achievements": [
      "Created a frontend interface to communicate over <span className=\"font-semibold\">MQTT</span> websockets and show robot emotions through <span className=\"font-semibold\">Rive</span> animations",
      "Implemented a tracking algorithm using <span className=\"font-semibold\">OpenCV</span> to find people and prompt them to play rock paper scissors"
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
