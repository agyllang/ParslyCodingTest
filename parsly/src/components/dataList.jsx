import React, { useState } from "react";

import { Row, Col, Container } from "react-bootstrap";

const DataDetails = ({ data }) => {
  console.log("data detals data", data);
  return (
    <Container style={{ marginTop: "1rem" }}>
      <Row>
        {/* <Col style={{ display: "flex", justifyContent: "center" }}> */}
        <Col>
          <h5>-</h5>
        </Col>
      </Row>

      <Row style={{ borderBottom: "2px solid #c6c6c6" }}>
        <Col className="list-column-header">Event data</Col>
      </Row>
      <Row>
        {/* {data.length > 0 &&
          data.map((d, index) => {
            return (
              <Row
                key={`employeeflight-item${index}`}
                style={{
                  backgroundColor: "#ffffff",
                  // backgroundColor: index % 2 ? "#e1effc" : "#ffffff",

                  borderBottom: "1px solid #e1effc",
                  // borderRadius: "1px",
                  margin: "3px",
                }}
              > */}
        {/* <Row>
          Date time:<Col>{data.datetime}</Col>
        </Row> */}
        <Row>
          Max wind speed:<Col>{data.max_wind_spd}</Col>
        </Row>
        <Row>
          Min temp time :<Col>{data.min_temp_ts}</Col>
        </Row>
        <Row>
          Max temp time:<Col>{data.max_temp_ts}</Col>
        </Row>
        <Row>
          Average relative humidity:<Col>{data.dewpt}</Col>
        </Row>
        <Row>
          Max ux:<Col>{data.max_uv}</Col>
        </Row>
        <Row>
          Average temp:<Col>{data.temp}</Col>
        </Row>
        <Row>
          Max temp:<Col>{data.max_temp}</Col>
        </Row>
        <Row>
          Min temp:<Col>{data.min_temp}</Col>
        </Row>
      </Row>
      {/* );
          })} */}
      {/* </Row> */}
    </Container>
  );
};

const DataList = (props) => {
  const { data } = props;
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
        <h5 className="component-title">Data ({data.length})</h5>
      </Row>
      <Col>
        <Row>
          <Col className="list-column-header" xs={4}>
            Date
          </Col>
          <Col className="list-column-header" xs={2}>
            Temp
          </Col>
        </Row>
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
                  <Col xs={4}>{d.datetime}</Col>
                  <Col xs={6}>{d.temp}</Col>

                  <Col style={{ justifyContent: "flex-end",display:"flex" }} xs={2}>
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
      </Col>
    </Container>
  );
};

export default DataList;
