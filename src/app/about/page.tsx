import type { Metadata } from "next";
import "./about.scss"
import AboutContent from "./about-content";

export const metadata: Metadata = {
  title: "About Me | Shivesh Mohamed",
  description: "Learn about Shivesh Mohamed - a passionate full-stack developer with expertise in web development, machine learning, open-source technologies, and robotics.",
  openGraph: {
    title: "About Me | Shivesh Mohamed",
    description: "Full-stack developer with expertise in web development, machine learning, and robotics.",
    url: "https://shivmoh.github.io/about",
    type: "website",
  },
};

export default function Page() {
  return <AboutContent />;
}
