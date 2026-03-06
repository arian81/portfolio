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
    linebreak()
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

#let jobs = yaml("../shared-data/experience.yaml")

#let parse-date(s) = {
  let parts = s.split("-")
  datetime(
    year: int(parts.at(0)),
    month: int(parts.at(1)),
    day: 1,
  )
}

#custom-title("Experience")[
  #for job in jobs {
    let start = parse-date(job.startDate)
    let end = if job.endDate == "Present" { "Present" } else { parse-date(job.endDate) }
    work-heading(
      job.company + " ↗",
      job.role,
      job.location,
      start,
      end,
      company-url: job.url,
      stack: job.stack,
    )[
      #for h in job.highlights [
        - #eval(h, mode: "markup")
      ]
    ]
  }
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

