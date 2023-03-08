import React from 'react';

import Image from 'next/image';

const MovieGrid = ({ movies, title }) => {
  return (
    <div className="movie-section">
      <h1 className="movie-section-title">{title}</h1>
      <div className="movie-grid">
        {movies.map(({ title, image }) => {
          const { url, width, height } = image.formats.medium;

          return (
            <div key={title} className="movie">
              {title}

              <Image src={url} width={width} height={height}></Image>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieGrid;
