import React, { useState, Fragment } from "react";

// npm
import { Segment, Button, Text } from "native-base";

// components
import AnimeInfo from "./AnimeInfo";
import AllAnime from "./AllAnime";

function EpisodeAnime({ route, navigation }) {
  const { animeList } = route.params;

  const [isButton1, setIsButton1] = useState(true);
  const [isButton2, setIsButton2] = useState(false);

  return (
    <Fragment>
      <Segment style={{ backgroundColor: "#282c34" }}>
        <Button
          first
          onPress={() => {
            setIsButton1(true);
            setIsButton2(false);
          }}
          active={isButton1}
        >
          <Text style={{ textTransform: "capitalize", color: "#61DAFB" }}>
            Last Episode
          </Text>
        </Button>
        <Button
          last
          onPress={() => {
            setIsButton1(false);
            setIsButton2(true);
          }}
          active={isButton2}
        >
          <Text style={{ textTransform: "capitalize", color: "#61DAFB" }}>
            Anime Info
          </Text>
        </Button>
      </Segment>
      {isButton1 && (
        <AllAnime animeTitle={animeList.title} navigation={navigation} />
      )}
      {isButton2 && <AnimeInfo animeTitle={animeList.title} />}
    </Fragment>
  );
}

export default EpisodeAnime;
