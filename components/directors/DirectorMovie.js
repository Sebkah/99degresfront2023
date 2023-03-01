import React from 'react';

export function DirectorMovie({ movie }) {
  const { title, image, id } = movie;
  return (
    <div
      key={id}
      style={{
        backgroundImage: `url(${image.formats.medium.url})`,
      }}
      className="director-movie"
    >
      <div className="movie-title">{title}</div>
    </div>
  );
}
