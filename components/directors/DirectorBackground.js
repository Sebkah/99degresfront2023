import React from 'react';
import { motion } from 'framer-motion';
export function DirectorBackground({ isFeatured, image, overlayColor }) {
  return (
    <motion.div
      className="director-background"
      layout
      style={{
        left: isFeatured ? null : 0,
        right: isFeatured ? 0 : null,
        backgroundImage: `url(${image.formats.large.url})`,
        backgroundSize: 'cover',
        backgroundPosition: isFeatured ? '50% 50%' : null,
        filter: isFeatured ? 'grayscale(0%)' : null,
      }}
      /*  transition={{ duration: 4 }} */
    >
      {
        <motion.div
          className="background-color-overlay"
          animate={{
            opacity: isFeatured ? 0.5 : 0,
          }}
          style={{
            backgroundColor: overlayColor,
          }}
        ></motion.div>
      }
    </motion.div>
  );
}
