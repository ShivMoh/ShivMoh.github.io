"use client";

import { Box, Typography } from "@mui/material";
import { useEffect, useRef } from "react";

export default function VideoScroll() {
  const scrollRef = useRef(null);

  const videoList = [
    {
      title: "Game Dev Vlog",
      src: "https://www.youtube.com/embed/eg_vl0YI3qk",
      description:
        "A behind-the-scenes look at my game development journey, tools, and creative process."
    },
    {
      title: "Graphics Semester Project",
      src: "https://www.youtube.com/embed/bYoxwzDbRSM",
      description:
        "A university graphics project showcasing rendering techniques and visual effects."
    },
    {
      title: "AI Semester Project",
      src: "https://www.youtube.com/embed/BnFvBjLtBCo",
      description:
        "An AI-focused semester project exploring intelligent systems and practical applications."
    },
    {
      title: "Intelligent Tutoring System",
      src: "https://www.youtube.com/embed/8JWCvuR7W6A?si=wxtOPH5--LXtFtfe",
      description:
        "A demonstration of an intelligent tutoring system designed to utilise low cost, open source models for local deployment."
    }
  ];

  // Enable arrow-key horizontal scrolling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!scrollRef.current) return;

      if (e.key === "ArrowRight") {
        scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
      }
      if (e.key === "ArrowLeft") {
        scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Box
      ref={scrollRef}
      sx={{
        display: "flex",
        gap: 4,
        overflowX: "auto",
        padding: 2,
        scrollbarWidth: "none",          // Firefox
        msOverflowStyle: "none",          // IE / Edge
        "&::-webkit-scrollbar": {
          display: "none"                // Chrome / Safari
        },
        scrollBehavior: "smooth",
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#201818ff",
          borderRadius: 4
        }
      }}
    >
      {videoList.map((video, index) => (
        <Box
          key={index}
          sx={{
            minWidth: 560,
            backgroundColor: "#111",
            borderRadius: 3,
            padding: 2,
            boxShadow: 3
          }}
        >
          {/* Title */}
          <Typography
            variant="h6"
            sx={{ color: "white", mb: 1, fontWeight: 600 }}
          >
            {video.title}
          </Typography>

          {/* Video */}
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden"
            }}
          >
            <iframe
              width="560"
              height="315"
              src={video.src}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{ color: "#ccc", mt: 1.5 }}
          >
            {video.description}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
