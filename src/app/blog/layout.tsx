import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Shivesh Mohamed",
  description: "Articles and insights about software development, web development, machine learning, and technology.",
  keywords: ["blog", "articles", "tech", "web development", "software engineering"],
  openGraph: {
    title: "Blog | Shivesh Mohamed",
    description: "Articles and insights about software development and technology.",
    url: "https://shivmoh.github.io/blog",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
