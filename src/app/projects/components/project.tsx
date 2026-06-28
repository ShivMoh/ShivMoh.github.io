"use client"
import { motion } from "motion/react";
import { Link, Chip, Box } from "@mui/material";
import "./project.scss";
import MediaGallery from "./media-gallery";

export default function Project({ title, description, images, tags, links }: any) {
  return <>
    <div
      className="product-section">
      <motion.div
        initial={{ x: '-20vw', opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'linear' }}
        viewport={{ once: true, amount: 0.2 }}
        className="right">
        <MediaGallery media={images} />
      </motion.div>
      <motion.div
        initial={{ x: '20vw', opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'linear' }}
        viewport={{ once: true, amount: 0.2 }}
        className="left" >
        <h1
          className="product-title"
          aria-label="This is the heading of the product being offfered">{title}</h1>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', marginY: 1 }}>
          {tags?.map((tag: string) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              sx={{ color: 'var(--foreground)', borderColor: 'rgba(255, 255, 255, 0.4)' }}
            />
          ))}
        </Box>
        <div>
          <p
            className="product-description"
            aria-label="This is a description of the product or service being offered">
            {description}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <br />
            {links.map((link: any, index: number) => (
              <Link key={index} target="_blank" href={link.link} style={{ marginTop: '1vh' }}>{link.title}</Link>
            ))}
          </div>
        </div>

      </motion.div>

    </div>
  </>
}
