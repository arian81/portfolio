#import "@preview/simple-technical-resume:0.1.1": *

#let name = "Arian Ahmadinejad"
#let phone = ""
#let email = "ahmadinejadarian@gmail.com"
#let github = "arian81"
#let linkedin = "arian81"
#let personal-site = "arian.gg"

#set text(font: ("SF Pro Text", "Helvetica"))

#show: resume.with(
  top-margin: 0.25in,
  font: ("SF Pro Text", "Helvetica"),
  font-size: 9.3pt,
  personal-info-font-size: 12pt,
  author-position: center,
  personal-info-position: center,
  author-name: name,
  phone: phone,
  email: email,
  website: personal-site,
  linkedin-user-id: linkedin,
  github-username: github
)


#let period_worked(start-date, end-date) = {
  assert.eq(type(start-date), datetime)
  assert(type(end-date) == datetime or type(end-date) == str)

  if type(end-date) == str and end-date == "Present" {
    end-date = datetime.today()
  }

  [
    #start-date.display("[month repr:short] [year]") -- 
    #if (
      (end-date.month() == datetime.today().month()) and 
      (end-date.year() == datetime.today().year())
    ) [
      Present
    ] else [
      #end-date.display("[month repr:short] [year]")
    ]
  ]
}

#let work-heading(company, role, location, start-date, end-date, company-url: "", stack: "", body) = {
  grid(
    columns: (1fr, auto),
    align(left)[
      #{
        if company-url.len() != 0 {
          underline[#text(fill: rgb("#008B8B"))[#link(company-url)[*#company*]]]
        } else {
          underline[*#company*]
        }
      } \
      #{
        if stack.len() != 0 {
          [#role | *#stack*]
        } else {
          role
        }
      }
    ],
    align(right)[
      *#period_worked(start-date, end-date)* \
      #emph(location)
    ]
  )
  v(-0.2em)
  if body != [] {
    v(-0.4em)
    set par(leading: 0.6em)
    set list()
    body
  }
}

#let project-heading(name, stack: "", project-url: "", body) = {
  if project-url.len() != 0 { underline[#text(fill: rgb("#008B8B"))[#link(project-url)[*#name*]]] } else {
    underline[*#name*]
  }
  if stack != "" {
    v(-0.2em)
    [*#stack*]
  }
  v(-0.2em)
  if body != [] {
    v(-0.4em)
    set par(leading: 0.6em)
    set list()
    body
  }
}

#custom-title("Education")[
  #education-heading(
    "McMaster University", "Hamilton, ON",
    "Bachelor of Computer Science", strong[GPA: 4.0],
    datetime(year: 2021, month: 9, day: 1),
    datetime(year: 2026, month: 4, day: 1)
  )[]
]

#custom-title("Skills")[
  #skills()[
    - *Languages:* Python, JavaScript, TypeScript, HTML, CSS, Java, Bash
    - *Frameworks:* React, Next.js, Vue.js, Tailwind, Django, FastAPI
    - *Tools:* Linux, Git, Google Cloud Platform, AWS, PostgreSQL
    // - *Design:* Prototype design with Figma, Photoshop
  ]
]

