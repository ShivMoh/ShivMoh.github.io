"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import VideoScroll from './components/video-scroll';
import { title } from 'process';
import './home.scss';
import Image from 'next/image';

export default function Page() {
  const [showContent, setShowContent] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3500); // 2s typing + 1.4s dots animation + 0.1s buffer

    return () => clearTimeout(timer);
  }, []);

  return <>
    <div className="main-container">
      <div className="left-side">
        {!showContent ? (
          <div className="initializing-loader">
            <span className="initializing-text">Initializing</span>
            <span className="initializing-dots">.</span>
            <span className="initializing-dots">.</span>
            <span className="initializing-dots">.</span>
          </div>
        ) : (
          <div className="info">
            <h1>Hello World. Im Shivesh</h1>
            <p>Im a programmer and software engineer who likes to build cool things</p>
            <p>My interests are varied, from game programming, to web development to machine learning. I enjoy exploring new areas and acquiring new skills</p>
            <p>Feel free to explore my website to learn more about me and my work!</p>
          </div>
        )}
      </div>
      <div className="right-side">
        <div className="image-container spinning-image">
          <Image width={500} height={700} src="photo_transparent.png" alt="A picture of me"></Image>
        </div>
      </div>
    </div>
  </>;
}

