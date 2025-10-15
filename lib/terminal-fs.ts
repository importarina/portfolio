// File system data for the terminal component

export type FileSystemNode = {
  name: string
  type: "file" | "directory"
  content?: string
  children?: Record<string, FileSystemNode>
}

export const fileSystem: FileSystemNode = {
  name: "/",
  type: "directory",
  children: {
    home: {
      name: "home",
      type: "directory",
      children: {
        arina: {
          name: "arina",
          type: "directory",
          children: {
            "about.txt": {
              name: "about.txt",
              type: "file",
              content:
              "I’m Arina — a backend engineer at PayFare/Fiserv passionate about building creative, " +
              "efficient, and scalable software that makes real impact. I’ve worked across data platforms, " +
              "microservices, and user-facing products using Python, FastAPI, React, and cloud technologies. " +
              "Outside of code, I’m curious about psychology, AI, and photography. " +
              "You can learn more about me in the About section of my website.",
            },
            "education.txt": {
              name: "education.txt",
              type: "file",
              content:
                "Education:\n\nHBSc in Computer Science Specialization with Co-op\nUniversity of Toronto\n2018 - 2023",
            },
            "skills.txt": {
              name: "skills.txt",
              type: "file",
              content:
                "Languages:\n" +
                "  Python, JavaScript, TypeScript, SQL, HTML, CSS, C, C++, Java, Shell, MATLAB, Scheme, Haskell\n\n" +
                "Frameworks & Libraries:\n" +
                "  FastAPI, Flask, Django, SQLAlchemy, Next.js, React, Node.js, Express, TailwindCSS, MUI, Bootstrap\n\n" +
                "Databases and Data Tools:\n" +
                "  PostgreSQL, MySQL, MongoDB (NoSQL), pandas, NumPy, Scikit-learn, Redshift, BigQuery, Apache Spark, Apache Kafka\n\n" +
                "DevOps & Tools:\n" +
                "  Git, Docker, Kubernetes, ArgoCD, Apache Airflow, AWS, Google Cloud, Datadog"
            },
            "projects.txt": {
              name: "projects.txt",
              type: "file",
              content:
                "BikEtail:\n" +
                "- A full-stack online marketplace for urban mobility devices that facilitates buying, selling, and renting\n" +
                "- Supports authentication, multiple user types and access levels, and item reviews\n" +
                "- Technologies used: HTML, CSS, TypeScript, React, Node.js, Express, MongoDB\n\n" +
                "LyriChord.js:\n" +
                "- VanillaJS library for displaying lyrics with guitar chords in a simple, readable format on the DOM\n" +
                "- Technologies used: JavaScript",
            },
            "contact.txt": {
              name: "contact.txt",
              type: "file",
              content: "Email: arinamomajjed@gmail.com\nLinkedIn: linkedin.com/in/arinamomajjed\nGitHub: github.com/importarina",
            },
            blog: {
              name: "blog",
              type: "directory",
              children: {
                "Coming soon!": {
                  name: "Coming soon!",
                  type: "file",
                  content: "Coming soon!",
                },
              },
            },
            "cv.pdf": {
              name: "cv.pdf",
              type: "file",
              // TODO: add link to CV
              content: "[This is a PDF file that would contain my CV.]\n\nView/download at ",
            },
          },
        },
      },
    },
  },
}
