import React from 'react';

import { useState, useEffect } from 'react';

import PageTitle from '../../components/page/PageTitle';
import { motion } from 'framer-motion';

import { API_URL } from '../../config';

import MovieGrid from '../../components/movies/MovieGrid';

import { useAppContext } from '../../context/context';

const movies = ({ movies, moviesByTag }) => {
  const { featured, clip, schoolisover, mastersmovie } = moviesByTag;
  const { language } = useAppContext();
  const [isEN, setIsEN] = useState(language);

  /*  console.log(movies); */

  useEffect(() => {
    setIsEN(language == 'en');
  }, [language]);

  console.log(moviesByTag);
  return (
    <div
      className="page-container"
      style={{ display: 'grid', background: 'black' }}
    >
      <PageTitle position={'relative'} en="movies" fr="films" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="movies"
      >
        <MovieGrid title={isEN ? 'featured' : 'à la une'} movies={featured} />
        <MovieGrid title={isEN ? 'clips' : 'clips'} movies={clip} />
        <MovieGrid
          title={isEN ? 'school is over' : "en sortant de l'école"}
          movies={schoolisover}
        />
        <MovieGrid
          title={isEN ? 'final year movies' : "films de fin d'études"}
          movies={mastersmovie}
        />
      </motion.div>
    </div>
  );
};

export async function getStaticProps() {
  const data = await fetch(`${API_URL}/projects`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const movies = await data.json();

  const ColorThief = require('colorthief');

  const moviesWithPalette = await Promise.all(
    movies.map(async (movie) => {
      const palette = await ColorThief.getPalette(
        movie.image.formats.small.url
      );
      return { ...movie, palette };
    })
  );

  const moviesByTag = moviesWithPalette.reduce((acc, current) => {
    if (acc[current.tag] == null) {
      return {
        ...acc,
        [current.tag]: [current],
      };
    } else {
      acc[current.tag].push(current);
      return acc;
    }
  }, {});

  return {
    props: { movies, moviesByTag }, // will be passed to the page component as props
  };
}

export default movies;
