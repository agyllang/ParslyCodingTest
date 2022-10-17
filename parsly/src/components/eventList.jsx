import React, { useState } from "react";

import { Row, Col, Container } from "react-bootstrap";

const eventPropertyInfo = (property) => {
  var propertyObj = { info: "", unit: "" };
  if (property === "Temperature") {
    propertyObj.info =
      "Temperatures below/above the limits may impede the parsley plant to cultivate.";
    propertyObj.unit = " °C";
  }

  if (property === "Humidity") {
    propertyObj.info =
      "Humidity below/above the limits may damage the parsley plant.";
    propertyObj.unit = "%";
  }

  if (property === "Wind speed") {
    propertyObj.info = "Wind speed levels above the limits can break the plant";
    propertyObj.unit = "m/s";
  }
  return propertyObj;
};

const EventDetail = ({ event }) => {
  console.log("data detals data", event);
  return (
    <Container style={{ marginTop: "1rem" }}>
      <Row>
        {/* <Col style={{ display: "flex", justifyContent: "center" }}> */}
        <Col>
          <h5></h5>
        </Col>
      </Row>

      <Row style={{ borderBottom: "2px solid #c6c6c6" }}>
        <Col className="list-column-header">Event data</Col>
      </Row>
      <Row>
        {(event !== null || undefined) && Object.keys(event).length > 0 && (
          <Row
            // key={`eventdetail-item${index}`}
            style={{
              backgroundColor: "#ffffff",
              // backgroundColor: index % 2 ? "#e1effc" : "#ffffff",

              borderBottom: "1px solid #e1effc",
              // borderRadius: "1px",
              margin: "3px",
            }}
          >
            <Col>
              <h7>{event.eventName}</h7>
            </Col>
            <Col>Severity:{event.severity}</Col>
            <Col>Event details:{event.eventDetail}</Col>
            <Col>
              Data value ({event.dataValue}
              {eventPropertyInfo(event.dataProperty).unit}) is not within limits
              ({event.limits.min},{event.limits.max}
              {eventPropertyInfo(event.dataProperty).unit})
            </Col>
            <Col>
              Information: {eventPropertyInfo(event.dataProperty).info}{" "}
            </Col>
            <Col> </Col>
          </Row>
        )}
      </Row>
    </Container>
  );
};

const EventList = (props) => {
  const { events } = props;
  const [focusedIndex, setFocused] = useState();

  const handleFocus = (index) => {
    // console.log("handleFocus");
    if (index === focusedIndex) {
      setFocused();
    } else {
      setFocused(index);
    }
  };
  return (
    <Container className="datalist-container">
      {/* <Container className="addEmployee-container"> */}
      <Row style={{ borderBottom: "2px solid #c6c6c6", marginBottom: "1rem" }}>
        <h5 className="component-title">Events ({events.length})</h5>
      </Row>
      <Col>
        <Row>
          <Col className="list-column-header" xs={4}>
            Date
          </Col>
          <Col className="list-column-header" xs={2}>
            Severity
          </Col>
        </Row>
        <div className="list-table">
          {events.length > 0 &&
            events.map((e, index) => {
              const ref = React.createRef();

              const handleClick = (e) => {
                handleFocus(index);
                ref.current.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              };
              return (
                <Row
                  ref={ref}
                  key={`eventlist-item${index}`}
                  className="row-item"
                  style={{
                    border: index === focusedIndex ? "1px solid black" : "",
                    borderRadius: "1px",
                    margin: "3px",
                    backgroundColor: index % 2 ? "#eaeaea" : "#e4eaee",
                  }}
                  onClick={handleClick}
                >
                  <Col xs={4}>{e.event.created}</Col>
                  <Col xs={4}>{e.event.eventData.eventName}</Col>
                  <Col xs={4}>{e.event.eventData.severity}</Col>

                  <Col
                    style={{ justifyContent: "flex-end", display: "flex" }}
                    xs={2}
                  >
                    {focusedIndex === index ? "⯅" : "⯆"}
                  </Col>
                  {focusedIndex === index && (
                    <Container>
                      <EventDetail event={e.event.eventData} />
                    </Container>
                  )}
                </Row>
              );
            })}
        </div>
      </Col>
    </Container>
  );
};

export default EventList;
