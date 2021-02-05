const express = require('express');
const fetch = require("node-fetch");

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'YouTube Downloader' });
});

/* Search for a YouTube video by title using the YouTube API */
router.get('/search', async (req, res) => {
  if (!req.query.title) return res.json({ success: false, msg: "Missing search term" });

  const endpoint = `https://www.googleapis.com/youtube/v3/search?key=${process.env.API_KEY}&part=snippet&q=${req.query.title}&maxResults=${10}&type=video`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return res.json(data);
});

module.exports = router;
