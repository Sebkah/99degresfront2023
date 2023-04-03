const csv = require('csvtojson');
const fs = require('fs');

const axios = require('axios');

const https = require('https'); // or 'https' for https:// URLs

const file = fs.createWriteStream('data.csv');
/* const request = https.get(
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTAga7TFwkicIPA60U1jiuByNqo9ZrvueEWppkzwB6_tcnVauej_Tti6XsTa65yiiwVglDdbmSq3X44/pub?gid=1367381442&single=true&output=csv',
  function (response) {
    response.pipe(file);

    // after download completed close filestream
    file.on('finish', () => {
      file.close();
      console.log('Download Completed');
    });
  }
); */

const csvFilePath = 'data.csv';

const postTags = async () => {
  const csvData = await axios.get(
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTAga7TFwkicIPA60U1jiuByNqo9ZrvueEWppkzwB6_tcnVauej_Tti6XsTa65yiiwVglDdbmSq3X44/pub?gid=1367381442&single=true&output=csv'
  );

  fs.writeFileSync('data.csv', csvData.data);
  const data = await csv().fromFile(csvFilePath);
  console.log(data[0]['description français']);
  const tags = data.map((movie) => {
    const tag = movie.tag;
    const title = movie.Titre;
    const descFR = movie['description français'];
    const descEN = movie['description anglais'];
    return { tag, descFR, descEN, title };
  });

  console.log(tags);

  const movies = await axios.get('http://localhost:1337/projects');

  movies.data.forEach(({ id, title }) => {
    const tagData = tags.filter((tag) => tag.title == title)[0];
    /*    console.log(tagData, title); */

    axios.put(`http://localhost:1337/projects/${id}`, {
      tag: tagData.tag,
      descFR: tagData.descFR,
      descEN: tagData.descEN,
    });
  });
};

postTags();
