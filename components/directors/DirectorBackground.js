import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image'

import {
  sanityStaticProps,
  imageUrlBuilder,
  useSanityQuery,
  PortableText,
} from '../../config/sanity';

export function DirectorBackground({ isFeatured, image, overlayColor }) {
  const backgroundWidth = 400;
  /*   console.log(imageUrlBuilder
      .image(image)
      .width(1920).height(backgroundWidth).fit("clip")
      .url()); */
  return (
    <motion.div
      className="director-background"
      style={{
        /*  backgroundImage: `url(${imageUrlBuilder
           .image(image)
           .width(backgroundWidth)
           .url()})`, */
        backgroundSize: 'cover',
        filter: isFeatured ? 'grayscale(0%)' : null,
      }}
    >

      <Image sizes={"100vw"} alt="" src={imageUrlBuilder
        .image(image)
        .width(backgroundWidth).height(1080).fit("clip")
        .url()} fill={true} className='background-image'></Image>
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
