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

import DirectorPanelMobile from '../components/directors/mobile/DirectorPanelMobile';
import DirectorPanel from '../components/directors/DirectorPanel';

import { useRouter } from 'next/router';
import { useMediaQuery } from '../hooks/useMediaQuery';
import HamburgerMenu from '../components/navigation/mobile/HamburgerMenu';

const Directors = ({ directors }) => {
  const isTablet = useMediaQuery('(max-width: 1200px)');
  const directorsGridRef = useRef();
  const callBackArray = useRef([]);
  const scrollPercentageRef = useRef(0);
  /* const isTablet = true; */

  const [indexFeatured, setIndexFeatured] = useState(null);
  const { directorFeatured, setDirectorFeatured } = useAppContext();
  const router = useRouter();

  return (
    <div className="page-container director-page">
      {isTablet ? (
        <HamburgerMenu />
      ) : (
        <PageTitle
          position={'absolute'}
          en="directors"
          fr="réalisateur.ices"
          backFunction={() => {
            console.log('pushed the back button');
            if (indexFeatured == null) {
              router.push('/');
              return;
            }
            setDirectorFeatured(null);
            setIndexFeatured(null);
          }}
        />
      )}

      <motion.div
        className="directors-grid"
        ref={directorsGridRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onScroll={(e) => {
          console.log(e);
          console.log(
            (scrollPercentageRef.current =
              e.target.scrollTop /
              (e.target.scrollHeight - e.target.clientHeight))
          );
          callBackArray.current.forEach((callBack) => {
            callBack();
          });
        }}
      >
        {directors.map((director, index) => {
          return isTablet ? (
            <DirectorPanelMobile
              directorsGridRef={directorsGridRef}
              key={director.name}
              director={director}
              setIndexFeatured={setIndexFeatured}
              indexFeatured={indexFeatured}
              index={index}
              callBackArray={callBackArray}
              scrollPercentageRef={scrollPercentageRef}
            ></DirectorPanelMobile>
          ) : (
            <DirectorPanel
              key={director.name}
              director={director}
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
    ...,
    ...color{rgb}
  }`;
  const { data } = await sanityStaticProps({ context, query: query });

  data.sort(() => {
    return Math.random() - 0.5;
  });

  return {
    props: { directors: data }, // will be passed to the page component as props
  };
}

export default Directors;
