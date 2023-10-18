import { DirectorBackground } from './DirectorBackground';
/* COMPONENTS */
import { Name } from './Name';

import { DirectorMovies } from './DirectorMovies';
import { Links } from './Links';

import DirectorBio from './DirectorBio';

/* LIB */
import React from 'react';
import { motion } from 'framer-motion';

import { useAppContext } from '../../context/context';

const DirectorPanel = ({
  director,
  setIndexFeatured,
  indexFeatured,
  index,
}) => {
  /* Getting props and context */
  const { language, setDirectorFeatured, directorFeatured } = useAppContext();
  const {
    slug,
    name,
    mainImage,
    descEN,
    descFR,
    email,
    websiteUrl,
    instaUrl,
    rgb,
  } = director;

  const [forname, surname] = name.split(' ');

  if (directorFeatured != null) {
    if (directorFeatured.current == slug.current) setIndexFeatured(index);
  }

  /* Checking if this panel is featured */
  const isFeatured = indexFeatured === index;

  /* if this panel is featured, swoosh it on the left, if not, base position */
  let left = `calc(${index}*100vw/11*1)`;
  let x = isFeatured ? `calc(${-index}*100vw/11)` : 0;

  /* if there's a director featured, and this panel is on top, swoosh it to the right */
  if (indexFeatured != null) {
    if (index > indexFeatured) {
      /*   left = '100%'; */
      x = `calc(${11 - index}*100vw/11)`;
    }
  }

  const colorStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}) `;

  return (
    <motion.div
      className="director-panel"
      /*  initial={{ left }} */
      animate={{ x }}
      transition={{ duration: 0.5 }}
      onClick={() => {
        setIndexFeatured(index);
        setDirectorFeatured(slug);
        console.log('Selected : ', director.name);
      }}
      style={{
        left,
        cursor: isFeatured ? 'default' : 'pointer',
        backgroundColor: colorStyle,
      }}
    >
      {/* NAME */}
      <Name
        setIndexFeatured={setIndexFeatured}
        setDirectorFeatured={setDirectorFeatured}
        isFeatured={isFeatured}
        surname={surname}
        name={forname}
        colorStyle={colorStyle}
      />

      {/* CONTENT */}
      <div className="director-content">
        <DirectorBio
          en={descEN}
          fr={descFR}
          instaUrl={instaUrl}
          websiteUrl={websiteUrl}
          email={email}
          titleColor={colorStyle}
        ></DirectorBio>
        <DirectorMovies
          director={director}
          language={language}
          titleColor={colorStyle}
        />
      </div>

      {/* BACKGROUND */}
      <DirectorBackground
        image={mainImage}
        overlayColor={colorStyle}
        isFeatured={isFeatured}
      />
    </motion.div>
  );
};

export default DirectorPanel;