#custom-title("Experience")[
  #work-heading(
    "Greptile ↗",
    "Software Engineer",
    "Remote",
    datetime(year: 2025, month: 9, day: 1),
    "Present",
    company-url: "https://www.greptile.com/",
    stack: "Next.js, TypeScript, TRPC, Prisma, Bun"
  )[
    - Reduced load times from *800ms to 200ms* by optimizing *Next.js* performance through server-side prefetching and caching
    - Boosted feature adoption by *30%* through a new feature discovery system on GitHub comments
    - Reduced engineering overhead by *5+ hours* per week by implementing Infisical for centralized secrets management
  ]

  #work-heading(
    "Vidyard ↗",
    "Software Engineering Intern",
    "Remote",
    datetime(year: 2025, month: 5, day: 1),
    datetime(year: 2025, month: 8, day: 1),
    company-url: "https://www.vidyard.com/",
    stack: "Ruby on Rails, Vue.js, Bun, TypeScript, ElysiaJS, AWS, Kubernetes"
  )[
    - Expanded core dashboard with AI video creation for free tier using *Ruby on Rails and Vue.js*, attracting 3,000 new monthly users
    - Architected an asynchronous pipeline using *Bun workers* to process videos *10x* faster
    - Won first place in internal hackathon by developing an MCP server enabling agentic AI interactions with Vidyard products
    - Worked on AI microservice using *TypeScript and ElysiaJS* powering 5,000+ daily LLM operations across the platform
  ]

  #work-heading(
    "Bell Canada ↗",
    "Machine Learning Intern",
    "Toronto, ON",
    datetime(year: 2023, month: 5, day: 1),
    datetime(year: 2024, month: 8, day: 1),
    company-url: "https://www.bell.ca/",
    stack: "Next.js, FastAPI, Cloud Run, VertexAI(GCP), Big Query, Pytest"
  )[
    - Led creation of a fullstack generative AI app, resulting in saving *\$1.5 million* per year by customer simulation, *winning Innovation Award*
    - Collaborated cross-functionally to scale the app for *5,000+* customer support agents, using *Next.js, FastAPI, and PostgreSQL*
    - Enhanced AI response realism by *50%* through fine-tuning Gemini models on historical customer support interaction logs
    - Achieved *85%* code coverage for backend by creating a comprehensive testing suite using *Pytest*
  ]

  #work-heading(
    "DeltaHacks ↗",
    "Technical VP",
    "Hamilton, ON",
    datetime(year: 2022, month: 7, day: 1),
    "Present",
    company-url: "https://deltahacks.com/",
    stack: "Next.js, TRPC, Prisma, Tailwind, TypeScript"
  )[
    - Managed *7* developers building a stack ranking based judging platform, streamlining *30+* judges' evaluation of *100+* projects each year
    - Integrated *TRPC, Prisma, and Vercel functions* which *scaled* the backend to handle *10,000+* requests throughout the year
    // - Developed a graph-based matchmaking tool that paired over *500* hackers into compatible teams based on interest and skillset
    - Developed a QR code event management infrastructure using *Apple Wallet* and a *PWA scanner* to handle traffic from *800+* attendees each year
  ]

  #work-heading(
    "McMaster University ↗",
    "Teaching Assistant",
    "Hamilton, ON",
    datetime(year: 2022, month: 6, day: 1),
    datetime(year: 2024, month: 12, day: 1),
    company-url: "https://www.mcmaster.ca/",
    stack: "Python, C, Bash, Linux"
  )[
    - Optimized grading process for *1,000+* course materials (labs, assignments, exams) by developing *Python and Bash* scripts
    - Taught *Python, C, Bash, and Linux fundamentals* to *100+* students through tutorials and labs
  ]
]

#custom-title("Projects")[
  #project-heading(
    "GitFaster - Fast GitHub client | Next.js Global Hackathon winner ↗",
    stack: "Next.js, TypeScript, React, PostgreSQL, Redis, Drizzle ORM, GitHub API",
    project-url: "https://gitfaster.dev/"
  )[
    - Accelerated user interactions by *3x* by implementing just-in-time prefetching on link hover and intelligent caching strategies
    - Optimized GitHub API integration with smart caching mechanisms to minimize redundant requests and improve response times
  ]

  #project-heading(
    "McOutline - Find and share course outlines ↗",
    stack: "Next.js, React, TypeScript, Tailwind, GitHub API",
    project-url: "https://www.mcoutline.ca/"
  )[
    - Built a fullstack app for students to upload, and browse course outlines, solving the lack of a centralized archive
    - Implemented local-first uploads with *OPFS* and GitHub object storage for zero-cost durability
  ]

  #project-heading(
    "WebAssembly IDE | Browser-based WASM Development Environment ↗",
    stack: "WebAssembly, Monaco Editor, Shadcn, TypeScript, React",
    project-url: "https://wasm.arian.gg/"
  )[
    - Built an online IDE for writing *WebAssembly* code with *Monaco Editor* providing syntax highlighting and code completion
    - Implemented in-browser compilation and execution of WASM code with real-time console output
  ]
]

