const fetch = require('node-fetch');
const fs = require('fs');

const getMovies = async () => {
  const res = await fetch('http://localhost:1337/projects');
  const movies = await res.json();
  /*   console.log(movies); */
  const movieTitles = movies.map(({ title }) => {
    return `${title}`;
  });

  const csv = movieTitles.reduce((acc, current) => {
    return acc + '\n' + current;
  }, 'title ');

  console.log(csv);

  const json = JSON.stringify(movieTitles);

  fs.writeFile('movieNames.csv', csv, (err) => {
    console.log(err);
  });
  console.log(movieTitles);
};

getMovies();
