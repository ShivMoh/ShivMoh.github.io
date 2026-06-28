"use client"
import { useState, useMemo } from "react";
import { Chip, Box } from "@mui/material";
import Project from "./project";

const ALL_TAGS = ["finished", "abandoned", "hardware", "software", "AI", "web_dev", "game_dev"];

const chipSx = {
  cursor: "pointer",
  "&.MuiChip-outlined": {
    color: "var(--foreground)",
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  "&.MuiChip-outlined:hover": {
    borderColor: "var(--foreground)",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
};

export default function ProjectsClient({ projects }: any) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return projects;
    return projects.filter((project: any) =>
      selectedTags.every((tag) => project.tags.includes(tag))
    );
  }, [projects, selectedTags]);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClearAll = () => {
    setSelectedTags([]);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          justifyContent: "center",
          marginY: 4,
          paddingX: 2,
        }}
      >
        <Chip
          label="All"
          onClick={handleClearAll}
          variant={selectedTags.length === 0 ? "filled" : "outlined"}
          color={selectedTags.length === 0 ? "primary" : "default"}
          sx={chipSx}
        />
        {ALL_TAGS.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onClick={() => handleTagClick(tag)}
            variant={selectedTags.includes(tag) ? "filled" : "outlined"}
            color={selectedTags.includes(tag) ? "primary" : "default"}
            sx={chipSx}
          />
        ))}
      </Box>

      {filteredProjects.map((project: any) => (
        <Project
          key={project.title}
          title={project.title}
          description={project.description}
          images={project.images}
          tags={project.tags}
          links={project.links}
        />
      ))}
    </>
  );
}
