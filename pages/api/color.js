// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const ColorThief = require('colorthief');

const API_URL = require('../../config/index');

/* import { API_URL } from '../../config'; */

export default async function handler(req, res) {
  const img =
    'https://res.cloudinary.com/dkytpimnc/image/upload/v1643487150/S20_03_ENGINEENGINEREV_clean_2261771140.jpg';

  /*   ColorThief.getColor(img)
    .then((color) => {
      console.log(color);
    })
    .catch((err) => {
      console.log(err);
    }); */

  console.log(API_URL);

  /* const data = await fetch(`${API_URL}/directors`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const directors = await data.json();

  res.status(200).json({ directors }); */

  /*  ColorThief.getPalette(img, 10)
    .then((palette) => {
      res.status(200).json({ palette });
    })
    .catch((err) => {
      console.log(err);
    }); */
}
