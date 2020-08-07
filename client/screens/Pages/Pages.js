import React from "react";

import Home from "./Home";
import AllAnimeList from "./AllAnimeList";
import NewSeason from "./NewSeason";
import Schedule from "./Schedule";

// npm
import { Tabs, Tab } from "native-base";

// colors
import Colors from "../../assets/colors";

function Pages({ navigation }) {
  return (
    <Tabs>
      <Tab
        heading="Home"
        textStyle={{ color: "#ffffff" }}
        activeTextStyle={{ color: Colors.primary }}
        tabStyle={{ backgroundColor: Colors.lightBlack }}
        activeTabStyle={{
          backgroundColor: Colors.lightBlack,
          borderColor: Colors.primary
        }}
      >
        <Home navigation={navigation} />
      </Tab>
      <Tab
        heading="List"
        textStyle={{ color: "#ffffff" }}
        activeTextStyle={{ color: Colors.primary }}
        tabStyle={{ backgroundColor: Colors.lightBlack }}
        activeTabStyle={{
          backgroundColor: Colors.lightBlack,
          borderColor: Colors.primary
        }}
      >
        <AllAnimeList navigation={navigation} />
      </Tab>
      <Tab
        heading="Season"
        textStyle={{ color: "#ffffff" }}
        activeTextStyle={{ color: Colors.primary }}
        tabStyle={{ backgroundColor: Colors.lightBlack }}
        activeTabStyle={{
          backgroundColor: Colors.lightBlack,
          borderColor: Colors.primary
        }}
      >
        <NewSeason navigation={navigation} />
      </Tab>
      <Tab
        heading="Schedule"
        textStyle={{ color: "#ffffff" }}
        activeTextStyle={{ color: Colors.primary }}
        tabStyle={{ backgroundColor: Colors.lightBlack }}
        activeTabStyle={{
          backgroundColor: Colors.lightBlack,
          borderColor: Colors.primary
        }}
      >
        <Schedule navigation={navigation} />
      </Tab>
    </Tabs>
  );
}

export default Pages;
