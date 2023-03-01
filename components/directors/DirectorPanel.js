import { DirectorMovie } from './DirectorMovie';
import React from 'react';
import { useEffect } from 'react';
import {
  motion,
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
  console.log(color);
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

  let zIndex = index * 100;

  if (featured) zIndex *= 1000;

  /* const backgroundSize = isFeatured ? 'contain' : 'contain'; */
  const backgroundSize = 'contain';

  const style = {
    left,
    zIndex: index * 100,
  };

  const palette = 9;

  const colorStyle = color
    ? `rgb(${color[palette][0]}, ${color[palette][1]}, ${color[palette][2]}) `
    : 'white';

  return (
    <motion.div
      className="director-panel"
      key={Nom}
      layout
      style={style}
      /* transition={{ duration: 4 }} */
    >
      {/* NAME */}
      <motion.div
        onClick={() => {
          setFeatured(director);
          setIndexFeatured(index);
          console.log(director);
        }}
        className="name-container"
      >
        <div className="surname" style={{ color: colorStyle }}>
          {surname}
        </div>
        <div className="name">{name}</div>
      </motion.div>

      {/* CONTENT */}

      <div className="director-content">
        {/*  <div className="empty"></div> */}
        <DirectorBio en={descEng} fr={descFr}></DirectorBio>
        {/*    <div className="director-bio">{director.descFr}</div> */}
        <div className="director-movies">
          {director.movies.map((movie) => {
            if (!image.formats.medium.url) console.log(title);

            return (
              <DirectorMovie color={color} key={movie.title} movie={movie} />
            );
          })}
        </div>
        <div
          className="director-back"
          onClick={() => {
            console.log('baaack');
            setFeatured(null);
          }}
        >
          X
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
        /*    transition={{ duration: 4 }} */
      ></motion.div>
    </motion.div>
  );
};

export default DirectorPanel;
