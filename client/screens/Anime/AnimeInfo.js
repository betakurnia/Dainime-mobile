import React, { useEffect, useState } from "react";
import { Image } from "react-native";

// redux
import { useSelector } from "react-redux";
import { GET_ANIME } from "../../actions/types";

// npm
import { Grid, Row, Col } from "react-native-easy-grid";
import { H3, Text } from "native-base";
import dateFormat from "dateformat";
import axios from "axios";

// image
import ImageData from "../ImageData/ImageData";

function AnimeInfo(props) {
  const animeTitled = props.animeTitle
    .split(" ")
    .join("_")
    .replace("!!", "")
    .replace(":", "");

  const { animeTitle } = props;

  const [anime, setAnimes] = useState([]);

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
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember"
    ],
    timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"]
  };
  useEffect(() => {
    axios
      .get(`http://192.168.18.17:5000/api/anime/${animeTitle}`)
      .then(res => {
        setAnimes(res.data);
      })
      .catch(err => console.log(err.response.data));
  }, []);

  return (
    <Grid>
      {anime[0] && (
        <Row style={{ marginTop: 10 }}>
          <Col style={{ marginLeft: 5 }} size={40}>
            <Image
              style={{ width: "100%", height: 200 }}
              source={ImageData.anime[animeTitled][0]}
              resizeMode="cover"
            ></Image>
          </Col>
          <Col style={{ marginLeft: 15, marginRight: 5 }} size={60}>
            <H3>{anime[0].title}</H3>
            <Row style={{ marginTop: 15 }}>
              <Col size={35}>
                <Text>Tipe </Text>
                <Text>Episode </Text>
                <Text>Sumber </Text>
                <Text>Status </Text>
                <Text>Perdana </Text>
                <Text>Studio </Text>
                <Text>Durasi </Text>
                <Text>Genres </Text>
              </Col>
              <Col size={5}>
                <Text>:</Text>
                <Text>:</Text>
                <Text>:</Text>
                <Text>:</Text>
                <Text>:</Text>
                <Text>:</Text>
                <Text>:</Text>
                <Text>:</Text>
              </Col>
              <Col size={55}>
                <Text>{anime[0].type}</Text>
                <Text>{anime[0].episodes}</Text>
                <Text>{anime[0].source}</Text>
                <Text>{anime[0].status}</Text>
                <Text>{dateFormat(anime[0].aired, "d-mm-yyyy")}</Text>
                <Text>{anime[0].studio}</Text>
                <Text>{anime[0].duration}</Text>
                <Text>{anime[0].genre.join(",")}</Text>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </Grid>
  );
}

export default AnimeInfo;
