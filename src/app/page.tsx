import type { Metadata } from "next";
import Nav from './components/nav';
import Link from 'next/link';
import './landing.scss';

export const metadata: Metadata = {
  title: "Shivesh Mohamed | Software Developer & Engineer",
  description: "Shivesh Mohamed - Full-stack developer passionate about web development, machine learning, and game development. Building high-performance systems and delightful interfaces.",
  openGraph: {
    title: "Shivesh Mohamed | Software Developer & Engineer",
    description: "Full-stack developer passionate about web development, machine learning, and game development.",
    url: "https://shivmoh.github.io",
    type: "website",
  },
};

export default function Page() {
  return (
    <section className="landing-hero">
      <div className="hero-content">
        <div className="content-wrap">
          <h1 className="name">Shivesh Mohamed</h1>
          <p className="role">Software Developer & Engineer</p>
          <p className="pitch">
            I'm a software engineer interested in deep learning and web development. I like learning new things and exploring new domains. Software being widely applicable to all fields allows me to explore different domains from that perspective, which is why I think it's neat. I've also recently become fascinated by the field of what I've come to know as 'Efficient Deep Learning'.  Learning how to use deep learning to have computers solve complex, unstructured tasks that otherwise would be difficult for conventional algorithms reveals a whole new world of tools for solving problems. But in the real world, compute is limited and costly which makes it important for deployment to reduce model footprints, hence the 'efficient' part of 'efficient deep learning'. It's a sub-field that takes into consideration real-world deployment and use which is likely why I'm drawn to it. I don't just want AI to become smarter, I'd like for it to be cost-effective and feasible as well.
          </p>
          <br />
          <p className="pitch">
            Currently reading <a href="https://efficientdlbook.com/">Efficient deep learning</a>. as well as  
            <a href="https://nnfs.io/">Neural networks from scratch</a> whilest building my own little neural network project where I hope to implement some of those efficient techniques to better understand them.
          </p>
          <br />

          <div className="cta-row">
            <Link href="/gallery" className="text-link">View Gallery</Link>
            <Link href="/projects" className="text-link">View Projects</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

