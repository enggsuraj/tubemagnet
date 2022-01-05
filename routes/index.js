const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/yt2mp3", (req, res) => {
  res.render("yt2mp3");
});

router.get("/privacy", (req, res) => {
  res.render("privacy");
});

router.get("/terms", (req, res) => {
  res.render("terms");
});

router.get("/disclaimer", (req, res) => {
  res.render("disclaimer");
});

router.get("/thumbnail", (req, res) => {
  res.render("thumbnail");
});

router.get("/tag", (req, res) => {
  res.render("tag");
});

module.exports = router;
