import React, { useState } from "react";

import { Row, Col, Container } from "react-bootstrap";
import { timestampConvertFull } from "./utilities";
const DataDetails = ({ data }) => {
  return (
    <Container style={{ marginTop: "1rem" }}>
      <Row style={{ borderBottom: "2px solid #c6c6c6" }}>
        <Col className="list-column-header">Data</Col>
      </Row>
      <Row>
        <Row>
          <Col className="column-header2">Max wind speed:</Col>{" "}
          <Col>{data.max_wind_spd}</Col>
        </Row>

        <Row>
          <Col className="column-header2">Average relative humidity:</Col>{" "}
          <Col>{data.rh}</Col>
        </Row>

        <Row>
          <Col className="column-header2">Average temp (°C):</Col>
          <Col>{data.temp}</Col>
        </Row>
        <Row>
          <Col className="column-header2">Max temp (°C):</Col>
          <Col>{data.max_temp}</Col>
        </Row>
        <Row>
          <Col className="column-header2">Max temp time:</Col>
          <Col>{timestampConvertFull(data.max_temp_ts)}</Col>
        </Row>
        <Row>
          <Col className="column-header2">Min temp (°C):</Col>
          <Col>{data.min_temp}</Col>
        </Row>
        <Row>
          <Col className="column-header2">Min temp time:</Col>
          {}
          <Col>{timestampConvertFull(data.min_temp_ts)}</Col>
        </Row>
      </Row>
    </Container>
  );
};

const DataList = (props) => {
  const { data } = props;
  const [focusedIndex, setFocused] = useState();

  const handleFocus = (index) => {
    if (index === focusedIndex) {
      setFocused();
    } else {
      setFocused(index);
    }
  };
  return (
    <>
      <Row style={{ borderBottom: "2px solid #c6c6c6", marginTop: "1rem" }}>
        <h5 className="component-title">Data ({data.length})</h5>
      </Row>
      <Row style={{ backgroundColor: "rgba(34,55,255,0.2)" }}>
        <Col className="column-header" xs={2}>
          Date
        </Col>
        <Col className="column-header" xs={2}>
          Avg.Temp
        </Col>
        <Col className="column-header" xs={2}>
          Wind speed
        </Col>
        <Col className="column-header" xs={2}>
          Humidity
        </Col>
      </Row>
      <Container className="datalist-container">
        <div className="list-table">
          {data.length > 0 &&
            data.map((d, index) => {
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
                  <Col xs={2}>{d.datetime}</Col>
                  <Col xs={2}>{d.temp} °C</Col>
                  <Col xs={2}>{d.wind_spd} m/s</Col>
                  <Col xs={2}>{d.rh} %</Col>

                  <Col style={{ justifyContent: "flex-end", display: "flex" }}>
                    {focusedIndex === index ? "⯅" : "⯆"}
                  </Col>
                  {focusedIndex === index && (
                    <Container>
                      <DataDetails data={d} />
                    </Container>
                  )}
                </Row>
              );
            })}
        </div>
      </Container>
    </>
  );
};

export default DataList;
