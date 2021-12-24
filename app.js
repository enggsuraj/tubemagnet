const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");
var path = require("path");

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

const convertURL = (url) => {
  let newURL;
  if (url.includes("youtu.be")) {
    newURL = url.split("https://youtu.be/");
    return `https://www.youtube.com/watch?v=${newURL[1]}`;
  } else if (url.includes("https://youtube.com/shorts/")) {
    newURL = url.split("https://youtube.com/shorts/");
    return `https://www.youtube.com/watch?v=${newURL[1]}`;
  } else {
    return url;
  }
};

// YOUTUBE TO MP3 CONVERTER
app.get("/audio", async (req, res) => {
  const videoID = req.query.youtubeURL;
  convertURL(videoID);
  let info = await ytdl.getInfo(videoID);
  let audioFormats = ytdl.filterFormats(info.formats, "audioonly");

  res.send(
    JSON.stringify({
      audioURL: audioFormats[1].url,
      thumbnail: info.videoDetails.thumbnails,
      title: info.videoDetails.title,
    })
  );
});

app.get("/audiotest", async (req, res) => {
  let info = await ytdl.getInfo("https://www.youtube.com/watch?v=cRsV7OXIyi0");
  let audioFormats = ytdl.filterFormats(info.formats, "audioonly");

  //   res.send(
  //     JSON.stringify({
  //       audioURL: audioFormats[1].url,
  //       thumbnail: info.videoDetails.thumbnails,
  //       title: info.videoDetails.title,
  //     })
  //   );

  //res.send(audioFormats);
  res.send(info);
});

app.listen(8000, (req, res) => {
  console.log("Server Listening at 8000");
});
