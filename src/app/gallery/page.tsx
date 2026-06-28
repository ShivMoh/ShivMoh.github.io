import type { Metadata } from "next";
import { Box, ImageList, ImageListItem } from "@mui/material";
import VideoScroll from "../components/video-scroll";

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

  const itemData = [
    {
      img: 'girls_in_tech.jpeg',
      title: 'Girls In Tech Event'
    },
    {
      img: 'arduino.jpeg',
      title: 'Books',
    },
    {
      img: 'innovation_challenge.jpg',
      title: 'Blinds',
    },
    {
      img: 'innovation_opening.jpg',
      title: 'Blinds',
    },
    {
      img: 'science_fair.jpeg',
      title: 'Sink',
    },
    {
      img: 'lcoy_speaking.jpeg',
      title: 'Kitchen',
    },
    {
      img: 'career_day.jpeg',
      title: 'Chairs',
    },
    {
      img: 'award_ceremony.jpeg',
      title: 'Laptop',
    },
    {
      img: 'csod.jpeg',
      title: 'Doors',
    },
    {
      img: 'ai_4d_event.jpeg',
      title: 'AI For 4D Event',
    },
    {
      img: 'fao_sldm_closing.jpeg',
      title: 'Sustainable Lands, Development and Management Project',
    },
    {
      img: 'career_day_2024.jpeg',
      title: 'Career Day 2024',
    },
    {
      img: 'social_robotics_2024.jpeg',
      title: 'Social Robotics Workshop 2024',
    },
    {
      img: '3d_printing_workshop.jpg',
      title: '3D Printing Workshop',
    },
    {
      img: 'social_robotics_workshop.jpg',
      title: 'Social Robotics Workshop'
    },
    {
      img: 'lcoy_panel.jpg',
      title: 'Me at a panel',
    },
    {
      img: 'me_club_something.jpeg',
      title: 'Me at the club doing something',
    },

    {
      img: 'me_club_planning.jpeg',
      title: 'Me at the club helping with planning',
    },
  ];

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
