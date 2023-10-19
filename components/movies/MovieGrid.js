import React from 'react';

import Image from 'next/image';

import { useRouter } from 'next/router';

import { imageUrlBuilder } from '../../config/sanity';
import Link from 'next/link';

const MovieGrid = ({ movies, title }) => {
  /*   movies = movies.sort((a, b) => {
    console.log(b.priority);
    const aPriority = a.priority === undefined ? 0 : a.priority;
    const bPriority = b.priority === undefined ? 0 : b.priority;
    return aPriority < bPriority;
  }); */

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
        {movies.map(({ title, mainImage, slug, gif }) => {
          return (
            <Link
              key={title}
              className="movie"
              href={`/movies/${slug.current}`}
            >
              <div className="movie-title" style={{ backgroundColor: 'black' }}>
                {' '}
                {title}
              </div>

              {gif ? (
                <video
                  autoPlay
                  loop
                  muted
                  src={gif.secure_url}
                  className="movie-image"
                ></video>
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
        })}
      </div>
    </>
  );
};

export default MovieGrid;
