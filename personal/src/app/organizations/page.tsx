
import { Link } from "@mui/material"
import Organization from "./components/organization"

export default function Page() {
  const organizations = [
    {
      title : "University of PACE", 
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
      description: "I've been an active member from the inception of the club. I would've helped plan workshops, develop games and participate in dicussions around game design. I've also made my own personal gamde development projects while a member of the club",
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