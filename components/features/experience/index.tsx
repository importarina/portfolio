import type { Experience } from "@/types";
import ExperienceCard from "@/components/shared/ExperienceCard";

export function Experience() {
  const experiences: Experience[] = [
    {
      company: "Fiserv",
      position: "Senior Software Engineer, Digital Assets Platform",
      startDate: "Jan 2026",
      endDate: "Present",
      description: [
        "Selected as an early backend engineer on a small internal startup team building Fiserv’s digital assets platform from the ground up, helping define its architecture and core backend systems",
        "Designed backend services and REST APIs for onboarding, wallet creation, DDA linking, account inquiries, compliance workflows, and digital-asset transactions including minting, burning, and wallet-to-wallet transfers",
        "Designed durable Temporal workflows across internal services and external providers using retries, idempotency, compensation, and failure recovery to preserve correctness in distributed financial transactions",
        "Integrated banking, ledger, blockchain, custody, and compliance systems and built APIs for transaction review and risk controls, partnering with internal teams and vendors to prepare for the platform’s first major bank launch",
      ],
      technologies: ["Python", "FastAPI", "Temporal", "PostgreSQL", "SQLAlchemy", "Docker", "AWS"],
    },
    {
      company: "Fiserv",
      position: "Senior Software Engineer, Client Apps",
      startDate: "Sep 2025",
      endDate: "Jan 2026",
      description: [
        "Developed backend features across a multi-tenant fintech platform serving millions of users, working across dozens of microservices supporting programs including Lyft, Uber, DoorDash, and Paycom",
        "Independently designed configurable campaign functionality with per-user and aggregate cashback caps, enabling repeatable promotions, controlled experiments, and new revenue-generating use cases",
        "Built transaction and rewards workflows across REST APIs, queues, webhooks, and shared services, partnering with QA, mobile, and DevOps to safely deliver cross-service changes and production experiments",
      ],
      technologies: ["Python", "FastAPI", "Flask", "MySQL", "Redshift", "Docker", "Kubernetes", "AWS", "RabbitMQ", "Redis", "Bash"],
    },
    {
      company: "theScore",
      position: "Software Engineer, Data Services",
      startDate: "Sep 2021",
      endDate: "Sep 2024",
      description: [
        "Built APIs, internal tools, and data-processing services using Python, FastAPI, PostgreSQL, BigQuery, React, and Kubernetes, including independently developing a widely used internal web application for data teams",
        "Developed real-time stream monitoring and scalable report-generation services, improving observability, incident response, and automated reporting",
        "Led Redshift-to-BigQuery migrations and built tooling to automate PostgreSQL transfers across Kubernetes environments, improving scalability and reducing manual operational work",
        "Evaluated Apache Spark and Apache Flink through proof of concept implementations for scalable real-time data processing",
        "Automated data workflows using SQLAlchemy and Airflow and added PagerDuty, Slack, and email alerting to improve reliability and incident response",
      ],
      technologies: ["Python", "FastAPI", "Flask", "PostgreSQL", "SQLAlchemy", "React", "TypeScript", "Redshift", "BigQuery", "Docker", "Kubernetes", "Apache Airflow", "Apache Spark", "Apache Kafka", "ArgoCD", "Datadog", "AWS", "Google Cloud"],
    },
    {
      company: "University of Toronto",
      position: "Teaching Assistant",
      startDate: "Jan 2020",
      endDate: "May 2023",
      description: [
        "Led tutorials and graded assignments to support 20+ students, fostering analytical thinking and problem solving skills"
      ],
    },
    {
      company: "Public Services and Procurement Canada",
      position: "Web Developer Intern",
      startDate: "May",
      endDate: "Dec 2019",
      description: [
        "Proposed and developed a Python automation script to streamline annual web maintenance by extracting and updating data from CSV/PDF files, reducing manual workload and human error by an estimated 70%",
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
