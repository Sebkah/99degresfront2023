import React from 'react';

import PageTitle from '../components/page/PageTitle';

import { API_URL } from '../config';

import { useAppContext } from '../context/context';
import { groq } from 'next-sanity';

import {
  sanityStaticProps,
  imageUrlBuilder,
  useSanityQuery,
  PortableText,
} from '../config/sanity';

import { useState, useRef, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import DirectorPanel from '../components/directors/DirectorPanel';

import { useRouter } from 'next/router';

const Directors = ({ directors, palettes }) => {
  const [featured, setFeatured] = useState(null);
  const [indexFeatured, setIndexFeatured] = useState(null);
  const { directorFeatured, setDirectorFeatured } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    console.log(directorFeatured);
  }, []);

  return (
    <div className="page-container">
      <PageTitle position={'absolute'} en="directors" fr="réalisateur.ices" />
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
              key={director.name}
              director={director}
              /*   directorFeatured={directorFeatured}
              setDirectorFeatured={setDirectorFeatured} */
              setIndexFeatured={setIndexFeatured}
              indexFeatured={indexFeatured}
              index={index}
            ></DirectorPanel>
          );
        })}
      </motion.div>
    </div>
  );
};

export async function getStaticProps(context) {
  const query = groq`*[_type=='director']{
    mail, 
      movies[]->,
      ...
  }`;
  const { data } = await sanityStaticProps({ context, query: query });

  const ColorThief = require('colorthief');

  const palettes = await Promise.all(
    data.map(async ({ mainImage }) => {
      const palette = await ColorThief.getPalette(
        imageUrlBuilder.image(mainImage).url()
      );
      return palette;
    })
  );

  return {
    props: { directors: data, palettes }, // will be passed to the page component as props
  };
}

export default Directors;
