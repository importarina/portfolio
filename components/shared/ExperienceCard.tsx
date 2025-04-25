import React from 'react';
import { Experience } from '@/types';
import Card from './Card';

const CARD_STYLES = 'flex flex-col h-full hover:shadow-lg transition-shadow duration-200';
const DATE_STYLES = 'text-sm text-muted-foreground';
const DESCRIPTION_STYLES = 'text-muted-foreground mt-2';
const TECH_TAG_STYLES = 'px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  const { company, position, startDate, endDate, description, technologies } = experience;

  return (
    <Card variant="hoverable" padding="lg" className={CARD_STYLES}>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-semibold text-card-foreground">{company}</h3>
            <p className="text-lg text-muted-foreground">{position}</p>
          </div>
          <p className={DATE_STYLES}>
            {startDate} - {endDate || 'Present'}
          </p>
        </div>
        <ul className={`${DESCRIPTION_STYLES} list-disc pl-4 space-y-1`}>
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {technologies.map((tech, index) => (
              <span key={index} className={TECH_TAG_STYLES}>
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ExperienceCard; 