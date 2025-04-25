import React from 'react';
import Card from './Card';

const CARD_STYLES = 'flex flex-col h-full hover:shadow-lg transition-shadow duration-200';
const DATE_STYLES = 'text-sm text-muted-foreground';
const DESCRIPTION_STYLES = 'text-muted-foreground mt-2';

interface EducationCardProps {
    degree: string;
    school: string;
    startDate: string;
    endDate: string;
    description: string[];
}

const EducationCard: React.FC<EducationCardProps> = ({ 
    degree, 
    school, 
    startDate, 
    endDate, 
    description
}) => {
    return (
        <Card variant="hoverable" padding="lg" className={CARD_STYLES}>
            <div className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-2">
            <div>
                <h3 className="text-xl font-semibold text-card-foreground">{school}</h3>
                <p className="text-lg text-muted-foreground">{degree}</p>
            </div>
            <p className={DATE_STYLES}>
                {startDate} - {endDate}
            </p>
            </div>
            <ul className={`${DESCRIPTION_STYLES} list-disc pl-4 space-y-1`}>
            {description.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
            </ul>
        </div>
        </Card>
    );
};

export default EducationCard; 