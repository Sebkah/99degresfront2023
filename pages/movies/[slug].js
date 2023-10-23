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

import Image from 'next/image';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import HamburgerMenu from '../../components/navigation/mobile/HamburgerMenu';

export default function Movie({ movie, directorsFiltered }) {
  const isTablet = useMediaQuery('(max-width: 800px)');
  const ReactPlayer = dynamic(() => import('react-player/lazy'), {
    ssr: false,
  });
  const { directorFeatured, setDirectorFeatured, language } = useAppContext();
  const router = useRouter();

  const { title, mainImage, directors, descFR, videoUrl, videoLink } = movie;

  const back = directorFeatured ? `/directors` : '/movies';

  return (
    <motion.div
      className="page-container movie-page"
      style={{ display: 'grid' }}
    >
      <Head>
        <title>Collectif 99° - {title}</title>
      </Head>
      {isTablet ? (
        <HamburgerMenu />
      ) : (
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
      )}

      <div className="movie-content">
        {isTablet && <div className="movie-title">{title}</div>}
        <div className="movie-video">
          {videoUrl ? (
            <ReactPlayer
              controls={true}
              url={videoUrl}
              width="100%"
              height="100%"
            ></ReactPlayer>
          ) : (
            <div className="image-container">
              <a href={videoLink} target="_blank" rel="noreferrer">
                <svg
                  className="play-button"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 384 512"
                >
                  <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                </svg>
              </a>
              <Image
                sizes="100vw"
                fill={true}
                alt="movie-image"
                src={imageUrlBuilder.image(mainImage).url()}
              />
            </div>
          )}
        </div>
        <div className="movie-info">
          <div className="movie-description">
            <h1>Description</h1>
            {descFR}
          </div>
          <div className="directors">
            <h1>{language == 'en' ? 'A movie by' : 'Un film de'}</h1>
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
