import React from 'react';
import { DirectorMovie } from './DirectorMovie';

import { useInView } from 'framer-motion';
import { useRef } from 'react';
export function DirectorMovies({ director, language, titleColor }) {
  const ref = useRef(null);

  return (
    <div className="director-movies">
      <h1
        style={{
          color: titleColor,
        }}
      >
        {language == 'en' ? 'movies' : 'films'}
      </h1>
      <div
        className="director-movies-grid"
        style={{
          gridTemplateColumns: '1fr 1fr 1fr',
        }}
      >
        {director.movies.map((movie, index) => {
          return (
            <DirectorMovie
              director={director}
              key={movie.title}
              movie={movie}
              titleColor={'black'}
            />
          );
        })}
      </div>
    </div>
  );
}
