export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string[];
  technologies?: string[];
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'devops' | 'database' | 'machine learning' | 'other';
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
} 