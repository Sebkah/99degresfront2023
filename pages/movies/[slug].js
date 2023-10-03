import React from 'react';
import dynamic from 'next/dynamic';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Head from 'next/head';

import PageTitle from '../../components/page/PageTitle';
import { useRouter } from 'next/router';

import { groq } from 'next-sanity';
import { sanityStaticProps, imageUrlBuilder } from '../../config/sanity';

import { useAppContext } from '../../context/context';
export default function Movie({ movie, directorsFiltered }) {
  const ReactPlayer = dynamic(() => import('react-player/lazy'), {
    ssr: false,
  });
  const { directorFeatured, setDirectorFeatured, language } = useAppContext();
  const router = useRouter();

  const { title, mainImage, directors, descFR } = movie;
  let { videoUrl } = movie;
  console.log(movie);
  const back = directorFeatured ? `/directors` : '/movies';

  //This is a really dirty hack
  /*  const isVideoESDE = videoUrl.includes('france');
  if (isVideoESDE) {
    videoUrl = null;
  } */

  return (
    <motion.div className="page-container" style={{ display: 'grid' }}>
      <PageTitle
        backFunction={() => {
          console.log('pushed the back button');
          if (directorFeatured != null) {
            router.push('/directors');
          } else {
            router.push('/movies');
          }
        }}
        position={'relative'}
        en={title}
        fr={title}
      ></PageTitle>
      <div className="movie-page">
        <div
          className="movie-video"
          style={{
            backgroundImage: `url(${imageUrlBuilder.image(mainImage)})`,
          }}
        >
          {videoUrl && (
            <ReactPlayer
              controls={true}
              url={videoUrl}
              width="100%"
              height={'100%'}
            ></ReactPlayer>
          )}
        </div>
        <div className="movie-info">
          <div className="movie-description">{descFR}</div>
          <div className="directors">
            <p>{language == 'en' ? 'A movie by' : 'Un film de'}</p>
            <div className="directors-list">
              {directors.map((director) => {
                return (
                  <Link
                    onClick={() => {
                      setDirectorFeatured(director.slug);
                      /*  router.push('/directors'); */
                    }}
                    href="/directors"
                    key={director.name}
                    className="director-link"
                  >
                    {director.name}
                  </Link>
                );
              })}
            </div>
          </div>
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
