import { GET_PAGE_COUNT } from "./types";

import axios from "axios";

// Get last release page count
export const getLastReleasePageCount = () => dispatch => {
  axios
    .get("/api/recent-release/count")
    .then(res => dispatch({ type: GET_PAGE_COUNT, payload: res.data }))
    .catch(err => console.log(err.response.data));
};

// Get all episode page count
export const getAllEpisodePageCount = title => dispatch => {
  axios
    .get(`/api/all-episode/count/${title}`)
    .then(res => dispatch({ type: GET_PAGE_COUNT, payload: res.data }))
    .catch(err => console.log(err.response.data));
};

// Get anime list page count
export const getAnimeListPageCount = () => dispatch => {
  axios
    .get(`/api/anime-list/count`)
    .then(res => dispatch({ type: GET_PAGE_COUNT, payload: res.data }))
    .catch(err => console.log(err.response.data));
};

// Get anime list sort count
export const getAnimeListSortCount = sort => dispatch => {
  axios
    .get(`/api/anime-list/count/${sort}`)
    .then(res => dispatch({ type: GET_PAGE_COUNT, payload: res.data }))
    .catch(err => console.log(err.response.data));
};

// Get new season list  count
export const getNewSeasonCount = () => dispatch => {
  axios
    .get(`/api/new-season/count`)
    .then(res => dispatch({ type: GET_PAGE_COUNT, payload: res.data }))
    .catch(err => console.log(err.response.data));
};

// Get recent episode  count
export const getEpisodeCount = title => dispatch => {
  axios
    .get(`/api/recent-episode/count/${title}`)
    .then(res => dispatch({ type: GET_PAGE_COUNT, payload: res.data }))
    .catch(err => console.log(err.response.data));
};
