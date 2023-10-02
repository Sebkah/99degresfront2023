import React from 'react';

import { useState, useEffect } from 'react';

import PageTitle from '../../components/page/PageTitle';
import { motion } from 'framer-motion';

import { groq } from 'next-sanity';

import {
  sanityStaticProps,
  imageUrlBuilder,
  useSanityQuery,
  PortableText,
} from '../../config/sanity';

import { API_URL } from '../../config';

import MovieGrid from '../../components/movies/MovieGrid';

import { useAppContext } from '../../context/context';

const Movies = ({ movies, moviesByTag }) => {
  const { featured, clip, ESDE, FFE, dev, pub } = moviesByTag;
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
      style={{ display: 'grid' /*  background: 'black'  */ }}
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
          movies={ESDE}
        />
        <MovieGrid
          title={isEN ? 'final year movies' : "films de fin d'études"}
          movies={FFE}
        />
      </motion.div>
    </div>
  );
};

export async function getStaticProps(context) {
  const query = groq`*[_type=='tag']{
    name,
    "movies": *[_type== "movie" && references(^._id)]{
    
      title, 
      mainImage, 
      slug,
      priority,
      gif{secure_url}
    }    
  }
 `;

  const { data } = await sanityStaticProps({ context, query: query });

  const moviesByTag = data.reduce(
    (obj, item) => ({ ...obj, [item.name]: item.movies }),
    {}
  );

  return {
    props: { moviesByTag }, // will be passed to the page component as props
  };
}

export default Movies;
