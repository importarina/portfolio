import React from 'react';
import { Skill } from '@/types';
import Card from './Card';

const SKILL_TAG_STYLES = 'px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm';
const CARD_STYLES = 'flex flex-col h-full hover:shadow-lg transition-shadow duration-200';

interface SkillsCardProps {
  category: string;
  skills: Skill[];
}

const SkillsCard: React.FC<SkillsCardProps> = ({ category, skills }) => {
  return (
    <Card variant="hoverable" padding="lg" className={CARD_STYLES}>
      <div className="flex flex-col h-full">
        <h3 className="text-xl font-semibold text-card-foreground mb-4">{category}</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span key={index} className={SKILL_TAG_STYLES}>
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default SkillsCard; 