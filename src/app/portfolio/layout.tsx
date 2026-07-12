import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Shivesh Mohamed",
  description: "Portfolio of projects by Shivesh Mohamed across web development, game development, hardware, and AI.",
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
