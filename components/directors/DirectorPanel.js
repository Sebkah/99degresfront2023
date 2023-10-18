/* COMPONENTS */
import { Name } from './Name';
import { DirectorMovies } from './DirectorMovies';
import { Links } from './Links';
import DirectorBio from './DirectorBio';
import { DirectorBackground } from './DirectorBackground';

/* LIB */
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
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
  const directorContentRef = useRef();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (indexFeatured !== index) {
      setShowContent(false);
    } else {
      setTimeout(() => {
        setShowContent(true);
      }, 500);
    }
  }, [indexFeatured]);

  useEffect(() => {
    if (indexFeatured !== index) {
      setShowContent(false);
    } else {
      setTimeout(() => {
        setShowContent(true);
      }, 500);
    }
  }, []);

  if (directorFeatured != null) {
    if (directorFeatured.current === slug.current) {
      setIndexFeatured(index);
    }
  }

  /* Checking if this panel is featured */
  const isFeatured = indexFeatured === index;

  /* if this panel is featured, swoosh it on the left, if not, base position */
  let left = `calc(${index}*100vw/11*1)`;
  let x = isFeatured ? `calc(${-index}*100vw/11)` : 0;

  /* if there's a director featured, and this panel is on top, swoosh it to the right */
  if (indexFeatured != null) {
    if (index > indexFeatured) {
      x = `calc(${11 - index}*100vw/11)`;
    }
  }

  const colorStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}) `;

  return (
    <motion.div
      className="director-panel"
      animate={{ x }}
      transition={{ duration: 0.5 }}
      onClick={() => {
        if (indexFeatured != index) {
          setIndexFeatured(index);
          setDirectorFeatured(slug);
          console.log('Selected : ', director.name);
          /*     setTimeout(() => {
            setShowContent(true);
          }, 500); */
        }
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
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="director-content"
            ref={directorContentRef}
          >
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
          </motion.div>
        )}
      </AnimatePresence>

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
