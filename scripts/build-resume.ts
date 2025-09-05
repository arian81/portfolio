#!/usr/bin/env ts-node

import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

const RESUME_DIR = path.join(__dirname, "../resume");
const RESUME_TEX = path.join(RESUME_DIR, "resume.tex");
const RESUME_HUMAN_TEX = path.join(RESUME_DIR, "resume-human.tex");

function compilePDF(inputFile: string, outputName: string): void {
  try {
    execSync(`cd ${RESUME_DIR} && pdflatex -output-directory=${RESUME_DIR} -jobname=${outputName} ${inputFile}`, {
      stdio: "inherit"
    });
  } catch (error) {
    console.error(`Failed to compile ${outputName}.pdf:`, error);
    process.exit(1);
  }
}

function main(): void {
  // Create backup copies of all .tex files
  const backupDir = path.join(RESUME_DIR, '.backup');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
  }
  
  const files = fs.readdirSync(RESUME_DIR, { recursive: true });
  for (const file of files) {
    if (typeof file === 'string' && file.endsWith('.tex')) {
      const fullPath = path.join(RESUME_DIR, file);
      if (fs.statSync(fullPath).isFile()) {
        const backupPath = path.join(backupDir, file);
        const backupSubDir = path.dirname(backupPath);
        if (!fs.existsSync(backupSubDir)) {
          fs.mkdirSync(backupSubDir, { recursive: true });
        }
        fs.copyFileSync(fullPath, backupPath);
      }
    }
  }

  // Compile regular resume (with commented human-only content)
  compilePDF("resume.tex", "resume");

  // Create human resume by processing backup files and creating temporary versions
  const tempFiles: string[] = [];
  
  for (const file of files) {
    if (typeof file === 'string' && file.endsWith('.tex')) {
      const backupPath = path.join(backupDir, file);
      if (fs.existsSync(backupPath)) {
        const content = fs.readFileSync(backupPath, 'utf8');
        // Uncomment content between % human-only markers
        const processedContent = content.replace(
          /% human-only\n([\s\S]*?)% human-only/g, 
          (match, innerContent) => {
            // Remove leading % and space from each line within the block
            return innerContent.replace(/^% /gm, '');
          }
        );
        
        if (file === 'resume.tex') {
          // For the main resume file, also remove Skills section and save as resume-human.tex
          const modifiedContent = processedContent.replace(
            /\\section{Skills}\n\\input{sections\/skills}/g,
            '% \\section{Skills}\n% \\input{sections/skills}'
          );
          fs.writeFileSync(RESUME_HUMAN_TEX, modifiedContent);
          tempFiles.push(RESUME_HUMAN_TEX);
        } else {
          // For other files, create temporary versions in the main directory
          const tempPath = path.join(RESUME_DIR, file);
          // Only create temp file if content actually changed
          if (content !== processedContent) {
            fs.writeFileSync(tempPath, processedContent);
            tempFiles.push(tempPath);
          }
        }
      }
    }
  }

  compilePDF("resume-human.tex", "resume-human");

  // Restore original files from backup (this ensures original files are unchanged)
  for (const file of files) {
    if (typeof file === 'string' && file.endsWith('.tex') && file !== 'resume.tex') {
      const backupPath = path.join(backupDir, file);
      const originalPath = path.join(RESUME_DIR, file);
      if (fs.existsSync(backupPath)) {
        fs.copyFileSync(backupPath, originalPath);
      }
    }
  }

  // Clean up backup directory and temporary files
  fs.rmSync(backupDir, { recursive: true, force: true });

  const auxFiles = [
    "resume.aux", "resume.log", "resume.out", "resume.fdb_latexmk",
    "resume.fls", "resume.synctex.gz", "resume-human.aux", "resume-human.log",
    "resume-human.out", "resume-human.fdb_latexmk", "resume-human.fls", "resume-human.synctex.gz"
  ];

  auxFiles.forEach(file => {
    const filePath = path.join(RESUME_DIR, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });

  if (fs.existsSync(RESUME_HUMAN_TEX)) {
    fs.unlinkSync(RESUME_HUMAN_TEX);
  }

  console.log("Resume PDFs compiled successfully");
}

if (require.main === module) {
  main();
}