import type { Skill } from "@/types";
import SkillsCard from "@/components/shared/SkillsCard";

interface SkillGroup {
  name: string;
  skills: Skill[];
}

export function Skills() {
  const skillGroups: SkillGroup[] = [
    {
      name: "Languages",
      skills: [
        { name: "Python", level: 95, category: "frontend" },
        { name: "JavaScript", level: 85, category: "frontend" },
        { name: "TypeScript", level: 85, category: "backend" },
        { name: "HTML", level: 95, category: "frontend" },
        { name: "CSS", level: 90, category: "frontend" },
        { name: "SQL", level: 90, category: "database" },
        { name: "C", level: 60, category: "backend" },
        { name: "C++", level: 65, category: "backend" },
        { name: "Java", level: 50, category: "backend" },
        { name: "Bash", level: 80, category: "other" },
        { name: "MATLAB", level: 50, category: "other" },
        { name: "Scheme", level: 50, category: "other" },
        { name: "Haskell", level: 75, category: "other" },
      ],
    },
    {
      name: "Frameworks & Libraries",
      skills: [
        { name: "FastAPI", level: 90, category: "backend" },
        { name: "Flask", level: 90, category: "backend" },
        { name: "Django", level: 85, category: "backend" },
        { name: "SQLAlchemy", level: 90, category: "database" },
        { name: "Next.js", level: 75, category: "frontend" },
        { name: "React", level: 85, category: "frontend" },
        { name: "Node.js", level: 80, category: "backend" },
        { name: "Express", level: 85, category: "backend" },
        { name: "TailwindCSS", level: 70, category: "frontend" },
        { name: "MUI", level: 70, category: "frontend" },
        { name: "Bootstrap", level: 70, category: "frontend" },
      ],
    },
    {
      name: "Databases & Data Tools",
      skills: [
        { name: "PostgreSQL", level: 90, category: "database" },
        { name: "MySQL", level: 90, category: "database" },
        { name: "MongoDB (NoSQL)", level: 70, category: "database" },
        { name: "pandas", level: 60, category: "machine learning" },
        { name: "NumPy", level: 60, category: "machine learning" },
        { name: "Scikit-learn", level: 50, category: "machine learning" },
        { name: "Redshift", level: 70, category: "database" },
        { name: "BigQuery", level: 70, category: "database" },
        { name: "Apache Spark", level: 70, category: "database" },
        { name: "Apache Kafka", level: 70, category: "database" },
        
      ],
    },
    {
      name: "DevOps & Tools",
      skills: [
        { name: "Git", level: 95, category: "devops" },
        { name: "Docker", level: 80, category: "devops" },
        { name: "Kubernetes", level: 70, category: "devops" },
        { name: "ArgoCD", level: 60, category: "devops" },
        { name: "Apache Airflow", level: 70, category: "devops" },
        { name: "AWS", level: 75, category: "devops" },
        { name: "Google Cloud", level: 75, category: "devops" },
        { name: "Datadog", level: 80, category: "devops" },

      ],
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {skillGroups.map((group, index) => (
        <SkillsCard key={index} category={group.name} skills={group.skills} />
      ))}
    </div>
  );
}
