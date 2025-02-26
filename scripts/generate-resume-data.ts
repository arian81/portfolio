import * as fs from "fs";
import * as path from "path";

// Type definitions
interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  website: string;
  github: string;
  linkedin: string;
}

interface Education {
  school: string;
  degree: string;
  gpa: string;
  date: string;
  achievements: string[];
}

interface Experience {
  title: string;
  organization: string;
  organizationUrl: string;
  date: string;
  location: string;
  technologies: string;
  achievements: string[];
}

interface Project {
  title: string;
  subtitle: string;
  url: string;
  technologies: string;
  achievements: string[];
}

interface Hackathon {
  title: string;
  subtitle: string;
  event: string;
  url: string;
  technologies: string;
  achievements: string[];
}

interface Skill {
  category: string;
  items: string;
}

// Paths
const RESUME_DIR = path.join(__dirname, "../resume");
const SECTIONS_DIR = path.join(RESUME_DIR, "sections");
const OUTPUT_FILE = path.join(__dirname, "../src/data/resumeData.ts");

// Helper functions
function readFile(filePath: string): string {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return "";
  }
}

// Helper function to clean LaTeX formatting
function cleanLatexText(text: string): string {
  return text
    .replace(/\\%/g, "%") // Replace LaTeX escaped percent
    .replace(/\\textbf{([^}]+)}/g, '<span className="font-semibold">$1</span>') // Replace bold text
    .replace(/\\href{([^}]+)}{([^}]+)}/g, "$2") // Remove hyperlinks but keep text
    .replace(/\\textbar{}/g, "|") // Replace textbar with pipe
    .replace(/---/g, "—") // Replace triple dash with em dash
    .trim();
}

function extractPersonalInfo(): PersonalInfo {
  const resumeTexContent = readFile(path.join(RESUME_DIR, "resume.tex"));
  const headerContent = readFile(path.join(RESUME_DIR, "_header.tex"));

  // Extract name and role from resume.tex
  const nameMatch = resumeTexContent.match(/\\def\\name{([^}]+)}/);
  const roleMatch = resumeTexContent.match(/\\def\\role{([^}]+)}/);
  const emailMatch = resumeTexContent.match(/\\def\\email{([^}]+)}/);
  const linkedInMatch = resumeTexContent.match(/\\def\\LinkedIn{([^}]+)}/);
  const githubMatch = resumeTexContent.match(/\\def\\github{([^}]+)}/);

  return {
    name: nameMatch?.[1] ?? "",
    title: roleMatch?.[1] ?? "",
    email: emailMatch?.[1] ?? "",
    website: "https://arian.gg", // Hardcoded from header.tex
    github: githubMatch ? `https://github.com/${githubMatch[1]}` : "",
    linkedin: linkedInMatch
      ? `https://linkedin.com/in/${linkedInMatch[1]}`
      : "",
  };
}

function extractEducation(): Education[] {
  const educationContent = readFile(path.join(SECTIONS_DIR, "education.tex"));
  const result: Education[] = [];

  // Extract education entries (skip commented lines)
  const educationLines = educationContent
    .split("\n")
    .filter((line) => !line.trim().startsWith("%"));
  const educationText = educationLines.join("\n");

  // Extract education entries
  const schoolMatch = educationText.match(
    /\\subsection{{([^}]+) \\hfill ([^}]+)}}/,
  );
  const degreeMatch = educationText.match(/\\subtext{([^|]+) \| GPA: ([^}]+)}/);

  // Extract achievements
  const achievementsMatches = educationText.match(/\\item ([^\n]+)/g);
  const achievements = achievementsMatches
    ? achievementsMatches.map((match) =>
        cleanLatexText(match.replace(/\\item /, "")),
      )
    : [];

  if (schoolMatch && degreeMatch) {
    result.push({
      school: schoolMatch[1]?.trim() ?? "",
      degree: degreeMatch[1]?.trim() ?? "",
      gpa: degreeMatch[2]?.trim() ?? "",
      date: (schoolMatch[2]?.trim() ?? "").replace(/---/g, "—"),
      achievements,
    });
  }

  return result;
}

function extractExperience(): Experience[] {
  const experienceContent = readFile(
    path.join(SECTIONS_DIR, "work_experience.tex"),
  );
  const result: Experience[] = [];

  // Filter out commented lines
  const experienceLines = experienceContent
    .split("\n")
    .filter((line) => !line.trim().startsWith("%"));
  const experienceText = experienceLines.join("\n");

  // Split by subsection to get each experience entry
  const experienceEntries = experienceText.split("\\subsection{");

  for (let i = 1; i < experienceEntries.length; i++) {
    const entry = experienceEntries[i];
    if (!entry) continue;

    // Extract title and date
    const titleDateMatch = entry.match(/^{([^}]+) \\hfill ([^}]+)}}/);
    if (!titleDateMatch) continue;

    const title = titleDateMatch[1]?.trim() ?? "";
    const date = (titleDateMatch[2]?.trim() ?? "").replace(/---/g, "—");

    // Extract organization, technologies, and location
    const subtextMatch = entry.match(
      /\\subtext{\\href{([^}]+)}{([^}]+)} \| ([^\\]+) \\hfill ([^}]+)}/,
    );
    if (!subtextMatch) continue;

    const organizationUrl = subtextMatch[1]?.trim() ?? "";
    const organization = subtextMatch[2]?.trim() ?? "";
    const technologies = subtextMatch[3]?.trim() ?? "";
    const location = subtextMatch[4]?.trim() ?? "";

    // Extract achievements
    const achievementsMatches = entry.match(/\\item ([^\n]+)/g);
    const achievements = achievementsMatches
      ? achievementsMatches.map((match) =>
          cleanLatexText(match.replace(/\\item /, "")),
        )
      : [];

    result.push({
      title,
      organization,
      organizationUrl,
      date,
      location,
      technologies,
      achievements,
    });
  }

  return result;
}

