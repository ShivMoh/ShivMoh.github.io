import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import "./landing.scss";
import Nav from "./components/nav";
import BackgroundFX from "./components/background-fx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Shivesh Mohamed | Software Developer & Engineer",
  description: "Shivesh Mohamed - Full-stack developer passionate about web development, machine learning, and game development. Explore my portfolio, projects, and work experience.",
  keywords: ["software developer", "web developer", "machine learning", "full-stack", "React", "Next.js", "Python", "C++", "game development", "Guyana"],
  metadataBase: new URL("https://shivmoh.github.io"),
  alternates: {
    canonical: "https://shivmoh.github.io",
  },
  openGraph: {
    title: "Shivesh Mohamed | Software Developer & Engineer",
    description: "Full-stack developer passionate about web development, machine learning, and game development.",
    type: "website",
    url: "https://shivmoh.github.io",
    siteName: "Shivesh Mohamed",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivesh Mohamed | Software Developer & Engineer",
    description: "Full-stack developer passionate about web development, machine learning, and game development.",
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shivesh Mohamed",
  url: "https://shivmoh.github.io",
  jobTitle: "Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Guyana Lands and Survey Commission",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Georgetown",
    addressRegion: "Demerara-Mahaica",
    addressCountry: "GY",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Guyana",
  },
  knowsAbout: [
    "Web Development", "Machine Learning", "Deep Learning",
    "Geospatial Systems", "Python", "TypeScript", "Next.js",
  ],
  sameAs: [
    "https://www.linkedin.com/in/shivesh-mohamed/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} landing-root`} >
        {/*<BackgroundFX />*/}
        <Nav />
        {children}
      </body>
    </html>
  );
}
