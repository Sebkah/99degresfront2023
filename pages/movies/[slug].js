import React from 'react';
import { API_URL } from '../../config';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Head from 'next/head';

import PageTitle from '../../components/page/PageTitle';
import { useRouter } from 'next/router';

import { groq } from 'next-sanity';
import { sanityStaticProps } from '../../config/sanity';

import { useAppContext } from '../../context/context';
export default function Movie({ movie, directorsFiltered }) {
  const { directorFeatured, setDirectorFeatured } = useAppContext();
  const router = useRouter();

  /*   console.log(movie); */

  const { title, videoUrl, image, directors } = movie;
  const back = directorFeatured ? `/directors` : '/movies';

  return (
    <motion.div className="page-container">
      <PageTitle
        back={back}
        position={'relative'}
        en={title}
        fr={title}
      ></PageTitle>
      <div className="movie">
        <div className="directors">
          {directors.map((director) => {
            return (
              <div
                onClick={() => {
                  setDirectorFeatured(director.slug);
                  router.push('/directors');
                }}
                key={director.name}
              >
                {director.name}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export async function getStaticPaths(context) {
  const query = groq`*[_type=='movie']`;
  const { data } = await sanityStaticProps({ context, query: query });

  const paths = data.map((movie) => ({ params: { slug: movie.slug.current } }));
  return {
    paths,
    fallback: false, // false or 'blocking'
  };
}

export async function getStaticProps(context) {
  const query = groq`*[_type=='movie' && slug.current=='${context.params.slug}']{
    ..., 
    "directors": *[_type=="director" && references(^._id)]
  }`;
  const { data } = await sanityStaticProps({ context, query: query });

  console.log(context.params.slug);

  return { props: { movie: data[0] } };
}