function extractProjects(): Project[] {
  const projectsContent = readFile(path.join(SECTIONS_DIR, "projects.tex"));
  const result: Project[] = [];

  // Filter out commented lines
  const projectLines = projectsContent
    .split("\n")
    .filter((line) => !line.trim().startsWith("%"));
  const projectsText = projectLines.join("\n");

  // Split by subsection to get each project entry
  const projectEntries = projectsText.split("\\subsection{");

  for (let i = 1; i < projectEntries.length; i++) {
    const entry = projectEntries[i];
    if (!entry) continue;

    // Extract title and subtitle
    const titleMatch = entry.match(
      /\\href{([^}]+)}{([^}]+)} \\textbar{} ([^}]+)}/,
    );
    if (!titleMatch) continue;

    const url = titleMatch[1]?.trim() ?? "";
    const title = titleMatch[2]?.trim() ?? "";
    const subtitle = titleMatch[3]?.trim() ?? "";

    // Extract technologies
    const techMatch = entry.match(/\\subtext{([^}]+)}/);
    const technologies = techMatch?.[1]?.trim() ?? "";

    // Extract achievements
    const achievementsMatches = entry.match(/\\item ([^\n]+)/g);
    const achievements = achievementsMatches
      ? achievementsMatches.map((match) =>
          cleanLatexText(match.replace(/\\item /, "")),
        )
      : [];

    result.push({
      title,
      subtitle,
      url,
      technologies,
      achievements,
    });
  }

  return result;
}

function extractHackathons(): Hackathon[] {
  const hackathonsContent = readFile(path.join(SECTIONS_DIR, "hackathons.tex"));
  const result: Hackathon[] = [];

  // Filter out commented lines
  const hackathonLines = hackathonsContent
    .split("\n")
    .filter((line) => !line.trim().startsWith("%"));
  const hackathonsText = hackathonLines.join("\n");

  // Split by subsection to get each hackathon entry
  const hackathonEntries = hackathonsText.split("\\subsection{");

  for (let i = 1; i < hackathonEntries.length; i++) {
    const entry = hackathonEntries[i];
    if (!entry) continue;

    // Extract title, subtitle and event
    const titleMatch = entry.match(
      /\\href{([^}]+)}{([^}]+)} - ([^|]+) \| \\textbf{([^}]+)}/,
    );
    if (!titleMatch) continue;

    const url = titleMatch[1]?.trim() ?? "";
    const title = titleMatch[2]?.trim() ?? "";
    const subtitle = titleMatch[3]?.trim() ?? "";
    const event = titleMatch[4]?.trim() ?? "";

    // Extract technologies
    const techMatch = entry.match(/\\subtext{([^}]+)}/);
    const technologies = techMatch?.[1]?.trim() ?? "";

    // Extract achievements
    const achievementsMatches = entry.match(/\\item ([^\n]+)/g);
    const achievements = achievementsMatches
      ? achievementsMatches.map((match) =>
          cleanLatexText(match.replace(/\\item /, "")),
        )
      : [];

    result.push({
      title,
      subtitle,
      event,
      url,
      technologies,
      achievements,
    });
  }

  return result;
}

function extractSkills(): Skill[] {
  const skillsContent = readFile(path.join(SECTIONS_DIR, "skills.tex"));
  const result: Skill[] = [];

  // Filter out commented lines
  const skillLines = skillsContent
    .split("\n")
    .filter((line) => !line.trim().startsWith("%"));
  const skillsText = skillLines.join("\n");

  // Extract skills from tabular environment
  const skillsMatches = skillsText.match(
    /\\skills{([^}]+)}[^&]+&[^&]+& ([^\\\n]+)/g,
  );

  if (skillsMatches) {
    skillsMatches.forEach((match) => {
      const parts = match.match(/\\skills{([^}]+)}[^&]+&[^&]+& ([^\\\n]+)/);
      if (parts) {
        result.push({
          category: parts[1]?.trim() ?? "",
          items: parts[2]?.trim() ?? "",
        });
      }
    });
  }

  return result;
}

function generateResumeData(): void {
  const personalInfo = extractPersonalInfo();
  const education = extractEducation();
  const experience = extractExperience();
  const projects = extractProjects();
  const hackathons = extractHackathons();
  const skills = extractSkills();

  const output = `export const personalInfo = ${JSON.stringify(personalInfo, null, 2)};

export const education = ${JSON.stringify(education, null, 2)};

export const experience = ${JSON.stringify(experience, null, 2)};

export const projects = ${JSON.stringify(projects, null, 2)};

export const hackathons = ${JSON.stringify(hackathons, null, 2)};

export const skills = ${JSON.stringify(skills, null, 2)};
`;

  // Create directories if they don't exist
  const dataDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Write the output file
  fs.writeFileSync(OUTPUT_FILE, output);
  console.log(`Resume data generated successfully at ${OUTPUT_FILE}`);
}

// Run the generator
generateResumeData();
