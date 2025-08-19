import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function MasonryImageList() {
  return (
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
  );
}

const itemData = [
  {
    img: 'lcoy_panel.jpg',
    title: 'Me at a panel',
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
];