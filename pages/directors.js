import React from 'react';

import PageTitle from '../components/page/PageTitle';

import { API_URL } from '../config';

import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import Director from '../components/directors/Director';
import DirectorPanel from '../components/directors/DirectorPanel';

const directors = ({ directors }) => {
  const [featured, setFeatured] = useState(null);
  const [indexFeatured, setIndexFeatured] = useState(null);

  /* console.log(directors); */
  return (
    <div className="page-container">
      <PageTitle en="directors" fr="réalisateurs" />

      <div
        className="director-back"
        onClick={() => {
          console.log('baaack');
          setFeatured(null);
        }}
      >
        ////Retour
      </div>

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
      <div className="director-featured">
        <div className="image">
          {featured && <img src={featured.image.formats.large.url} alt="" />}
        </div>
        <div className="desc"></div>
      </div>
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
