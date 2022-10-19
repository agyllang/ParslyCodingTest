import React, { useState } from "react";

import { Row, Col, Container } from "react-bootstrap";
import { eventPropertyInfo } from "./utilities";

const severityColor = (severity) => {
  if (severity === "Warning") return "#ffcc00";
  if (severity === "Error") return "#ff9966";
  if (severity === "Critical") return "#cc3300";
};

const EventDetail = ({ event }) => {
  console.log("data detals data", event);

  var eventProperty = eventPropertyInfo(event.dataProperty);
  return (
    <Container style={{ marginTop: "1rem" }}>
      <Row style={{ borderBottom: "2px solid #c6c6c6" }}>
        <Col className="column-header">Event data</Col>
      </Row>
      <Row>
        {(event !== null || undefined) && Object.keys(event).length > 0 && (
          <Row>
            <Row>
              <Col className="column-header2" md={"auto"}>
                Event type:
              </Col>
              <Col className="event-info">{event.dataProperty}</Col>
            </Row>

            <Row>
              <Col className="column-header2" md={"auto"}>
                Event details:{" "}
              </Col>
              <Col className="event-info">
                {event.eventDetail}
                <Col className="event-info">
                  Metric value <b>{event.dataValue}</b> {eventProperty.unit} is
                  not within limits ({event.limits.min}-{event.limits.max}{" "}
                  {eventProperty.unit})
                </Col>
              </Col>
            </Row>
            <Row>
              <Col className="column-header2" md={"auto"}>
                Information
              </Col>
              <Col className="event-info">{eventProperty.info}</Col>
            </Row>
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
    <>
      <Row style={{ borderBottom: "2px solid #c6c6c6", marginTop: "1rem" }}>
        <h5 className="component-title">Events ({events.length})</h5>
      </Row>
      <Col>
        <Row style={{ backgroundColor: "rgba(34,55,255,0.2)" }}>
          <Col className="column-header" xs={3}>
            Date
          </Col>
          <Col className="column-header" xs={3}>
            Event
          </Col>
          <Col className="column-header" xs={2}>
            Severity
          </Col>
        </Row>
      </Col>
      <Container className="datalist-container">
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
                  <Col xs={3}>{e.event.data.datetime}</Col>
                  <Col xs={3}>{e.event.eventData.dataProperty}</Col>
                  <Col
                    style={{
                      background: severityColor(e.event.eventData.severity),
                      color: "#000",
                    }}
                    xs={2}
                  >
                    {e.event.eventData.severity}
                  </Col>

                  <Col style={{ justifyContent: "flex-end", display: "flex" }}>
                    {focusedIndex === index ? "⯅" : "⯆"}
                  </Col>
                  {focusedIndex === index && (
                    <>
                      <EventDetail event={e.event.eventData} />
                    </>
                  )}
                </Row>
              );
            })}
        </div>
      </Container>
    </>
  );
};

export default EventList;
