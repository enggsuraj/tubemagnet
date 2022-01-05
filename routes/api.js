const router = require("express").Router();
const ytdl = require("ytdl-core");

// CONVERT URL IN FORMAT
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
router.get("/audio", async (req, res) => {
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
router.get("/thumbnaildata", async (req, res) => {
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
router.get("/tagdata", async (req, res) => {
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

module.exports = router;
