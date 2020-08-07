import React, { Component } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";

// components
import Pages from "./screens/Pages/Pages";
import Anime from "./screens/Anime/Anime";
import EpisodeAnime from "./screens/EpisodeAnime/EpisodeAnime";

// redux
import { Provider } from "react-redux";
import store from "./store";

// npm
import { AppLoading } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#20232A"
              },
              headerTintColor: "#61DAFB"
            }}
          >
            <Stack.Screen
              name="Pages"
              component={Pages}
              options={{
                title: "Dainime"
              }}
            />
            <Stack.Screen
              name="Anime"
              component={Anime}
              options={{
                title: "Dainime"
              }}
            />
            <Stack.Screen
              name="EpisodeAnime"
              component={EpisodeAnime}
              options={{
                title: "Dainime"
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  }
});

export default App;
