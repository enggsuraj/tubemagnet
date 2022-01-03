const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");
let path = require("path");
const { log } = require("console");

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

app.get("/privacy", (req, res) => {
  res.render("privacy");
});

app.get("/terms", (req, res) => {
  res.render("terms");
});

app.get("/disclaimer", (req, res) => {
  res.render("disclaimer");
});

app.get("/thumbnail", (req, res) => {
  res.render("thumbnail");
});

app.get("/tag", (req, res) => {
  res.render("tag");
});

// YOUTUBE TO MP3 CONVERTER
app.get("/audio", async (req, res) => {
  try {
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
  } catch (e) {
    console.log(e);
  }
});

// THUMBNAIL DOWNALOAD
app.get("/thumbnaildata", async (req, res) => {
  try {
    const videoID = req.query.youtubeURL;
    convertURL(videoID);
    let info = await ytdl.getInfo(videoID);
    res.send(JSON.stringify(info.videoDetails));
  } catch (e) {
    console.log(e);
  }
});

// TAG DOWNLOAD
app.get("/tagdata", async (req, res) => {
  try {
    const videoID = req.query.youtubeURL;
    convertURL(videoID);
    let info = await ytdl.getInfo(videoID);
    res.send(
      JSON.stringify({
        keywords: info.videoDetails.keywords,
        thumbnails: info.videoDetails.thumbnails,
        title: info.videoDetails.title,
      })
    );
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
  console.log("Server Listening...");
});
