import React from 'react';

import Image from 'next/image';

import { useRouter } from 'next/router';

const MovieGrid = ({ movies, title }) => {
  const router = useRouter();
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
        {movies.map(({ title, image, palette, slug, gif, gifHD }) => {
          const { url, width, height } = image.formats.large;
          const x = 0;
          const color = `rgb(${palette[x][0]}, ${palette[x][1]}, ${palette[x][2]}) `;
          console.log(title, gif);

          let src;
          if (gif != undefined)
            src = title === 'featured' ? gifHD.url : gif.url;

          return (
            <div
              key={title}
              className="movie"
              onClick={() => {
                router.push(`/movies/${slug}`);
              }}
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
                  src={src}
                  className="movie-image"
                ></video>
              ) : (
                <Image
                  className="movie-image"
                  src={url}
                  width={width}
                  height={height}
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
