import React from 'react';

import PageTitle from '../components/page/PageTitle';

import { API_URL } from '../config';

import { useState, useRef, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import Director from '../components/directors/Director';
import DirectorPanel from '../components/directors/DirectorPanel';

const directors = ({ directors, palettes }) => {
  const [featured, setFeatured] = useState(null);
  const [indexFeatured, setIndexFeatured] = useState(null);

  useEffect(() => {
    console.log(featured);
  }, [featured]);

  return (
    <div className="page-container">
      <PageTitle en="directors" fr="réalisateurs" />

      <AnimatePresence>
        {true && (
          <motion.div
            className="directors-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {directors.map((director, index) => {
              return (
                <DirectorPanel
                  color={palettes[index]}
                  key={director.Nom}
                  director={director}
                  setFeatured={setFeatured}
                  featured={featured}
                  setIndexFeatured={setIndexFeatured}
                  indexFeatured={indexFeatured}
                  index={index}
                ></DirectorPanel>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export async function getStaticProps() {
  const data = await fetch(`${API_URL}/directors`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const ColorThief = require('colorthief');
  const directors = await data.json();

  const palettes = await Promise.all(
    directors.map(async ({ image }) => {
      const palette = await ColorThief.getPalette(image.formats.small.url);
      return palette;
    })
  );
  console.log(palettes);

  return {
    props: { directors, palettes }, // will be passed to the page component as props
  };
}

export default directors;
