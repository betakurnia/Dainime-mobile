const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const EpisodeAnime = require("../../models/EpisodeAnime");

// @route   GET api/recent-episode/:title
// @desc    GET recent episode
// @access  public
router.get("/recent-episode/:title", (req, res) => {
  const title = req.params.title
    .split("-")
    .join(" ")
    .toLowerCase();

  EpisodeAnime.countDocuments(
    { title: { $regex: new RegExp("^" + title, "i") } },
    function(err, episodeAnime) {
      let skip;

      if (episodeAnime - 25 > 0) {
        skip = episodeAnime - 25;
      } else {
        skip = 0;
      }

      EpisodeAnime.find({
        title: { $regex: new RegExp("^" + title, "i") }
      })
        .sort({ date: "-1" })
        .skip(skip)
        .limit(25)
        .then(episodeAnimed => res.json(episodeAnimed));
    }
  );
});

// @route   GET api/recent-episode/count/:title
// @desc    GET recent episode count
// @access  public
router.get("/recent-episode/count/:title", (req, res) => {
  const title = req.params.title
    .split("-")
    .join(" ")
    .toLowerCase();

  EpisodeAnime.countDocuments(
    { title: { $regex: new RegExp("^" + title, "i") } },
    function(err, episodeAnime) {
      if (err) {
        console.log(err);
      }

      res.json(episodeAnime);
    }
  );
});

// @route   GET api/recent-release/count
// @desc    GET recent release count
// @access  public
router.get("/recent-release/count", (req, res) => {
  EpisodeAnime.countDocuments({}, function(err, episodeAnime) {
    res.json(episodeAnime);
  });
});

// @route   GET api/all-episode/count
// @desc    GET episode anime count
// @access  public
router.get("/all-episode/count/:title", (req, res) => {
  const title = req.params.title
    .split("-")
    .join(" ")
    .toLowerCase();
  EpisodeAnime.countDocuments(
    { title: { $regex: new RegExp("^" + title, "i") } },
    function(err, episodeAnime) {
      res.json(episodeAnime);
    }
  );
});

// @route   GET api/recent-release/?page=value
// @desc    GET episode anime recent release
// @access  public
router.get("/recent-release", (req, res) => {
  EpisodeAnime.find()
    .sort({ date: "-1" })
    .skip(Number(req.query.page))
    .limit(15)
    .then(episodeAnime => {
      res.json(episodeAnime);
    })
    .catch(err => res.json(err));
});

// @route   GET api/recent-release2/?page=value
// @desc    GET episode anime recent release
// @access  public
router.get("/recent-release2", (req, res) => {
  const limited = Number(req.query.limit);
  EpisodeAnime.find()
    .sort({ date: "-1" })
    .skip(0)
    .limit(limited)
    .then(episodeAnime => {
      res.json(episodeAnime);
    })
    .catch(err => console.log(err));
});

// @route   GET api/episode-anime/:title/:episode
// @desc    GET current episode
// @access  public
router.get("/episode-anime/:title/:episode", (req, res) => {
  const title = req.params.title
    .split("-")
    .join(" ")
    .toLowerCase();

  EpisodeAnime.find({
    title: { $regex: new RegExp("^" + title, "i") },
    episode: req.params.episode
  })
    .populate("anime", ["title", "synopsis"])
    .exec(function(err, episodeAnime) {
      res.json(episodeAnime);
    });
});

// @route   GET api/all-episode/:title/?page
// @desc    GET episode anime recent release
// @access  public
router.get("/all-episode/:title", (req, res) => {
  const title = req.params.title;
  EpisodeAnime.find({
    title: { $regex: new RegExp("^" + title, "i") }
  })
    .sort({ date: "-1" })
    .skip(Number(req.query.page))
    .limit(15)
    .then(episodeAnime => res.json(episodeAnime));
});

module.exports = router;
