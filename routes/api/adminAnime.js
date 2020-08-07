const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const Anime = require("../../models/Anime");

const DIR = "./client/public/image/anime";

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

// @route   POST api/admin/anime
// @desc    Create  anime
// @access  public
router.post("/admin/anime", (req, res) => {
  const newAnime = new Anime({
    title: req.body.title,
    synopsis: req.body.synopsis,
    type: req.body.type,
    status: req.body.status,
    aired: new Date(req.body.aired),
    genre: req.body.genre.split(","),
    episodes: req.body.episodes,
    premiered: req.body.premiered,
    studio: req.body.studio,
    source: req.body.source,
    duration: req.body.duration
  });

  newAnime.save().then(Anime => res.json(Anime));
});

// @route   POST api/admin/anime/:id
// @desc    Upload  file
// @access  public
router.post("/admin/anime/:id", upload.single("imageAnime"), (req, res) => {
  Anime.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { imageAnime: req.file.filename } },
    { new: true }
  ).then(Anime => res.json({ msg: "success add file" }));
});

// @route   GET api/anime/:title
// @desc    Info anime
// @access  public
router.get("/anime/:title", (req, res) => {
  const title = req.params.title.split("-").join(" ");
  Anime.find({
    title: { $regex: new RegExp("^" + title.toLowerCase(), "i") }
  }).then(anime => res.json(anime));
});

module.exports = router;
