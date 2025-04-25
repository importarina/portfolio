import EducationCard from "@/components/shared/EducationCard";

export function Education() {
  const education = {
    degree: "Honours BSc in Computer Science (Comprehensive Stream Specialization) with Co-op",
    school: "University of Toronto",
    startDate: "2018",
    endDate: "2023",
    description: [
      "Awards: UofT Scholar, UofT Grants",
      "Dean's List",
    ]
  };

  return (
    <div className="grid gap-6">
      <EducationCard {...education} />
    </div>
  );
} 