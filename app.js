const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");
let path = require("path");

const app = express();

app.use(cors());

app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));

let port = process.env.PORT || 3000;

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

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/yt2mp3", (req, res) => {
  res.render("yt2mp3");
});

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

// app.get("/audiotest", async (req, res) => {
//   let info = await ytdl.getInfo("https://www.youtube.com/watch?v=cRsV7OXIyi0");
//   let audioFormats = ytdl.filterFormats(info.formats, "audioonly");

//     res.send(
//       JSON.stringify({
//         audioURL: audioFormats[1].url,
//         thumbnail: info.videoDetails.thumbnails,
//         title: info.videoDetails.title,
//       })
//     );

//   res.send(audioFormats);
//   res.send(info);
// });

app.listen(port, (req, res) => {
  console.log("Server Listening...");
});
