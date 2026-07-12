import type { Metadata } from "next";
import Project from "../../projects/components/project";
import '../../projects/components/project.scss';

export const metadata: Metadata = {
  title: "Web Development | Shivesh Mohamed",
  description: "Professional web development work by Shivesh Mohamed — platforms, GIS systems, and freelance projects.",
};

const projects = [
  {
    title: "UGRecruit",
    description:
      "A recruitment platform built while serving as Assistant Technical Officer at the University of Guyana under the PACE (Philanthropy, Alumni & Civic Engagement) department. UGRecruit connects students with full-time, part-time, and internship opportunities — giving employers a direct line to the UG student body and giving students a centralised place to find work. I was the lead developer on the platform from the ground up, handling everything from the database design and backend logic to the frontend interface.",
    images: [
      { src: "/ug.png", description: "University of Guyana" },
    ],
    tags: ["finished", "web_dev"],
    links: [
      { title: "Visit UGRecruit", link: "https://ugrecruit.uog.edu.gy/" },
    ],
  },
  {
    title: "FleetSpec",
    description:
      "A freelance project developed under Imataka Tech. FleetSpec is a fleet management platform designed to help organisations track and manage their vehicle assets. The work involved building out core fleet-facing features, and collaborating closely with the client to shape the product around their operational needs.",
    images: [
      { src: "/placeholder.svg", description: "FleetSpec" },
    ],
    tags: ["web_dev"],
    links: [
      { title: "Visit FleetSpec", link: "https://fleetspec.online/" },
    ],
  },
  {
    title: "NGLMS & PlanSearch — GLSC / FAO",
    description:
      "Two systems I worked on personally during my time at the Guyana Lands and Survey Commission (GLSC) and under the FAO Sustainable Lands and Development Project. The Next Generation Land Management System (NGLMS) is an internal Land Administration and GIS platform designed to modernise and streamline how land records are managed across the country — covering spatial data, document workflows, and secure access controls. PlanSearch is the public-facing counterpart: an external tool that allows citizens and stakeholders to query and view approved land plans and related spatial data. I contributed features across both systems, including dynamic spatial data querying, map-based interfaces, and security protocols aligned with government policy.",
    images: [
      { src: "/glsc_logo.jpeg", description: "Guyana Lands and Survey Commission" },
    ],
    tags: ["web_dev"],
    links: [
      { title: "Visit PlanSearch", link: "https://plans.glsc.gov.gy/" },
    ],
  },
];

export default function WebDevelopmentPage() {
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
          Web Development
        </h1>
        <p>
          Web development has been the backbone of most of my professional work. I enjoy the full
          breadth of it — from data modelling and backend logic to building interfaces people actually
          want to use. The projects here represent real systems built for real organisations: a student
          recruitment platform for the University of Guyana, a fleet management tool developed
          freelance, and land administration systems built for the government. Each one came with its
          own constraints, stakeholders, and domain knowledge to absorb — which is exactly the kind of
          work I find most interesting.
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
