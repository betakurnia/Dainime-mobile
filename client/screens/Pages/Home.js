import React, { Fragment, useState, useEffect } from "react";
import { Text, Image, StyleSheet, Dimensions } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

// redux
import { useSelector, useDispatch } from "react-redux";
import { GET_LAST_RELEASE, ANIME_LOADING_FALSE } from "../../actions/types";

// npm
import { Content, Card, CardItem, H2, Body, Spinner } from "native-base";
import dateFormat from "dateformat";
import axios from "axios";

// image
import ImageData from "../ImageData/ImageData";

function Home(props) {
  const { navigation } = props;

  const dispatch = useDispatch();

  const lastRelease = Array.from(
    useSelector(state => state.episodeAnime.lastRelease)
  );

  const loading = useSelector(state => state.episodeAnime.loading);

  const lastReleaseLength = lastRelease.length || 0;

  dateFormat.i18n = {
    dayNames: [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jum'at",
      "Sabtu"
    ],
    monthNames: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"]
  };

  const [page, setPage] = useState(0);

  for (let index = 0; index < lastReleaseLength; index++) {
    lastRelease[index].imageEpisode = ImageData.anime.home[index];
  }

  let lastReleased =
    lastRelease &&
    lastRelease.map(lastRelease => (
      <Fragment key={lastRelease._id}>
        <Col>
          <Card>
            <CardItem
              style={{
                paddingLeft: Dimensions.get("window").width / 120,
                paddingRight: Dimensions.get("window").width / 120
              }}
            >
              <Body>
                <Text
                  style={
                    (style.utility__fontSize_12px,
                    {
                      height: 36
                    })
                  }
                  onPress={() => {
                    navigation.navigate("EpisodeAnime", {
                      episodes: lastRelease
                    });
                  }}
                >
                  {lastRelease.title}
                </Text>
                <Text style={style.utility__fontSize_12px}>
                  Episode {lastRelease.episode}
                </Text>
                <Text
                  style={(style.utility__fontSize_12px, { color: "#DDDDDD" })}
                >
                  {dateFormat(lastRelease.date, "dddd,h:MM  ")}
                </Text>
                <Image
                  style={{ width: "100%", height: 150 }}
                  source={lastRelease.imageEpisode}
                  resizeMode="cover"
                  onPress={() => {
                    navigation.navigate("EpisodeAnime", {
                      episodes: lastRelease
                    });
                  }}
                ></Image>
              </Body>
            </CardItem>
          </Card>
        </Col>
      </Fragment>
    ));

  let groups = [];
  let children = [];
  let i = 1;
  let total = lastRelease.length;
  let x = 3;

  while (i <= total) {
    children.push(lastReleased.shift());
    if (i % 3 === 0) {
      groups.push(<Row>{children}</Row>);
      children = [];
      x = x + 3;
    }

    if (x - total === 2 - y) {
      if (y === 1) {
        children.push(<Col></Col>);
      } else {
        children.push(<Col></Col>);
        children.push(<Col></Col>);
      }
      groups.push(<Row>{children}</Row>);
      children = [];
    }
    i += 1;
    let y = i % 3 === 2 ? 1 : 0;
  }

  useEffect(() => {
    dispatch({
      type: ANIME_LOADING_FALSE
    });
    axios
      .get(`http://192.168.18.17:5000/api/recent-release/?page=${page}`)
      .then(res => {
        dispatch({ type: GET_LAST_RELEASE, payload: res.data });
      })
      .catch(err => console.log(err.response.data));
  }, [page]);

  return (
    <Content padder>
      <H2 style={style.headingTitle}>Anime</H2>
      <Grid style={{ paddingTop: width / 22 }}>
        {loading ? (
          <Spinner style={style.utility__spinner} color="blue" />
        ) : (
          groups
        )}
      </Grid>
    </Content>
  );
}

let { width } = Dimensions.get("screen");

const style = StyleSheet.create({
  headingTitle: {
    paddingTop: width / 18,
    paddingLeft: width / 18
  },
  utility__fontSize_12px: {
    fontSize: 12
  },
  utility__spinner: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "center"
  }
});

export default Home;
