import {
  GET_LAST_RELEASE,
  GET_LAST_RELEASED,
  GET_EPISODE,
  GET_LAST_EPISODE,
  GET_ALL_EPISODE,
  EPISODE_LOADING,
  ANIME_LOADING,
  ANIME_LOADING_FALSE
} from "./types";

import axios from "axios";

// Get recent release
export const getLastRelease = (page, isTrue = false) => dispatch => {
  if (isTrue) {
    dispatch(setEpisodeLoading());
  }
  axios
    .get(`/api/recent-release/?page=${page}`)
    .then(res => {
      dispatch({ type: GET_LAST_RELEASE, payload: res.data });
    })
    .catch(err => console.log(err.response.data));
};

// Get recent release2
export const getLastRelease2 = limit => dispatch => {
  axios
    .get(`/api/recent-release2/?limit=${limit}`)
    .then(res => dispatch({ type: GET_LAST_RELEASED, payload: res.data }))
    .catch(err => console.log(err.response.data));
};

// Get episode
export const getEpisode = (title, episode) => dispatch => {
  dispatch(setAnimeLoading());
  axios
    .get(`/api/episode-anime/${title}/${episode}`)
    .then(res => {
      dispatch({ type: GET_EPISODE, payload: res.data });
      dispatch(setLoadingFalse());
      document.title = `${res.data[0].title} Episode ${res.data[0].episode}`;
    })
    .catch(err => console.log(err.response.data));
};

// Get recent episode
export const getLastEpisode = (title, skip, limit) => dispatch => {
  axios
    .get(`/api/recent-episode/${title}`)
    .then(res => dispatch({ type: GET_LAST_EPISODE, payload: res.data }))
    .catch(err => console.log(err.response.data));
};

// Get all episode
export const getAllEpisode = (title, page, isTrue = false) => dispatch => {
  if (isTrue) {
    dispatch(setEpisodeLoading());
  }
  axios
    .get(`/api/all-episode/${title}/?page=${page}`)
    .then(res => dispatch({ type: GET_ALL_EPISODE, payload: res.data }))
    .catch(err => console.log(err.response.data));
};

// Episode loading
export const setEpisodeLoading = () => {
  return {
    type: EPISODE_LOADING
  };
};

// Anime loading
export const setAnimeLoading = () => {
  return {
    type: ANIME_LOADING
  };
};

// Anime loading false
export const setLoadingFalse = () => {
  return {
    type: ANIME_LOADING_FALSE
  };
};
