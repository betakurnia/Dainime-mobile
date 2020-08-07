const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const EpisodeAnimeSchema = new Schema({
  anime: {
    type: Schema.Types.ObjectId,
    ref: "animes"
  },
  title: {
    type: String
  },
  episode: {
    type: String
  },

  FileUpload360p: {
    type: String
  },
  FileUpload480p: {
    type: String
  },
  FileUpload720p: {
    type: String
  },
  ClickNUpload360p: {
    type: String
  },
  ClickNUpload480p: {
    type: String
  },
  ClickNUpload720p: {
    type: String
  },
  Upload360p: {
    type: String
  },
  Upload480p: {
    type: String
  },
  Upload720p: {
    type: String
  },
  imageEpisode: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = EpisodeAnime = mongoose.model(
  "episodeAnime",
  EpisodeAnimeSchema
);
