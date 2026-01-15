import type { Metadata } from "next";
import TerminalContent from "./terminal-content";

export const metadata: Metadata = {
  title: "Terminal | Shivesh Mohamed",
  description: "Interactive terminal experience showcasing my work and projects.",
  openGraph: {
    title: "Terminal | Shivesh Mohamed",
    description: "Interactive terminal experience.",
    url: "https://shivmoh.github.io/terminal",
    type: "website",
  },
};

export default function Page() {
  return <TerminalContent />;
}
