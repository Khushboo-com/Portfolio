// Edit this file to update portfolio content. Empty strings hide links/dates.
export const PROFILE = {
  github: "https://github.com/Khushboo-com",
  githubUser: "Khushboo-com",
  linkedin: "https://www.linkedin.com/in/khushboo-varshney",
  email: "khushboo13289@gmail.com",
};

export type SkillStatus = "Familiar" | "Learning";
export const SKILLS: { category: string; items: { name: string; status: SkillStatus }[] }[] = [
  { category: "Languages", items: [{ name: "C", status: "Familiar" }, { name: "Python", status: "Familiar" }] },
  { category: "Development", items: ["Backend Development", "Application Logic", "Data Structures & Algorithms", "API Concepts", "Database Fundamentals", "Problem Solving"].map((n) => ({ name: n, status: "Learning" as SkillStatus })) },
  { category: "Frontend & Design", items: [
    { name: "UI/UX Design", status: "Familiar" }, { name: "Wireframing & Prototyping", status: "Familiar" },
    ...["React", "HTML", "CSS", "JavaScript", "Responsive Design"].map((n) => ({ name: n, status: "Learning" as SkillStatus })),
  ] },
  { category: "Collaboration", items: ["Project Leadership", "Technical Presentations", "Idea Development", "Team Collaboration", "Creative Problem Solving"].map((n) => ({ name: n, status: "Familiar" as SkillStatus })) },
];

export type Project = {
  title: string; category: string; filter: string; roles: string[]; status: string;
  description: string; goalsLabel: string; goals: string[]; tech: string[];
  links: { label: string; url: string }[]; art: "planner" | "portal" | "notes";
};

export const PROJECTS: Project[] = [
  {
    title: "Zineth — AI Study Planner", category: "AI / Education / Productivity", filter: "AI", art: "planner",
    roles: ["Leadership", "Idea Development"], status: "Team Project",
    description: "Zineth AI Study Planner is a project focused on exploring how artificial intelligence can support students in organizing their studies and improving their learning workflow. My contribution involves leadership, generating ideas, and helping shape the project's direction.",
    goalsLabel: "Project goals", goals: ["Help students organize study tasks", "Support study planning", "Explore AI-assisted learning workflows", "Make study organization more accessible"],
    tech: [], links: [{ label: "View Project", url: "" }, { label: "View Repository", url: "" }],
  },
  {
    title: "Legacy Portal Injector", category: "Web Development / UI/UX / Team Collaboration", filter: "Web", art: "portal",
    roles: ["Presenter", "UI/UX Designer"], status: "Team Project",
    description: "Legacy Portal Injector is a collaborative project in which I contribute to user interface and user experience design and help present the project's concept, purpose, and workflow. My focus includes communicating ideas clearly and helping create an intuitive visual experience.",
    goalsLabel: "Design focus", goals: ["Clear information hierarchy", "Modern interface design", "User-friendly workflows", "Consistent visual language", "Effective technical presentation"],
    tech: [], links: [{ label: "View Project", url: "" }, { label: "View Presentation", url: "" }, { label: "View Repository", url: "" }],
  },
  {
    title: "Notes App", category: "Productivity / Application Development", filter: "Productivity", art: "notes",
    roles: ["Project Creator", "Developer"], status: "In Development",
    description: "A notes application concept designed to make capturing, organizing, and revisiting everyday information simple and convenient. The project provides an opportunity to explore application structure, user-friendly interfaces, and practical productivity features.",
    goalsLabel: "Planned features", goals: ["Create, edit & delete notes", "Search & organize notes", "Save notes persistently", "Responsive mobile-friendly interface"],
    tech: [], links: [{ label: "Live Demo", url: "" }, { label: "GitHub Repository", url: "" }],
  },
];

export const JOURNEY = [
  { title: "Programming Foundations", text: "Learning and practicing C programming, Python, and core programming concepts.", date: "" },
  { title: "AI Study Planner", text: "Contributing ideas and leadership to the Zineth AI Study Planner project.", date: "" },
  { title: "Legacy Portal Injector", text: "Contributing to UI/UX design and technical presentations.", date: "" },
  { title: "Notes Application", text: "Exploring the design and development of a practical productivity application.", date: "" },
  { title: "Continuous Learning", text: "Improving programming knowledge, development practices, communication, and design skills.", date: "" },
];
