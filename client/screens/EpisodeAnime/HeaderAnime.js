import React, { Fragment } from "react";
import { View, Image } from "react-native";

// npm
import { Grid, Row, Col } from "react-native-easy-grid";
import { H3, Text } from "native-base";

// image
import ImageData from "../ImageData/ImageData";

function HeaderAnime(props) {
  let { episode, navigation } = props;

  const episodeTitle =
    episode[0] &&
    episode[0].title
      .split(" ")
      .join("_")
      .replace("!!", "")
      .replace(":", "");

  return (
    <Grid>
      {episode[0] && (
        <Row style={{ marginTop: 10 }}>
          <Col size={40}>
            <Image
              style={{ width: "100%", height: 200 }}
              source={ImageData.anime[episodeTitle][0]}
              resizeMode="cover"
            ></Image>
          </Col>
          <Col style={{ marginLeft: 15 }} size={60}>
            <H3
              onPress={() => {
                navigation.navigate("Anime", {
                  animeList: episode[0]
                });
              }}
            >
              {episode[0].title}
            </H3>
            <H3>Episode {episode[0].episode}</H3>
            <Text style={{ marginTop: 15 }}>Description</Text>
            <Text style={{ fontSize: 12 }}>{episode[0].anime.synopsis}</Text>
          </Col>
        </Row>
      )}
    </Grid>
  );
}

export default HeaderAnime;
