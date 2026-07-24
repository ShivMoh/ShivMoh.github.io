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
            I'm a software engineer interested in deep learning and web development. I like learning new things and exploring
            new domains. Software being widely applicable to all fields allows me to explore different domains from that perspective,
            which is why I think it's neat. I'm a builder and I like learning about things through those lens. Professionally,
            I'm a backend engineer (though I often end up doing both frontend and backend due to small team sizes). I've also
            dabled in game development and machine learning (mostly deep learning).

            <br /><br />

            <h2><i>"Its not about whether its impossible or not, I'm doing it because I want to" </i>- Monkey D Luffy, Future King of the Pirates</h2>
          </p>
          <div className="cta-row">
            <Link href="/gallery" className="text-link">View Gallery</Link>
            <a
              href="https://www.linkedin.com/in/shivesh-mohamed-95981b234/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >LinkedIn ↗</a>
            <a
              href="https://github.com/ShivMoh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >GitHub ↗</a>
            <a
              href="https://www.imatakatechnologies.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >ImatakaTech</a>
          </div>
        </div>
      </div>
    </section>
  );
}

