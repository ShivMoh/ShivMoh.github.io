import type { Metadata } from "next";
import Project from "../../projects/components/project";
import '../../projects/components/project.scss';

export const metadata: Metadata = {
  title: "AI & Research | Shivesh Mohamed",
  description: "Artificial intelligence and research projects by Shivesh Mohamed — deep learning, efficient ML, and applied AI.",
};

const projects = [
  {
    title: "Local ITS",
    description:
      "A research project conducted at the University of Guyana towards the Bachelor's in Computer Science, titled 'Local and Personalized Large Language Models in Intelligent Tutoring Systems'. The core deliverable was a locally-running Intelligent Tutoring System that operates entirely offline using Hugging Face models — built specifically to serve as the testbed for conducting inference benchmarks across different LLMs. The research explored whether locally-hosted, personalised LLMs could be a viable and cost-effective alternative to cloud-based tutoring systems, with a focus on performance in resource-constrained environments.",
    images: [
      { src: "/its.png", description: "The interface of the ITS program" },
      { src: "/its_demo_1.mp4", description: "First prototype" },
      { src: "/its_demo_2.mp4", description: "Final prototype" },
    ],
    tags: ["finished", "software", "AI"],
    links: [
      { title: "Local ITS Repo", link: "https://github.com/ShivMoh/Local_ITS" },
      { title: "Local Bench Repo", link: "https://github.com/ShivMoh/Local_Bench" },
      { title: "Final Presentation Slide Deck", link: "https://docs.google.com/presentation/d/1m4u3pO9jB-ikF3fNfeMMytI712XBk209nqp51yk-psY/edit?usp=sharing" },
    ],
  },
  {
    title: "Traffic Monitoring",
    description:
      "A side project exploring the application of computer vision and mapping technologies to translate real-world coordinates from CCTV camera footage into their equivalent lat/long positions on a map. The project uses a fine-tuned YOLO model for vehicle detection and Leaflet.js for map tile rendering. WebSockets handle real-time communication between components via UDP packets, allowing detections to be streamed and plotted live.",
    images: [
      { src: "/traffic.png", description: "Map translation in action" },
      { src: "/initial_translation.mp4", description: "Map translation in action" },
      { src: "/yolo_native.mp4", description: "YOLO native detection" },
    ],
    tags: ["software", "AI"],
    links: [
      { title: "Documentation", link: "https://shivmoh.github.io/Traffic_Monitoring/map_translation/" },
      { title: "Traffic Monitoring Repo", link: "https://github.com/ShivMoh/Traffic_Monitoring" },
    ],
  },
  {
    title: "Virtual Assistant",
    description:
      "A personal assistant that brings together several machine learning techniques into a single interactive system. It uses a large language model to drive natural conversation flow, a CNN for real-time emotion detection, and face detection for user identification — supporting both a Haar classifier and a FaceNet-based approach. Together, these allow the assistant to recognise who it's speaking with, gauge their emotional state, and hold a contextual conversation.",
    images: [
      { src: "/placeholder.svg", description: "Virtual Assistant" },
    ],
    tags: ["software", "AI"],
    links: [
      { title: "Virtual Assistant Repo", link: "https://github.com/ShivMoh/Virtual_Assistant" },
    ],
  },
];

export default function AIResearchPage() {
  return (
    <div>
      <div
        style={{
          margin: "6vh 0 5vh",
          padding: "0 18vw",
          textAlign: "center",
          color: "var(--ink-muted)",
          lineHeight: 1.75,
          fontSize: "16px",
          fontWeight: 600,
        }}
      >
        <h1
          style={{
            fontSize: "40px",
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-1px",
            marginBottom: "16px",
          }}
        >
          Artificial Intelligence &amp; Research
        </h1>
        <p>
          AI is the area I find myself thinking about most. I&apos;m particularly drawn to efficient deep
          learning — the challenge of making models smaller, faster, and viable in the real world rather
          than just on paper. Most of the work here sits at the intersection of applied ML and software
          engineering: systems that actually run, produce outputs, and have to contend with real
          constraints like compute, latency, and deployment. The research project was a formal academic
          exercise; the others are personal explorations driven by curiosity.
        </p>
      </div>

      {projects.map((project) => (
        <Project
          key={project.title}
          title={project.title}
          description={project.description}
          images={project.images}
          tags={project.tags}
          links={project.links}
        />
      ))}
    </div>
  );
}
