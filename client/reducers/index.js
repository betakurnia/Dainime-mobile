import { combineReducers } from "redux";
import animeReducer from "./animeReducer";
import episodeAnimeReducer from "./episodeAnimeReducer";
import helperReducer from "./helperReducer";

export default combineReducers({
  anime: animeReducer,
  episodeAnime: episodeAnimeReducer,
  helper: helperReducer
});
