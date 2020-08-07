import React, { Fragment, useState, useEffect } from "react";
import { Text, Image, StyleSheet, Dimensions } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

// redux
import { useSelector, useDispatch } from "react-redux";
import { GET_NEW_SEASON, ANIME_LOADING } from "../../actions/types";

// npm
import { Content, Card, CardItem, H2, Body, Spinner } from "native-base";
import dateFormat from "dateformat";
import axios from "axios";

// image
import ImageData from "../ImageData/ImageData";

function NewSeason(props) {
  const { navigation } = props;

  const dispatch = useDispatch();

  const [page, setPage] = useState(0);

  const newSeason = Array.from(useSelector(state => state.anime.newSeason));

  const loading = useSelector(state => state.anime.loading);

  const newSeasonLength = newSeason.length || 0;

  for (let index = 0; index < newSeasonLength; index++) {
    newSeason[index].imageAnime = ImageData.anime.season[index];
  }

  let newSeasoned =
    newSeason &&
    newSeason.map(newSeason => (
      <Fragment key={newSeason._id}>
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
                      height: 40
                    })
                  }
                  onPress={() => {
                    navigation.navigate("Anime", {
                      animeList: newSeason
                    });
                  }}
                >
                  {newSeason.title}
                </Text>
                <Text
                  style={
                    (style.utility__fontSize_12px,
                    { color: "#DDDDDD", height: 40 })
                  }
                >
                  {dateFormat(newSeason.aired, "mmmm d, yyyy")}
                </Text>
                <Image
                  style={{ width: "100%", height: 150 }}
                  source={newSeason.imageAnime}
                  resizeMode="cover"
                  onPress={() => {
                    navigation.navigate("Anime", {
                      animeList: newSeason
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
  let total = newSeason.length;
  let x = 3;

  while (i <= total) {
    children.push(newSeasoned.shift());
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
      type: ANIME_LOADING
    });
    axios
      .get(`http://192.168.18.17:5000/api/new-season/?page=${page}`)
      .then(res => dispatch({ type: GET_NEW_SEASON, payload: res.data }))
      .catch(err => console.log(err.response.data));
  }, [page]);

  return (
    <Content padder>
      <H2 style={style.headingTitle}>New Season</H2>
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
    fontSize: 12,
    textTransform: "uppercase"
  },
  utility__spinner: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "center"
  }
});

export default NewSeason;
