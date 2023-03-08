import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

import Image from 'next/image';

const brghtnss = 1;

export function DirectorMovie({ movie, color, paletteSelector, titleColor }) {
  const { title, image, id } = movie;

  const grayscale = useMotionValue(1);
  const brightness = useMotionValue(brghtnss);

  const filter = useMotionTemplate`grayscale(${grayscale}) brightness(${brightness})`;

  /*   const palette = 0; */

  const colorStyle = `rgb(${color[paletteSelector][0]}, ${color[paletteSelector][1]}, ${color[paletteSelector][2]}) `;

  console.log(image.formats.medium);

  return (
    <div key={id} className="director-movie">
      <motion.div
        className="color-overlay"
        style={{
          opacity: 1,
          backgroundColor: colorStyle,
        }}
        transition={{ duration: 0 }}
        whileHover={{
          opacity: 0,
        }}
        onHoverStart={() => {
          /*  animate(grayscale, 0);
          animate(brightness, 1); */
          grayscale.set(0);
          brightness.set(1);
        }}
        onHoverEnd={() => {
          /*    animate(grayscale, 1);
          animate(brightness, 1.5); */
          grayscale.set(1);
          brightness.set(brghtnss);
        }}
      ></motion.div>
      <div className="movie-title" style={{ backgroundColor: titleColor }}>
        {title}
      </div>
      <motion.div
        style={{
          filter: filter,
        }}
        className="movie-image"
      >
        <Image
          src={image.formats.medium.url}
          width={image.formats.medium.width}
          height={image.formats.medium.height}
          alt=""
        />
      </motion.div>
    </div>
  );
}
