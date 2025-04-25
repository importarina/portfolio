import type { Experience } from "@/types";
import ExperienceCard from "@/components/shared/ExperienceCard";

export function Experience() {
  const experiences: Experience[] = [
    {
      company: "theScore",
      position: "Software Engineer, Data Platforms",
      startDate: "Jun 2023",
      endDate: "Sep 2024",
      description: [
        "Built and maintained APIs, web apps, and internal tools for data processing and operational workflows",
        "Developed a stream transformation monitoring system to track pipeline health across key metrics and trigger real-time alerts for issues, significantly improving observability and incident response",
        "Designed scalable APIs for report generation and fulfillment services, simplifying destination onboarding and reducing future development effort",
        "Created and executed MVP roadmaps to deliver reliable, scalable systems aligned with evolving business and stakeholder needs",
        "Led core service migration from Redshift to BigQuery, improving performance, cost efficiency, and scalability",
        "Conducted a POC for streaming technologies (Spark, Flink), providing actionable insights to optimize real-time data processing and scalabilit",
        "Managed on-call shifts to ensure system uptime and reliability",
      ],
      technologies: ["Python", "FastAPI", "PostgreSQL", "React", "TypeScript", "Redshift", "BigQuery", "Docker", "Kubernetes", "Apache Airflow", "Apache Spark", "Apache Kafka", "ArgoCD", "Datadog", "AWS", "Google Cloud"],
    },
    {
      company: "theScore",
      position: "Software Engineer Intern, Data Platforms",
      startDate: "Sep 2021",
      endDate: "May 2023",
      description: [
        "Independently led end-to-end development of a widely used internal web application for data teams, building full-stack features from frontend UI components to backend APIs and database integration",
        "Migrated legacy SQL queries to SQLAlchemy ORM models, improving code maintainability and enabling faster iteration for new features",
        "Automated recurring data ingestion and processing workflows using Apache Airflow, reducing manual effort and supporting timely reporting for analysts",
        "Contributed to database management, data validation, and task scheduling, helping ensure the reliability and consistency of internal data systems",
      ],
      technologies: ["Python", "Flask", "PostgreSQL", "SQLAlchemy", "TypeScript", "React", "Docker", "Kubernetes", "Apache Airflow", "AWS"],
    },
    {
      company: "University of Toronto",
      position: "Teaching Assistant",
      startDate: "Jan 2020",
      endDate: "May 2023",
      description: [
        "Led tutorials and graded assignments to support 20+ students, fostering analytical thinking and problem solving skills in mathematics and computer science"
      ],
    },
    {
      company: "Public Services and Procurement Canada",
      position: "Web Developer Intern",
      startDate: "May",
      endDate: "Dec 2019",
      description: [
        "Updated web content per client requests, ensuring accessibility standards",
        "Proposed and developed a Python script to automate annual web maintenance by extracting and updating data from CSV/PDF files, greatly reducing manual workload",
      ],
      technologies: ["Python", "ColdFusion", "HTML", "CSS", "JavaScript", "Bash"],
    },
  ];

  return (
    <div className="grid gap-6">
      {experiences.map((experience, index) => (
        <ExperienceCard key={index} experience={experience} />
      ))}
    </div>
  );
}
