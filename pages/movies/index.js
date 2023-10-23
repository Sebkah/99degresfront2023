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
import { useRouter } from 'next/router';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import HamburgerMenu from '../../components/navigation/mobile/HamburgerMenu';

const Movies = ({ moviesByTag }) => {
  const isTablet = useMediaQuery('(max-width: 800px)');
  const pageContainerRef = React.useRef(null);
  const { featured, clip, ESDE, FFE, dev, pub } = moviesByTag;
  const { language, setDirectorFeatured } = useAppContext();
  const [isEN, setIsEN] = useState(language);
  const router = useRouter();

  useEffect(() => {
    setIsEN(language == 'en');
  }, [language]);

  /*   console.log(moviesByTag); */
  return (
    <div
      className="page-container movies-page"
      style={{ display: 'grid', backgroundColor: 'black' }}
      ref={pageContainerRef}
    >
      {isTablet ? (
        <HamburgerMenu />
      ) : (
        <PageTitle
          position={'relative'}
          en="movies"
          fr="films"
          backFunction={() => {
            setDirectorFeatured(null);
            router.push('/');
          }}
        />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="movies"
      >
        <MovieGrid
          pageContainerRef={pageContainerRef}
          title={isEN ? 'featured' : 'à la une'}
          section={featured}
        />
        <MovieGrid
          pageContainerRef={pageContainerRef}
          title={isEN ? 'clips' : 'clips'}
          section={clip}
        />
        <MovieGrid
          pageContainerRef={pageContainerRef}
          title={isEN ? 'school is over' : "en sortant de l'école"}
          section={ESDE}
        />
        <MovieGrid
          pageContainerRef={pageContainerRef}
          title={isEN ? 'final year movies' : "films de fin d'études"}
          section={FFE}
        />
      </motion.div>
    </div>
  );
};

export async function getStaticProps(context) {
  const query = groq`*[_type=='tag']{
    color{rgb},
    name,
    "movies": *[_type== "movie" && references(^._id)]{
    
      title, 
      mainImage, 
      slug,
      priority,
      gif{secure_url}
    } | order(priority desc)
  }
 `;

  const { data } = await sanityStaticProps({ context, query: query });

  const moviesByTag = data.reduce(
    (obj, item) => ({
      ...obj,
      [item.name]: { movies: item.movies, ...item.color },
    }),
    {}
  );

  return {
    props: { moviesByTag }, // will be passed to the page component as props
  };
}

export default Movies;
