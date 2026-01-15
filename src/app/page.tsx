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
            <p className="pitch">Building high-performance systems, delightful interfaces, and intelligent solutions. Passionate about web development, machine learning, game development, and exploring new frontiers in tech.</p>

            <div className="cta-row">
              <Link href="/gallery" className="btn primary">View Gallery</Link>
              <Link href="/projects" className="btn ghost">View Projects</Link>
            </div>

            <div className="skill-list">
              <span className="skill">Neovim</span>
              <span className="skill">React / Next.js</span>
              <span className="skill">Python / ML</span>
              <span className="skill">C++ / Game Dev</span>
            </div>
          </div>
        </div>
      </section>
  );
}

