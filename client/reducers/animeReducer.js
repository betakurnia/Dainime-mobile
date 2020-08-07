import {
  GET_ANIME,
  GET_NEW_SEASON,
  GET_ANIME_LIST,
  GET_SCHEDULE,
  GET_ONGOING_ANIME,
  FIND_ANIME,
  ANIME_LOADING,
  ANIME_LOADING_FALSE
} from "../actions/types";

const initialState = {
  anime: {},
  ongoingAnime: {},
  animeList: {},
  newSeason: {},
  schedule: {},
  findAnime: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ANIME_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ANIME:
      return {
        ...state,
        anime: action.payload,
        loading: false
      };
    case GET_ONGOING_ANIME:
      return {
        ...state,
        ongoingAnime: action.payload,
        loading: false
      };
    case GET_NEW_SEASON:
      return {
        ...state,
        newSeason: action.payload,
        loading: false
      };
    case GET_ANIME_LIST:
      return {
        ...state,
        animeList: action.payload,
        loading: false
      };
    case GET_SCHEDULE:
      return {
        ...state,
        schedule: action.payload,
        loading: false
      };
    case FIND_ANIME:
      return {
        ...state,
        findAnime: action.payload
      };
    case ANIME_LOADING_FALSE:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
