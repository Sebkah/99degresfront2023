const ffmpeg = require('ffmpeg');
const path = require('path');
const fs = require('fs');
const { start } = require('repl');

//joining path of directory
const directoryPath = path.join(__dirname, 'movies');
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  //listing all files using forEach
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    outputGif(file);
    /*     console.log(file); */
  });
});

const outputGif = (file) => {
  const format = 'mp4';
  let savePath = path.join(__dirname, 'gifs', file);
  const videoPath = path.join(__dirname, 'movies', file);
  savePath = savePath.replace(/\.[^/.]+$/, '') + '.' + format;
  /*   console.log(savePath); */
  try {
    var process = new ffmpeg(videoPath);
    process.then(
      function (video) {
        /*  console.log(video.metadata.duration.seconds); */
        let startTime = video.metadata.duration.seconds / 2;
        startTime = Math.floor(startTime);
        console.log(file, typeof startTime, startTime);
        video.addCommand('-b:a', '1024');
        video
          .setVideoStartTime(startTime)
          .setVideoFormat(format)
          .setVideoDuration(6)
          /*    .setVideoAspectRatio('16:9') */
          .setVideoSize('?x480 Fixed height, calculate width', true, true)

          .save(savePath, function (error, file) {
            if (error) console.log(error);
            if (!error) console.log('Video file: ' + file);
          });
      },
      function (err) {
        console.log('Error: ' + err);
      }
    );
  } catch (e) {
    console.log(e.code);
    console.log(e.msg);
  }
};
