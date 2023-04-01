/* import VideoDownloader from '@leorossi/vimeo-downloader'; */
/* import axios from 'axios';
import path from 'path';
import fs from 'fs'; */
const axios = require('axios');
const path = require('path');

const https = require('node:https');

const fs = require('fs');
const ytdl = require('ytdl-core');
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above

(async () => {
  const moviesData = await axios.get('http://localhost:1337/projects');

  const urls = moviesData.data.map((current) => {
    let url = null;
    let type = null;

    if (current.videoUrl) {
      if (
        current.videoUrl.includes('you') ||
        current.videoUrl.includes('vimeo')
      ) {
        url = current.videoUrl;
        /*  url.replace('https', 'http'); */
      }
      if (current.videoUrl.includes('you')) type = 'youtube';
      if (current.videoUrl.includes('vimeo')) type = 'vimeo';
    }

    return { name: current.slug, url, type };
  });

  urls.forEach(async ({ url, name, type }) => {
    if (type == 'youtube') {
      try {
        ytdl(url).pipe(
          fs.createWriteStream(path.join(process.cwd(), `${name}.mp4`))
        );
      } catch (error) {
        console.log(error);
      }
    }
    if (type == 'vimeo') {
      try {
        run(url, name);
      } catch (error) {
        console.log(error);
      }
    }
  });
})();

async function run(url, name) {
  // input video url
  let inputVideoUrl = url;
  // check is there ending slash and remove it
  if (inputVideoUrl.slice(-1) === '/') {
    inputVideoUrl = inputVideoUrl.slice(0, -1);
  }
  // get video id from url
  const videoId = inputVideoUrl.split('/').pop();

  console.log(videoId);

  // video json config url
  const videoJsonConfigUrl = `https://player.vimeo.com/video/${videoId}/config`;
  // get video json config
  const videoConfig = await new Promise((resolve, reject) => {
    https.get(videoJsonConfigUrl, (res) => {
      let result = '';
      res.on('data', (data) => {
        result += data;
      });
      res.on('error', (err) => {
        reject(err);
      });
      res.on('end', () => {
        resolve(JSON.parse(result));
      });
    });
  });

  /*   console.log(videoConfig); */

  // video quality items
  const videoQualityItems = videoConfig.request.files.progressive;
  // select file url
  const targetItem = videoQualityItems.reduce((prev, curr) => {
    return prev.width * prev.height > curr.width * curr.height ? prev : curr;
  });
  const targetVideoFileUlr = targetItem.url;

  // download it
  await new Promise((resolve, reject) => {
    https.get(targetVideoFileUlr, (res) => {
      const file = fs.createWriteStream(
        path.join(process.cwd(), `${name}.mp4`)
      );
      res.pipe(file);
      res.on('error', (err) => {
        reject(err);
      });
      res.on('end', () => {
        resolve();
      });
    });
  });
}
