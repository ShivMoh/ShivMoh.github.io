import type { Metadata } from "next";
import { Box, ImageList, ImageListItem } from "@mui/material";
import VideoScroll from "../components/video-scroll";
// Edited from /private/studio (Gallery tab).
import itemData from "./gallery.json";

export const metadata: Metadata = {
  title: "Gallery | Shivesh Mohamed",
  description: "Photo gallery showcasing my experiences, projects, and involvement in tech events, robotics, and game development.",
  openGraph: {
    title: "Gallery | Shivesh Mohamed",
    description: "Photo gallery showcasing experiences in tech events, robotics, and game development.",
    url: "https://shivmoh.github.io/gallery",
    type: "website",
  },
};

export default function Page() {
  return <>
    <VideoScroll></VideoScroll>
    <Box mt={'2vh'}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>

  </>
}
