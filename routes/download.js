const express = require('express');
const ytdl = require("ytdl-core");
const cors = require("cors");

const router = express.Router();
router.use(cors());

router.get("/mp3", async (req, res) => {
    if (!req.query.url) return res.json({ success: false, msg: "Invalid/Missing Input (URL)" }); 
    
    try {
      const url = req.query.url;

      let title = "audio";
  
      const info = await ytdl.getBasicInfo(url, { format: "mp4" });
      title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
  
  
      res.header("Content-Disposition", `attachment; filename="${title}.mp3"`);
      ytdl(url, { format: "mp3", filter: "audioonly" }).pipe(res);
    } catch (err) {
      console.error(err);
      res.json({ success: false, msg: "Invalid URL" });
    }
});

module.exports = router;