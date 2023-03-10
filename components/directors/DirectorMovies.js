import React from 'react';
import { DirectorMovie } from './DirectorMovie';

import { useInView } from 'framer-motion';
import { useRef } from 'react';
export function DirectorMovies({
  director,
  language,
  titleColor,

  color,
  palette,
}) {
  const ref = useRef(null);

  return (
    <div className="director-movies">
      <h1
        style={{
          backgroundColor: titleColor,
        }}
      >
        {language == 'en' ? 'movies' : 'films'}
      </h1>
      <div
        className="director-movies-grid"
        style={{
          gridTemplateColumns:
            director.movies.length <= 4 ? '1fr 1fr' : '1fr 1fr 1fr',
        }}
      >
        {director.movies.map((movie, index) => {
          return (
            <DirectorMovie
              color={color}
              director={director}
              key={movie.title}
              paletteSelector={palette}
              movie={movie}
              titleColor={'black'}
            />
          );
        })}
      </div>
    </div>
  );
}
