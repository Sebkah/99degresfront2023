import React from 'react';

import Image from 'next/image';

import { useRouter } from 'next/router';

import { imageUrlBuilder } from '../../config/sanity';
import Link from 'next/link';
import { useInView } from 'framer-motion';

const Movie = ({ title, mainImage, slug, gif }) => {
  const elementRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const isInView = useInView(elementRef);
  return (
    <Link
      key={title}
      ref={elementRef}
      className="movie"
      href={`/movies/${slug.current}`}
      /*   onMouseEnter={() => {
        videoRef.current && videoRef.current.play();
      }} */
      /*  onMouseLeave={() => {
        videoRef.current && videoRef.current.pause();
      }} */
    >
      <div className="movie-title" style={{ backgroundColor: 'black' }}>
        {title}
      </div>

      {gif ? (
        isInView && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            src={gif.secure_url}
            className="movie-image"
          ></video>
        )
      ) : (
        <Image
          className="movie-image"
          src={imageUrlBuilder.image(mainImage).width(600).url()}
          alt=""
          width={600}
          height={338}
        ></Image>
      )}
    </Link>
  );
};

const MovieGrid = ({ movies, title }) => {
  //Adjusting some titles
  if (title == "en sortant de l'école" || title == 'school is over')
    title = 'esd';
  if (title == "films de fin d'études") title = "fin d'études";

  return (
    <>
      <h1 className="movie-section-title">{title}</h1>
      <div
        className={
          title == 'featured' || title == 'à la une'
            ? 'movie-grid featured'
            : 'movie-grid'
        }
      >
        {movies.map((movie) => (
          <Movie key={movie.title} {...movie} />
        ))}
      </div>
    </>
  );
};

export default MovieGrid;
