import React, { Fragment } from "react";
import { Text, Dimensions } from "react-native";
import { Col } from "react-native-easy-grid";

// npm
import { Card, CardItem, Body } from "native-base";
import dateFormat from "dateformat";

function Schedules(props) {
  const { schedule, navigation } = props;

  let scheduled =
    schedule &&
    schedule.map(schedule => (
      <Fragment key={schedule._id}>
        {dateFormat(schedule.aired, "ddd") === props.dateCheck && (
          <CardItem
            style={{
              paddingLeft: Dimensions.get("window").width / 120,
              paddingRight: Dimensions.get("window").width / 120
            }}
          >
            <Body>
              <Text
                style={{
                  fontSize: 12,
                  height: 36,
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  marginTop: 0
                }}
                onPress={() => {
                  navigation.navigate("Anime", {
                    animeList: schedule
                  });
                }}
              >
                {schedule.title}
              </Text>
            </Body>
          </CardItem>
        )}
      </Fragment>
    ));

  return (
    <Col
      style={{
        marginRight: 5,
        marginLeft: 2
      }}
    >
      <Card>
        <CardItem header style={{ marginBottom: 0 }} bordered>
          <Text>{props.date}</Text>
        </CardItem>
        {scheduled}
      </Card>
    </Col>
  );
}

export default Schedules;
