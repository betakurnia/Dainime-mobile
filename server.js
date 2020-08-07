const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Route
const episodeAnime = require("./routes/api/episodeAnime");
const anime = require("./routes/api/anime");
const adminAnime = require("./routes/api/adminAnime");
const adminEpisodeAnime = require("./routes/api/adminEpisodeAnime");

const app = express();

const cors = require("cors");

// file
const path = require("path");

// DB Config
const db = require("./config/keys").mongoURI;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("./client/src/image", express.static("public"));

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api", episodeAnime);
app.use("/api", anime);
app.use("/api", adminAnime);
app.use("/api", adminEpisodeAnime);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
