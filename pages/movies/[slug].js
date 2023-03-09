import React from 'react';
import { API_URL } from '../../config';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Head from 'next/head';

import PageTitle from '../../components/page/PageTitle';

export default function Movie({ movie, directorsFiltered }) {
  /* console.log(directorsFiltered); */
  const { title, videoUrl, image, directors } = movie;

  return (
    <motion.div className="page-container">
      <PageTitle back="/movies" en={title} fr={title}></PageTitle>
    </motion.div>
  );
}

export async function getStaticPaths() {
  const data = await fetch(`${API_URL}/projects`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const movies = await data.json();

  const paths = movies.map((movie) => ({ params: { slug: movie.slug } }));
  return {
    paths,
    fallback: false, // false or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1

  const res = await fetch(`${API_URL}/projects?slug=${params.slug}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  let movie = await res.json();
  movie = movie[0];

  const directorsRes = await fetch(`${API_URL}/directors`);
  const directors = await directorsRes.json();

  const directorsIds = movie.directors.map((director) => {
    return director.id;
  });

  const directorsFiltered = directors.filter((director) => {
    return directorsIds.includes(director.id);
  });

  console.log(directorsFiltered);

  // Pass post data to the page via props
  return { props: { movie, directorsFiltered } };
}
