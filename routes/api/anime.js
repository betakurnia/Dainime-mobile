const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Anime = require("../../models/Anime");

// @route   GET api/new-season/count
// @desc    New season count
// @access  public
router.get("/new-season/count", (req, res) => {
  Anime.countDocuments({ premiered: "Winter 2020" }, function(err, anime) {
    res.json(anime);
  });
});

// @route   GET api/anime-list/count
// @desc    List anime count
// @access  public
router.get("/anime-list/count", (req, res) => {
  Anime.countDocuments({}, function(err, anime) {
    res.json(anime);
  });
});

// @route   GET api/anime-list/count/:sort
// @desc    List anime sort count
// @access  public
router.get("/anime-list/count/:sort", (req, res) => {
  Anime.countDocuments(
    {
      title: { $regex: new RegExp("^" + req.params.sort.toLowerCase(), "i") }
    },
    function(err, anime) {
      res.json(anime);
    }
  );
});

// @route   GET api/anime/:title
// @desc    Info anime
// @access  public
router.get("/anime/:title", (req, res) => {
  const title = req.params.title.toLowerCase();
  console.log(title);
  Anime.find({
    title: { $regex: new RegExp("^" + title, "i") }
  }).then(anime => res.json(anime));
});

// ()

// @route   GET api/anime-list
// @desc    List anime
// @access  public
router.get("/anime-list", (req, res) => {
  Anime.find()
    .sort({ title: "1" })
    .skip(Number(req.query.page))
    .limit(16)
    .then(anime => res.json(anime));
});

// @route   GET api/anime-list/:sort
// @desc    List anime
// @access  public
router.get("/anime-list/:sort", (req, res) => {
  Anime.find({
    title: { $regex: new RegExp("^" + req.params.sort.toLowerCase(), "i") }
  })
    .sort({ title: "1" })
    .skip(Number(req.query.page))
    .limit(16)
    .then(anime => res.json(anime));
});

// @route   GET api/new-season/
// @desc    GET new season anime
// @access  public
router.get("/new-season", (req, res) => {
  Anime.find({ premiered: "Winter 2020" })
    .sort({ date: "-1" })
    .skip(Number(req.query.page))
    .limit(24)
    .then(anime => res.json(anime));
});

// @route   GET api/schedule/
// @desc    GET schedule anime
// @access  public
router.get("/schedule", (req, res) => {
  Anime.find({ premiered: "Winter 2020" }).then(anime => res.json(anime));
});

// @route   GET api/ongoing/
// @desc    GET ongoing anime
// @access  public
router.get("/ongoing", (req, res) => {
  Anime.find({ status: "Airing" })
    .sort({ title: "1" })
    .then(anime => res.json(anime));
});

// @route   GET api/find-anime/
// @desc    GET find anime
// @access  public
router.get("/find-anime", (req, res) => {
  const anime = req.query.anime
    .toLowerCase()
    .trimStart()
    .trimEnd();

  Anime.find({ title: { $regex: new RegExp("^" + anime, "i") } })
    .sort({ title: "1" })
    .then(anime => res.json(anime))
    .catch(err => console.log(err));
});

module.exports = router;
