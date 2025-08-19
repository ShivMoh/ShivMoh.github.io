"use client"
import { motion } from "motion/react";
import { Link } from "@mui/material";
import "./project.scss";

export default function Project({title, description, image, imageDescription, links} : any) {
    return <>
        <div
          className="product-section">
          <motion.div
            initial={{ x: '-20vw', opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'linear' }}
            viewport={{ once: true, amount: 0.2 }}
            className="right">
            <figure className="image-container">
              <img src={image} alt={imageDescription} />
              <figcaption aria-label="Description of the product image">{imageDescription}</figcaption>
            </figure>
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
            <div>
                <p
                className="product-description"
                aria-label="This is a description of the product or service being offered">
                    {description}
                </p>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <br />
                    {links.map((link : any) => {
                        return <>
                            <Link target="_blank" href={link.link} style={{marginTop: '1vh'}}>{link.title}</Link> 
                        </>
                    }
                    )}
                </div>
            </div>

          </motion.div>

        </div>     
    </>
}