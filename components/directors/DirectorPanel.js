import React from 'react';
import { useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
} from 'framer-motion';

const DirectorPanel = ({
  director,
  setFeatured,
  featured,
  setIndexFeatured,
  indexFeatured,
  index,
}) => {
  const { Nom, image } = director;

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

  /* const backgroundSize = isFeatured ? 'contain' : 'contain'; */
  const backgroundSize = 'contain';

  const style = {
    left,
    zIndex: index * 100,
  };

  return (
    <motion.div className="director-panel" key={Nom} layout style={style}>
      <motion.div
        onClick={() => {
          setFeatured(director);
          setIndexFeatured(index);
          console.log(director.Nom);
        }}
        className="name-container"
        $
      >
        <div className="surname">{surname}</div>
        <div className="name"> {name}</div>
      </motion.div>

      <motion.div
        className="director-background"
        layout
        style={{
          backgroundImage: `url(${image.formats.large.url})`,
          backgroundSize,
          backgroundPosition: isFeatured ? '0 50%' : null,
          filter: isFeatured ? 'grayscale(0%)' : null,
        }}
      ></motion.div>
    </motion.div>
  );
};

export default DirectorPanel;
