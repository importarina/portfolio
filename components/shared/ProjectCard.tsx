import React from 'react';
import { Project } from '@/types';
import Card from './Card';
import Button from './Button';
import { Github, MousePointerClick } from 'lucide-react';

const TECH_TAG_STYLES = 'px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm';
const CARD_STYLES = 'flex flex-col h-full hover:shadow-lg transition-shadow duration-200';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, description, technologies, githubUrl, liveUrl } = project;

  return (
    <Card variant="hoverable" padding="lg" className={CARD_STYLES}>
      <div className="flex flex-col h-full">
        <h3 className="text-xl font-semibold mb-2 text-card-foreground">{title}</h3>
        <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span key={index} className={TECH_TAG_STYLES}>
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-2 mt-auto">
          {githubUrl && (
            <Button
              variant="outline"
              size="sm"
              as="a"
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              <span>Source</span>
            </Button>
          )}
          {liveUrl && (
            <Button
              variant="primary"
              size="sm"
              as="a"
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <MousePointerClick className="h-4 w-4" />
              <span>Demo</span>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard; 