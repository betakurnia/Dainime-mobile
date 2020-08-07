import React from "react";

// npm
import { Header, Title, Left, Body, Right } from "native-base";

// colors
import Colors from "../assets/colors";

function Headers() {
  return (
    <Header style={{ backgroundColor: Colors.darkBlack }} hasTabs>
      <Left />
      <Body>
        <Title style={{ color: Colors.primary }}>Dainime</Title>
      </Body>
      <Right />
    </Header>
  );
}

export default Headers;
