const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const EpisodeAnime = require("../../models/EpisodeAnime");

const DIR = "./client/public/image/episode-anime";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    cb(null, Date.now() + "-" + fileName);
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  }
});

// @route   POST api/admin/episode-anime
// @desc    Create episode anime
// @access  public
router.post("/admin/episode-anime", (req, res) => {
  const newEpisodeAnime = new EpisodeAnime({
    anime: req.body.anime,
    title: req.body.title,
    episode: req.body.episode,
    imageEpisode: req.body.imageEpisode,
    FileUpload360p: req.body.FileUpload360p,
    FileUpload480p: req.body.FileUpload480p,
    FileUpload720p: req.body.FileUpload720p,
    ClickNUpload360p: req.body.ClickNUpload360p,
    ClickNUpload480p: req.body.ClickNUpload480p,
    ClickNUpload720p: req.body.ClickNUpload720p,
    Upload360p: req.body.Upload360p,
    Upload480p: req.body.Upload480p,
    Upload720p: req.body.Upload720p
  });

  newEpisodeAnime.save().then(EpisodeAnime => res.json(EpisodeAnime));
});

// @route   POST api/admin/episode-anime/:id
// @desc    Upload  file
// @access  public
router.post(
  "/admin/episode-anime/:id",
  upload.single("imageEpisode"),
  (req, res) => {
    EpisodeAnime.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { imageEpisode: req.file.filename } },
      { new: true }
    ).then(() => res.json({ msg: "success add file" }));
  }
);

module.exports = router;
