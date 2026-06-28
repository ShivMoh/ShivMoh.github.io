import type { Metadata } from "next";
import { Link } from "@mui/material"
import ProjectsClient from "./components/projects-client"

export const metadata: Metadata = {
  title: "Projects | Shivesh Mohamed",
  description: "Showcase of my technical projects including Local ITS, Traffic Monitoring, and other full-stack development projects using React, Python, and machine learning.",
  keywords: ["projects", "portfolio", "ITS", "machine learning", "computer vision", "web development", "hardware"],
  openGraph: {
    title: "Projects | Shivesh Mohamed",
    description: "Technical projects including Local ITS, Traffic Monitoring, and full-stack development.",
    url: "https://shivmoh.github.io/projects",
    type: "website",
  },
};

export default function Page() {
  const projects = [
    {
      title: "Local ITS",
      description: "A Local ITS, designed to work offline with hugging face models, created as a requirement for conducting inference benchmarks for a final year research project titled 'Local and Personalized Large Language Models in Intelligent Tutoring Systems' conducted at the University of Guyana towards the Bachelor's in Computer Science",
      images: [
        { src: "/its.png", description: "The interface of the ITS Program" },
        { src: "/its_demo_1.mp4", description: "First prototype" },
        { src: "/its_demo_2.mp4", description: "Final Prototype" }
      ],
      tags: ["finished", "software", "AI"],
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
      title: "Traffic Monitoring",
      description: "A side project designed to utilise computer vision and mapping technologies to translate real world coordinates from CCTV camera footage to their equivalent lat/long coordinates on a map. The projects use a finetuned YOLO model for its vision capabalities and leaflet js for the mapping tiles. Web Sockets were utilised to communicate between the various components in real time via UDP packages.",
      images: [
        { src: "/traffic.png", description: "The Map Translation in action" },
        { src: "/initial_translation.mp4", description: "The Map translation in action" },
        { src: "/yolo_native.mp4", description: "YoLO native translation" },
      ],
      tags: ["software", "AI", "web_dev"],
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
      title: "Virtual Assistant",
      description: "A personal assistant that brings together several machine learning techniques into a single interactive system. It uses a large language model to drive natural conversation flow, a CNN for real time emotion detection, and face detection for user identification (using either a haar classifier or a Facenet based approach). Together these allow the assistant to recognise who it's speaking with, gauge their emotional state, and hold a contextual conversation.",
      images: [
        { src: "/face.png", description: "Virtual Assistant" }
      ],
      tags: ["software", "AI"],
      links: [
        {
          title: "Virtual Assistant Repo",
          link: "https://github.com/ShivMoh/Virtual_Assistant"
        }
      ]
    },
    {
      title: "Face Recongition",
      description: "A simple python based application made to experiment and try out different face recognition techniques and algorithms. At current, it utilises two distinct face classification algorithms. One being the default haar classifier from open-cv and the other being a Facenet classifier implemented in pytorch.",
      images: [
        { src: "/face.png", description: "Recongizing who I am with a provided confidence rating :)" },
        { src: "/face.png", description: "Recongizing who I am with a provided confidence rating :)" }
      ],
      tags: ["software", "AI"],
      links: [
        {
          title: "Face Recongition Repo",
          link: "https://github.com/ShivMoh/SM_Face_Recongnizer"
        }
      ]
    },
    {
      title: "OpenGL Model of Guyana National Stadium",
      description: "A model of the National Providence Stadium of Guyana. The project is implemented using OpenGL, a low level graphics cross platform API implemented in c++. It introduces various concepts about graphics programming such as bling-phong lighting, batch rending, vertex construction from file formats, animations and more! The thing I most enjoyed about this project were the specifics that went into rendering the grass and how impactful drawing thousands of planes is on performance.",
      images: [
        { src: "/stadium.png", description: "Looking around the world" }
      ],
      tags: ["finished", "software", "game_dev"],
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
    },
    {
      title: "ELEGOO Arduino Car",
      description: `
        Exploring the ELEGOO Arduino Car. Currently looking to rework the code so I can implement my own
        computer vision models for things like path planning. Not sure how far I'll go with this, fun so far :)
      `,
      images: [
        { src: "/robot_car/robot_car_completed.jpeg", description: "Looking around the world" },
        { src: "/robot_car/robot_car_supplies.jpeg", description: "Looking around the world" },
        { src: "/robot_car/robot_car_supplies_2.jpeg", description: "Looking around the world" },
        { src: "/robot_car/testing.mp4", description: "Looking around the world" },
        { src: "/robot_car/testing_2.mp4", description: "Looking around the world" }
      ],
      tags: ["in-progress", "hardware"],
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
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Link target="_blank" href="https://github.com/ShivMoh">See All My Publicly Available Projects</Link>
    </div>
    <ProjectsClient projects={projects} />
  </>
}
