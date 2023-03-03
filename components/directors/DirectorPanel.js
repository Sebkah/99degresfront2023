import { DirectorMovie } from './DirectorMovie';
import Cross from './Cross';
import React from 'react';
import { useEffect } from 'react';
import {
  motion,
  useWillChange,
  AnimatePresence,
  useMotionValue,
  animate,
} from 'framer-motion';

import DirectorBio from './DirectorBio';

const DirectorPanel = ({
  director,
  setFeatured,
  featured,
  setIndexFeatured,
  indexFeatured,
  index,
  color,
}) => {
  /*  console.log(color); */
  const { Nom, image, descEng, descFr } = director;

  const [name, surname] = Nom.split(' ');

  const isFeatured = featured == director;

  let left = isFeatured ? 0 : `calc(${index}*100vw/11*1)`;

  if (featured != null) {
    if (indexFeatured != null) {
      if (index > indexFeatured) {
        left = '100%';
      }
    }
  }

  const palette = 0;

  const colorStyle = `rgb(${color[palette][0]}, ${color[palette][1]}, ${color[palette][2]}) `;

  return (
    <motion.div
      className="director-panel"
      key={Nom}
      animate={{ left }}
      transition={{ duration: 0.5 }}
      onClick={() => {
        setFeatured(director);
        setIndexFeatured(index);
        console.log('Selected : ', director.Nom);
      }}
      style={{ cursor: isFeatured ? 'default' : 'pointer' }}
    >
      {/* NAME */}

      <div className="name-container">
        <Cross render={isFeatured} setFeatured={setFeatured}></Cross>

        <div className="surname" style={{ color: colorStyle }}>
          {surname}
        </div>
        <div className="name">{name}</div>
      </div>

      {/* CONTENT */}

      <div className="director-content">
        <DirectorBio en={descEng} fr={descFr}></DirectorBio>

        <div className="director-movies">
          {director.movies.map((movie, index) => {
            if (!image.formats.medium.url) console.log(title);

            return (
              <DirectorMovie
                color={color}
                key={movie.title}
                paletteSelector={1}
                movie={movie}
              />
            );
          })}
        </div>
      </div>

      {/* BACKGROUND */}
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
      ></motion.div>
    </motion.div>
  );
};

export default DirectorPanel;
