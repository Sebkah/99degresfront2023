import React from 'react';

import Image from 'next/image';

import { useRouter } from 'next/router';

import { imageUrlBuilder } from '../../config/sanity';

const MovieGrid = ({ movies, title }) => {
  const router = useRouter();
  if (title == "en sortant de l'école" || title == 'school is over')
    title = 'esd';
  if (title == "films de fin d'études") title = "fin d'études";

  /*   console.log(movies); */

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
        {movies.map(({ title, mainImage, palette, slug, gif, GifHd }) => {
          const x = 0;

          //not using colors for movies anymore, it is not calculated in the parent component
          /*   const color = `rgb(${palette[x][0]}, ${palette[x][1]}, ${palette[x][2]}) `; */
          /*  console.log(gifHD); */

          let src;

          if (GifHd) {
            src = GifHd.asset.url;
          }

          return (
            <div
              key={title}
              className="movie"
              onClick={() => {
                router.push(`/movies/${slug.current}`);
              }}
            >
              <div className="movie-title" style={{ backgroundColor: 'black' }}>
                {' '}
                {title}
              </div>

              {GifHd ? (
                <video
                  autoPlay
                  loop
                  muted
                  src={src}
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
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MovieGrid;
