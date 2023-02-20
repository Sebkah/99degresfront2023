import React from 'react';

import PageTitle from '../components/page/PageTitle';

import { API_URL } from '../config';

import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

const directors = ({ directors }) => {
  const [featured, setFeatured] = useState(null);

  console.log(directors);
  return (
    <div className="page-container">
      <PageTitle en="directors" fr="réalisateurs" />

      <AnimatePresence>
        {featured == null && true && (
          <motion.div
            className="directors-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {directors.map((director) => {
              const { Nom, image } = director;
              const [name, surname] = Nom.split(' ');
              return (
                <div
                  className="director"
                  onClick={() => {
                    setFeatured(director);
                  }}
                  key={Nom}
                >
                  <div
                    className="director-background"
                    style={{
                      backgroundImage: `url(${image.formats.large.url})`,
                    }}
                  ></div>

                  <div className="name-container">
                    <div className="surname">{surname}</div>
                    <div className="name"> {name}</div>
                  </div>
                </div>
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
