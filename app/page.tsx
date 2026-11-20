import { Terminal } from "@/components/features/terminal"
import { ProfileHeader } from "@/components/features/profile-header"
import { Experience } from "@/components/features/experience"
import { Projects } from "@/components/features/projects"
import { Skills } from "@/components/features/skills"
import { Contact } from "@/components/features/contact"
import { Education } from "@/components/features/education"
import { FixedCVButton } from "@/components/layout/fixed-cv-button"
import { Separator } from "@/components/ui/separator"

export default function Home() {
  return (
    <main className="min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="profile-header">
          <ProfileHeader />
        </div>

        <div className="mt-8 mb-12">
          <Terminal />
        </div>

        <section id="about" className="py-6 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-1">About</h2>
          <Separator className="section-separator" />
          <div className="prose dark:prose-invert max-w-none">
            <p>
            Hi, I’m Arina. I’m a software engineer based in Canada.
            I like figuring out how things work and finding connections between subjects that don’t seem related at first.
            Psychology and computer science have both shaped how I think, and I enjoy having a reason to learn something outside my own field.
            </p>
            <p>
            I studied Computer Science at the University of Toronto. My work has ranged from building tools for data teams at theScore to helping build a financial platform from the ground up at Fiserv.
            I enjoy understanding a complicated problem and turning it into software that’s straightforward to use and maintain.
            </p>
            <p>
            The purpose behind a project matters a lot to me. I care about privacy and open source, and I’m interested in how software can contribute to healthcare and science.
            I want to put my skills toward work I believe in and build things that improve people’s lives.
            </p>
            <p>
              Outside of programming, I enjoy reading, photography, playing music, working out, and spending time with loved ones.
            </p>

          </div>
        </section>

        <section id="experience" className="py-6 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-1">Experience</h2>
          <Separator className="section-separator" />
          <Experience />
        </section>

        <section id="skills" className="py-6 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-1">Skills</h2>
          <Separator className="section-separator" />
          <Skills />
        </section>

        <section id="projects" className="py-6 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-1">Projects</h2>
          <Separator className="section-separator" />
          <Projects />
        </section>

        <section id="education" className="py-6 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-1">Education</h2>
          <Separator className="section-separator" />
          <Education />
        </section>

        <section id="contact" className="py-6 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-1">Contact</h2>
          <Separator className="section-separator" />
          <Contact />
        </section>
      </div>

      {/* Fixed CV Download Button */}
      <FixedCVButton />
    </main>
  )
}
