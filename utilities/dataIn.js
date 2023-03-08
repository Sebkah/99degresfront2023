const csv = require('csvtojson');
const fs = require('fs');

const axios = require('axios');

const csvFilePath = 'tags.csv';

const postTags = async () => {
  const data = await csv().fromFile('csvFilePath');
  console.log(data[0]['description français']);
  const tags = data.map((movie) => {
    const tag = movie.tag;
    const descFR = movie['description français'];
    return { tag, descFR };
  });

  console.log(tags);

  const movies = await axios.get('http://localhost:1337/projects');

  movies.data.forEach(({ id }, index) => {
    console.log(id);

    axios.put(`http://localhost:1337/projects/${id}`, {
      tag: tags[index].tag,
      description: tags[index].descFR,
    });
  });
};

postTags();
