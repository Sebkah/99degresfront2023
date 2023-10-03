import React from 'react';
import { motion } from 'framer-motion';

import {
  sanityStaticProps,
  imageUrlBuilder,
  useSanityQuery,
  PortableText,
} from '../../config/sanity';

export function DirectorBackground({ isFeatured, image, overlayColor }) {
  return (
    <motion.div
      className="director-background"
      layout
      style={{
        backgroundImage: `url(${imageUrlBuilder
          .image(image)
          .width(1920)
          .url()})`,
        backgroundSize: 'cover',
        filter: isFeatured ? 'grayscale(0%)' : null,
      }}
    >
      {
        <motion.div
          className="background-color-overlay"
          animate={{
            opacity: isFeatured ? 0 : 0,
          }}
          style={{
            backgroundColor: overlayColor,
          }}
        ></motion.div>
      }
    </motion.div>
  );
}
