const express = require('express');
const ytdl = require("ytdl-core");
const cors = require("cors");

const router = express.Router();
router.use(cors());

router.get("/mp3", async (req, res) => {
    if (!req.query.url) return res.redirect('/'); 
    
    const url = req.query.url;
    console.log(`URL: ${url}`);
    let title = "audio"; // set a default title

    try {
        // Get title of video
        const info = await ytdl.getBasicInfo(url, { format: "mp4" });
        title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");

        // Download video with filename = video title
        res.header("Content-Disposition", `attachment; filename="${title}.mp3"`);
        ytdl(url, { format: "mp3", filter: "audioonly" }).pipe(res);
    } catch (err) {
      console.error(err);
      return res.redirect('/');
    }
});

router.get("/mp4", async (req, res) => {
    if (!req.query.url) return res.redirect('/');

    const url = req.query.url;
    let title = "video";

    try {
        // Get title of video
        const info = await ytdl.getBasicInfo(url, { format: "mp4" });
        title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
  
        // Download video with filename = video title
        res.header("Content-Disposition", `attachment; filename="${title}.mp4"`);
        ytdl(url, { format: "mp4" }).pipe(res);
    } catch (err) {
      console.error(err);
      return res.redirect('/');
    }
});

module.exports = router;