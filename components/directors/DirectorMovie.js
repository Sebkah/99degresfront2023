import React from 'react';
import { motion } from 'framer-motion';

export function DirectorMovie({ movie, color }) {
  const { title, image, id } = movie;

  const palette = 0;

  const colorStyle = color
    ? `rgb(${color[palette][0]}, ${color[palette][1]}, ${color[palette][2]}) `
    : 'white';

  return (
    <div key={id} className="director-movie">
      <motion.div
        className="color-overlay"
        style={{ backgroundColor: colorStyle }}
        whileHover={{
          /*  scale: 0.1, */
          opacity: 0,
        }}
      ></motion.div>
      <div className="movie-title">{title}</div>
      <img className="movie-image" src={image.formats.medium.url} alt="" />
    </div>
  );
}
