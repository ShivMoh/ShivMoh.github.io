import type { Metadata } from "next";
import { Link } from "@mui/material"
import Organization from "./components/organization"

export const metadata: Metadata = {
  title: "Experience | Shivesh Mohamed",
  description: "My professional experience and involvement with the University of Guyana, robotics club, and game development communities.",
  openGraph: {
    title: "Experience | Shivesh Mohamed",
    description: "Professional experience with University of Guyana, robotics club, and game development.",
    url: "https://shivmoh.github.io/organizations",
    type: "website",
  },
};

export default function Page() {
  const organizations = [
    {
      title : "Guyana Lands and Surveys Commission (GLSC)",
      role: "Software Developer",
      description: "I currently work as a Software Developer at the Guyana Lands and Surveys Commission, where I build software solutions and work extensively with geospatial data. As part of my role I am currently receiving training in remote sensing using Google Earth Engine, expanding my capabilities in earth observation and spatial analysis.",
      image: "/glsc_logo.jpeg",
      imageDescription: "",
      links: []
    },
    {
      title : "Food and Agriculture Organization (FAO)",
      role: "National Software Solutions Developer",
      description: "I worked as a National Software Solutions Developer towards the Sustainable Land Development and Management (SLDM) project. In this role I developed software solutions and was exposed to working with geospatial data in support of the project's land management objectives.",
      image: "/fao_logo.jpeg",
      imageDescription: "",
      links: []
    },
    {
      title : "University of Guyana PACE",
      role: "Assistant Technical Officer",
      description: "A department under the University of Guyana that primarily focuses on event planning ranging from budgeting to technology catering. Under the department I serve as the Assistant Technical Officer responsible for custom web solutions, website management and research on technology recommendations to serve the departments needs",
      image: "/ug.png",
      imageDescription: "",
      links: []
    },
    {
      title : "University of Guyana Robotics Club (UGRC)", 
      role: "Key Personnel",
      description: "The University of Guyana Robotics Club (UGRC) is a makerspace for creating robotic projects. I've been a member for about 3 years, serving as key personnel for about 2 of those years. I've been exposed to various technologies such as Rasberry PIs, arduinos, 3d printing and so much more! I would've also helped plan and organized events as part of my role as Key Personnel.",
      image: "/ugrc.png",
      imageDescription: "",
      links: []
    },
    {
      title : "Game Development Club", 
      role: "member",
      description: "I've been an active member from the inception of the club. I would've helped plan workshops, develop games and participate in dicussions around game design. I've also made my own personal game development projects while a member of the club",
      image: "/ug_game_dev.jpeg",
      imageDescription: "",
      links: [],
    },
  ] 

  return <>
    <div style={{
      marginTop: '5vh',
      marginBottom: '5vh',
      width: '100%', 
      display: 'flex', 
      flexDirection:'column', 
      justifyContent: 'center',
      alignItems: 'center'
      }}>
    </div>
    {organizations.map((organization : any) => {
      return <Organization 
        key={organization.title}
        title={organization.title} 
        description={organization.description}
        image={organization.image}
        imageDescription={organization.imageDescription}
        links={organization.links}
      />
    })

    } 
  </> 
}