import {
  GET_LAST_RELEASE,
  GET_LAST_RELEASED,
  GET_EPISODE,
  GET_LAST_EPISODE,
  GET_ALL_EPISODE,
  EPISODE_LOADING,
  ANIME_LOADING_FALSE
} from "../actions/types";

const initialState = {
  episode: {},
  lastRelease: {},
  lastReleased: {},
  lastEpisode: {},
  allEpisode: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case EPISODE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_EPISODE:
      return {
        ...state,
        episode: action.payload,
        loading: false
      };
    case GET_LAST_RELEASE:
      return {
        ...state,
        lastRelease: action.payload,
        loading: false
      };
    case GET_LAST_RELEASED:
      return {
        ...state,
        lastReleased: action.payload,
        loading: false
      };
    case GET_LAST_EPISODE:
      return {
        ...state,
        lastEpisode: action.payload
      };
    case GET_ALL_EPISODE:
      return {
        ...state,
        allEpisode: action.payload,
        loading: false
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
