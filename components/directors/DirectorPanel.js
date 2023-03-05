import { DirectorBackground } from './DirectorBackground';
/* COMPONENTS */
import { Name } from './Name';

import { DirectorMovies } from './DirectorMovies';

import DirectorBio from './DirectorBio';

/* LIB */
import React from 'react';
import { motion } from 'framer-motion';

import { useAppContext } from '../../context/context';

const DirectorPanel = ({
  director,
  setFeatured,
  featured,
  setIndexFeatured,
  indexFeatured,
  index,
  color,
}) => {
  /*  console.log(director); */
  /* Getting props and context */
  const { language } = useAppContext();
  const { Nom, image, descEng, descFr, email, websiteUrl, instaUrl } = director;

  const [name, surname] = Nom.split(' ');

  /* Checking if this panel is featured */
  const isFeatured = featured == director;

  /* if this panel is featured, swoosh it on the left, if not, base position */
  let left = isFeatured ? 0 : `calc(${index}*100vw/11*1)`;

  /* if there's a director featured, and this panel is on top, swhoosh it to the right */
  if (featured != null) {
    if (index > indexFeatured) {
      left = '100%';
    }
  }

  /* Select a palette (0-9) */
  const palette = 9;
  const colorStyle = `rgb(${color[palette][0]}, ${color[palette][1]}, ${color[palette][2]}) `;

  return (
    <motion.div
      className="director-panel"
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
      <Name
        isFeatured={isFeatured}
        setFeatured={setFeatured}
        surname={surname}
        colorStyle={colorStyle}
        name={name}
      />

      {/* CONTENT */}
      <div className="director-content">
        <DirectorBio
          en={descEng}
          fr={descFr}
          instaUrl={instaUrl}
          websiteUrl={websiteUrl}
          email={email}
          titleColor={colorStyle}
        ></DirectorBio>
        <DirectorMovies
          director={director}
          language={language}
          color={color}
          titleColor={colorStyle}
          palette={palette}
        />
      </div>

      {/* BACKGROUND */}
      <DirectorBackground
        image={image}
        overlayColor={colorStyle}
        isFeatured={isFeatured}
      />
    </motion.div>
  );
};

export default DirectorPanel;
