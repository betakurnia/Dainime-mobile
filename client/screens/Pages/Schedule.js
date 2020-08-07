import React, { useState, useEffect, Fragment } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

// component
import Schedules from "../../components/Schedules";

// redux
import { useSelector, useDispatch } from "react-redux";
import { GET_SCHEDULE, ANIME_LOADING } from "../../actions/types";

// npm
import { Content, H2, Spinner } from "native-base";
import axios from "axios";

function Schedule(props) {
  const { navigation } = props;

  const dispatch = useDispatch();

  const [page, setPage] = useState(0);

  const schedule = Array.from(useSelector(state => state.anime.schedule));

  const loading = useSelector(state => state.anime.loading);

  useEffect(() => {
    dispatch({
      type: ANIME_LOADING
    });
    axios
      .get("http://192.168.18.17:5000/api/schedule")
      .then(res => dispatch({ type: GET_SCHEDULE, payload: res.data }))
      .catch(err => console.log(err.response.data));
  }, [page]);

  const groups = (
    <Grid style={{ paddingTop: width / 22 }}>
      <Row>
        <Schedules
          date="Senin"
          schedule={schedule}
          dateCheck="Mon"
          navigation={navigation}
        />
        <Schedules
          date="Selasa"
          schedule={schedule}
          dateCheck="Tue"
          navigation={navigation}
        />
        <Schedules
          date="Rabu"
          schedule={schedule}
          dateCheck="Thu"
          navigation={navigation}
        />
      </Row>
      <Row>
        <Schedules
          date="Kamis"
          schedule={schedule}
          dateCheck="Fri"
          navigation={navigation}
        />
        <Schedules
          date="Jumat"
          schedule={schedule}
          dateCheck="Mon"
          navigation={navigation}
        />
        <Schedules
          date="Sabtu"
          schedule={schedule}
          dateCheck="Sat"
          navigation={navigation}
        />
      </Row>
      <Row>
        <Schedules
          date="Minggu"
          schedule={schedule}
          dateCheck="Sun"
          navigation={navigation}
        />
        <Col></Col>
        <Col></Col>
      </Row>
    </Grid>
  );

  return (
    <Content>
      <View style={style.headingTitle}>
        <H2>Schedule</H2>
      </View>
      {loading ? (
        <Grid style={{ paddingTop: width / 22 }}>
          <Spinner style={style.utility__spinner} color="blue" />
        </Grid>
      ) : (
        groups
      )}
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

export default Schedule;
