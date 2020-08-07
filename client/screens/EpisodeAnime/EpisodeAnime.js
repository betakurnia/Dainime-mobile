import React, { useState, useEffect, Fragment } from "react";
import { StyleSheet } from "react-native";

// redux
import { useSelector, useDispatch } from "react-redux";
import { GET_EPISODE, EPISODE_LOADING } from "../../actions/types";

// npm
import { Content, Spinner } from "native-base";
import axios from "axios";

// components
import HeaderAnime from "./HeaderAnime";
import DownloadLink from "./DownloadLink";

function EpisodeAnime({ route, navigation }) {
  const { episodes } = route.params;

  const dispatch = useDispatch();

  const episode = Array.from(useSelector(state => state.episodeAnime.episode));

  const loading = useSelector(state => state.episodeAnime.loading);

  useEffect(() => {
    dispatch({
      type: EPISODE_LOADING
    });
    axios
      .get(
        `http://192.168.18.17:5000/api/episode-anime/${episodes.title}/${episodes.episode}`
      )
      .then(res => {
        dispatch({ type: GET_EPISODE, payload: res.data });
      })
      .catch(err => console.log(err.response.data));
  }, []);

  return (
    <Content padder>
      {loading ? (
        <Spinner style={style.utility__spinner} color="blue" />
      ) : (
        <Fragment>
          <HeaderAnime episode={episode} navigation={navigation} />
          <DownloadLink episode={episode} />
        </Fragment>
      )}
    </Content>
  );
}

const style = StyleSheet.create({
  utility__spinner: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "center"
  }
});

export default EpisodeAnime;
