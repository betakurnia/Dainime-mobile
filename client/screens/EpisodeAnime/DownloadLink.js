import React from "react";

// npm
import { Grid, Row, Col } from "react-native-easy-grid";
import { View, Text, Card, CardItem, Body } from "native-base";

function DownloadLink(props) {
  const { episode } = props;

  return (
    <Grid style={{ marginTop: 20 }}>
      {episode && (
        <Row>
          <Col>
            <Card>
              <CardItem
                header
                bordered
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "#20232A"
                }}
              >
                <Text style={{ color: "#ffffff" }}>CU</Text>
                <Text style={{ color: "#ffffff" }}>FU</Text>
                <Text style={{ color: "#ffffff" }}>Upload</Text>
              </CardItem>
              <CardItem bordered>
                <Body
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text>CU360</Text>
                  <Text>CU480</Text>
                  <Text>CU720</Text>
                </Body>
              </CardItem>
              <CardItem bordered>
                <Body
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text>FU360</Text>
                  <Text>FU480</Text>
                  <Text>FU720</Text>
                </Body>
              </CardItem>
              <CardItem bordered>
                <Body
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text>Upload360</Text>
                  <Text>Upload360</Text>
                  <Text>Upload360</Text>
                </Body>
              </CardItem>
            </Card>
          </Col>
        </Row>
      )}
    </Grid>
  );
}

export default DownloadLink;
