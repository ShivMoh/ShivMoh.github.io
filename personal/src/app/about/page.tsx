"use client"
import { motion } from "motion/react";
import "./about.scss"

export default function Page() {
  return <>
    <section className="product-section" 
    style={{ 
      marginTop: '2vh',
      color: '#eeeeee' 
    }}>
      <div className="left">
        <h1
          className="product-title"
          aria-label="This is the heading of the product being offfered">About Me</h1>
        <p
          className="product-description"
          aria-label="This is a description of the product or service being offered">
          {"Hi I'm Shivesh. I'm a passionate full-stack developer with an interest in web development and machine learning. I've worked across several web technologies inclusive of .NET, php, Laravel, and so much more. I'm also dwidled in machine learning, particularly focusing on how you could apply real machine learning to solve real world challenges in application developing such as traffic monitoring, face recognition and low-cost solutions of Intelligent Tutoring Systems"}
        </p>
        <p
          className="product-description"
          aria-label="This is a description of the product or service being offered">
          {"Some other things about me. I like open source technologies. I'm a avid Linux enthusiastic and a neovim user (I use vim btw). I'm still learning a lot about those technologies but I hope to get better. I've been a part of University of Robotics club for about 3 years, serving as Key Personnel for about 2 of those years and gaining exposure to various technologies such as RasberryPIs and Arduino - really small computers basically. I've also been a part of the Game development club where I would've taken part in their ongoing development of their in-house game and having developed a showcase project for Careerday. One day I might finish my own game, who knows!"}
          
        </p>
      </div>
      <motion.div
        initial={{ y: '-20vw', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'linear' }}
        viewport={{ once: true, amount: 0.2 }}
        className="right">
        <figure className="image-container">
          <img src="/arduino.jpeg" alt="This is an image showcasing the service" />
          <figcaption aria-label="Description of the product image">Arduino Project Budilding</figcaption>
        </figure>
      </motion.div>
    </section>
  </>
}
