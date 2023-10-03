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
  color,
}) => {
  /*  console.log(director); */
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

  /*  if (directorFeatured != null) {
    if (directorFeatured.current == slug.current) setIndexFeatured(index);
  }
 */
  /* Checking if this panel is featured */
  const isFeatured = indexFeatured === index;

  /* if this panel is featured, swoosh it on the left, if not, base position */
  let left = isFeatured ? 0 : `calc(${index}*100vw/11*1)`;

  /* if there's a director featured, and this panel is on top, swoosh it to the right */
  if (indexFeatured != null) {
    if (index > indexFeatured) {
      left = '100%';
    }
  }

  /* Select a palette (0-9) */
  const palette = 9;
  const paletteBG = 3;
  const BGLuminosity = 0;
  /*   const colorStyle = `rgb(${color[palette][0]}, ${color[palette][1]}, ${color[palette][2]}) `;
  const colorStyleBG = `rgb(${color[paletteBG][0] * BGLuminosity}, ${
    color[paletteBG][1] * BGLuminosity
  }, ${color[paletteBG][2] * BGLuminosity}) `; */
  const colorStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}) `;
  const colorStyleBG = `rgb(${color[paletteBG][0] * BGLuminosity}, ${
    color[paletteBG][1] * BGLuminosity
  }, ${color[paletteBG][2] * BGLuminosity}) `;

  return (
    <motion.div
      className="director-panel"
      initial={{ left }}
      animate={{ left }}
      transition={{ duration: 0.5 }}
      onClick={() => {
        setIndexFeatured(index);
        setDirectorFeatured(slug);
        console.log('Selected : ', director.Nom);
      }}
      style={{
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
        colorStyle={colorStyle}
        name={forname}
      />

      {/* CONTENT */}
      <div className="director-content">
        <Links
          instaUrl={instaUrl}
          email={email}
          language={language}
          websiteUrl={websiteUrl}
        />
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
          color={color}
          titleColor={colorStyle}
          palette={palette}
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
