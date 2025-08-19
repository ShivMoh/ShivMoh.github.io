import { Link } from "@mui/material"
import Project from "./components/project"

export default function Page() {
  const projects = [
    {
      title : "Local ITS", 
      description: "A Local ITS, designed to work offline with hugging face models, created as a requirement for conducting inference benchmarks for a final year research project titled 'Local and Personalized Large Language Models in Intelligent Tutoring Systems' conducted at the University of Guyana towards the Bachelor's in Computer Science",
      image: "/its.png",
      imageDescription: "The interface of the ITS Program",
      links: [
        {
          title: "Local ITS Repo",
          link: "https://github.com/ShivMoh/Local_ITS"
        },
        {
          title: "Local Bench Repo",
          link: "https://github.com/ShivMoh/Local_Bench"
        },
        {
          title: "Final Presentation Slide Deck",
          link: "https://docs.google.com/presentation/d/1m4u3pO9jB-ikF3fNfeMMytI712XBk209nqp51yk-psY/edit?usp=sharing"
        }
      ]   
    },
    {
      title : "Traffic Monitoring", 
      description: "A side project designed to utilise computer vision and mapping technologies to translate real world coordinates from CCTV camera footage to their equivalent lat/long coordinates on a map. The projects use a finetuned YOLO model for its vision capabalities and leaflet js for the mapping tiles. Web Sockets were utilised to communicate between the various components in real time via UDP packages.",
      image: "/traffic.png",
      imageDescription: "The Map Translation in action",
      links: [
        {
          title: "Documentation",
          link: "https://shivmoh.github.io/Traffic_Monitoring/map_translation/"
        },
        {
          title: "Traffic Monitoring Repo",
          link: "https://github.com/ShivMoh/Traffic_Monitoring"
        }
      ]
    },
    {
      title : "Face Recongition", 
      description: "A simple python based application made to experiment and try out different face recognition techniques and algorithms. At current, it utilises two distinct face classification algorithms. One being the default haar classifier from open-cv and the other being a Facenet classifier implemented in pytorch.",
      image: "/face.png",
      imageDescription: "Recongizing who I am with a provided confidence rating :)",
      links: [
        {
          title: "Face Recongition Repo",
          link: "https://github.com/ShivMoh/SM_Face_Recongnizer"
        }
      ]
    },
    {
      title : "OpenGL Model of Guyana National Stadium", 
      description: "A model of the National Providence Stadium of Guyana. The project is implemented using OpenGL, a low level graphics cross platform API implemented in c++. It introduces various concepts about graphics programming such as bling-phong lighting, batch rending, vertex construction from file formats, animations and more! The thing I most enjoyed about this project were the specifics that went into rendering the grass and how impactful drawing thousands of planes is on performance.",
      image: "/stadium.png",
      imageDescription: "Looking around the world",
      links: [
        {
          title: "Project Repo",
          link: "https://github.com/Xenoph3n/CSE3200_Semester_Project"
        },
        {
          title: "Presentation",
          link: "https://www.youtube.com/watch?v=bYoxwzDbRSM"
        }
      ]
    }
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
      <Link target="_blank" href="https://github.com/ShivMoh">See All My Publicly Available Projects</Link>
    </div>
    {projects.map((project : any) => {
      return <Project 
        key={project.title}
        title={project.title} 
        description={project.description}
        image={project.image}
        imageDescription={project.imageDescription}
        links={project.links}
      />
    })

    } 
  </> 
}
