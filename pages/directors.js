import React from 'react';

import PageTitle from '../components/page/PageTitle';

import { API_URL } from '../config';

import { useState } from 'react';

const directors = ({ directors }) => {
  const [featured, setFeatured] = useState(null);

  console.log(directors);
  return (
    <div className="page-container">
      <PageTitle en="directors" fr="réalisateurs" />
      <div className="directors-grid">
        {directors.map((director) => {
          const { Nom } = director;
          const [name, surname] = Nom.split(' ');
          return (
            <div
              className="director"
              onClick={() => {
                setFeatured(director);
              }}
              /*  onMouseLeave={() => {
                setFeatured(null);
              }} */
              key={Nom}
            >
              <div className="name"> {name}</div>
              <div className="surname">{surname}</div>
            </div>
          );
        })}
      </div>
      <div className="director-featured">
        <div className="image">
          {featured && <img src={featured.image.formats.large.url} alt="" />}
        </div>
        <div className="desc"></div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const data = await fetch(`${API_URL}/directors`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const directors = await data.json();
  return {
    props: { directors }, // will be passed to the page component as props
  };
}

export default directors;
