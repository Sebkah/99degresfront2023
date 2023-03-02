import React from 'react';

import PageTitle from '../components/page/PageTitle';

import { API_URL } from '../config';

import { useState, useRef, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import Director from '../components/directors/Director';
import DirectorPanel from '../components/directors/DirectorPanel';

import ColorThief from '../node_modules/colorthief/dist/color-thief.mjs';

const directors = ({ directors }) => {
  const [featured, setFeatured] = useState(null);
  const [indexFeatured, setIndexFeatured] = useState(null);

  const [colors, setColors] = useState([]);

  return (
    <div className="page-container">
      <div className="dummyImage" style={{ display: 'none' }}>
        {directors.map(({ image }, index) => {
          return (
            <img
              key={index}
              onLoad={(e) => {
                const image = e.target;
                const colorthief = new ColorThief();
                const color = colorthief.getPalette(image);
                setColors((c) => [...c, color]);
              }}
              crossOrigin="anonymous"
              src={image.formats.thumbnail.url}
              alt=""
            />
          );
        })}
      </div>
      <PageTitle en="directors" fr="réalisateurs" />

      {/*    <div
        className="director-back"
        onClick={() => {
          console.log('baaack');
          setFeatured(null);
        }}
      >
        ////Retour
      </div> */}

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
                  color={colors[index]}
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
      {/*  <div className="director-featured">
        <div className="image">
          {featured && <img src={featured.image.formats.large.url} alt="" />}
        </div>
        <div className="desc"></div>
      </div> */}
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
  const directors = await data.json();
  return {
    props: { directors }, // will be passed to the page component as props
  };
}

export default directors;
