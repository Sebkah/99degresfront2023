import React from 'react';
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  animate,
} from 'framer-motion';

export function DirectorMovie({ movie, color, paletteSelector }) {
  const { title, image, id } = movie;

  const grayscale = useMotionValue(1);
  const brightness = useMotionValue(0.7);

  const filter = useMotionTemplate`grayscale(${grayscale}) brightness(${brightness})`;

  /*   const palette = 0; */

  const colorStyle = color
    ? `rgb(${color[paletteSelector][0]}, ${color[paletteSelector][1]}, ${color[paletteSelector][2]}) `
    : 'white';

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
          brightness.set(0.7);
        }}
      ></motion.div>
      <div className="movie-title">{title}</div>
      <motion.div
        style={{
          filter: filter,
        }}
        className="movie-image"
      >
        <img src={image.formats.medium.url} alt="" />
      </motion.div>
    </div>
  );
}
