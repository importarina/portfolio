import { Project } from "@/types";
import ProjectCard from "@/components/shared/ProjectCard";

export function Projects() {
  const projects: Project[] = [
    {
      title: "BikEtail",
      description:
        "Online marketplace for urban mobility devices that facilitates buying, selling, and renting. Supports authentication, multiple user types and access levels, and item reviews",
      technologies: ["HTML", "CSS", "TypeScript", "React", "Node.js", "Express", "MongoDB"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      title: "LyriChord.js",
      description: "VanillaJS library for displaying lyrics with guitar chords in a simple, readable format on the DOM",
      technologies: ["JavaScript"],
      githubUrl: "#",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
}
