const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AnimeSchema = new Schema({
  title: {
    type: String
  },
  synopsis: {
    type: String
  },
  aired: {
    type: Date
  },
  type: {
    type: String
  },
  status: {
    type: String
  },
  genre: {
    type: [String]
  },
  episodes: {
    type: String
  },
  premiered: {
    type: String
  },
  studio: {
    type: String
  },
  source: {
    type: String
  },
  duration: {
    type: String
  },
  imageAnime: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Anime = mongoose.model("animes", AnimeSchema);
