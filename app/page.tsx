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
            Hi, I’m Arina! I’m a software engineer passionate about building creative, efficient, 
            and scalable solutions that make a real impact. I earned my Computer Science degree from the University of Toronto 
            and currently work as a backend engineer at PayFare/Fiserv, where I develop and maintain multiple microservices and 
            user-facing products. Over the past few years, I’ve created software solutions for data teams with a strong focus on 
            backend and full-stack development using technologies like Python, FastAPI, Flask, RabbitMQ, Redis, MySQL, Redshift, 
            React, TypeScript, SQL, Docker, Kubernetes, AWS, and Google Cloud.
            </p>

            {/* <p>
              As a software engineer at theScore, I took the initiative to identify key challenges and design solutions that 
              directly improved the efficiency of our data workflows. I worked closely with data analysts 
              and data scientists, designing APIs, web applications, and real-time monitoring systems 
              that enabled teams to tackle complex data tasks more efficiently. One of my proudest 
              achievements was building a data observability tool from scratch, which significantly improved 
              incident response and reliability for our analytics workflows. Additionally, I learned React 
              and TypeScript on the go during my internship and built a full-stack analytics editor that 
              became widely used and relied upon by the data team.
            </p> */}

            <p>
              Outside of programming, I'm interested in psychology, AI, and photography. I enjoy learning new 
              things and am always looking for ways to connect ideas from different fields. When I'm not 
              coding, I'm reading, focused on fitness, spending time outdoors, or with loved ones.
            </p>

            {/* <p>
              I love collaborating on cool projects and learning new things. Let's get in touch!
            </p> */}
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
