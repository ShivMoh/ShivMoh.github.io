import type { Metadata } from "next";
import Project from "../../projects/components/project";
import '../../projects/components/project.scss';

export const metadata: Metadata = {
  title: "Game Development | Shivesh Mohamed",
  description: "Game development projects by Shivesh Mohamed — 2D games, RPGs, platformers, and graphics programming.",
};

const projects = [
  {
    title: "OpenGL Model of Guyana National Stadium",
    description:
      "A 3D model of the National Providence Stadium of Guyana, implemented in OpenGL — a low-level cross-platform graphics API written in C++. The project covers a range of graphics programming fundamentals: Blinn-Phong lighting, batch rendering, loading vertex data from file formats, and animations. One of the most interesting aspects was rendering the grass — drawing thousands of planes and seeing firsthand how that kind of geometry impacts performance was a great lesson in why graphics optimisation matters.",
    images: [
      { src: "/stadium.png", description: "Looking around the stadium" },
    ],
    tags: ["finished", "software", "game_dev"],
    links: [
      { title: "Project Repo", link: "https://github.com/Xenoph3n/CSE3200_Semester_Project" },
      { title: "Presentation", link: "https://www.youtube.com/watch?v=bYoxwzDbRSM" },
    ],
  },
  {
    title: "Fish Game",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. This was one of the earlier experiments in building a fully playable game loop — handling player input, collision detection, and a simple scoring system from the ground up.",
    images: [
      { src: "/game_dev/fish_game.png", description: "Fish Game screenshot" },
    ],
    tags: ["finished", "game_dev"],
    links: [],
  },
  {
    title: "Fire Emblem Fan Game",
    description:
      "A fan-made tactical RPG inspired by Fire Emblem. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. The project covers turn-based grid movement, unit stat systems, and a basic combat engine — all implemented from scratch.",
    images: [
      { src: "/game_dev/fire_emblem_game.png", description: "Fire Emblem fan game screenshot" },
    ],
    tags: ["in-progress", "game_dev"],
    links: [],
  },
  {
    title: "First Platformer",
    description:
      "The very first platformer I built — a foundational exercise in game development. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Covers the basics of character physics, jump arcs, tilemap collision, and level design.",
    images: [
      { src: "/game_dev/first_platformer.png", description: "First platformer screenshot" },
    ],
    tags: ["finished", "game_dev"],
    links: [],
  },
];

export default function GameDevelopmentPage() {
  return (
    <div>
      <div
        style={{
          margin: "6vh 0 5vh",
          padding: "0 18vw",
          textAlign: "center",
          color: "var(--ink-muted)",
          lineHeight: 1.75,
          fontSize: "16px",
          fontWeight: 600,
        }}
      >
        <h1
          style={{
            fontSize: "40px",
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-1px",
            marginBottom: "16px",
          }}
        >
          Game Development
        </h1>
        <p>
          Game development was one of the first things that got me seriously interested in software.
          There&apos;s something uniquely satisfying about building an interactive world from scratch —
          where physics, art, logic, and user experience all have to come together at once.
          I&apos;ve dabbled across 2D platformers, tactical RPGs, and low-level graphics programming,
          and I find the constraint of making something <em>feel</em> good just as interesting as making
          it work. These aren&apos;t polished commercial products — they&apos;re explorations, experiments,
          and learning milestones that I&apos;m proud of nonetheless.
        </p>
      </div>

      {projects.map((project) => (
        <Project
          key={project.title}
          title={project.title}
          description={project.description}
          images={project.images}
          tags={project.tags}
          links={project.links}
        />
      ))}
    </div>
  );
}
