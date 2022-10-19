import React from "react";
import { ReactComponent as ReactLogo } from "./parsley.svg";

const NavBar = () => {
  return (
    <div className="navbar">
      <div style={{ marginLeft: "1rem" }}>
        {" "}
        <ReactLogo />
      </div>
      <div className="font1"> Parsley Cultivation Dashboard | </div>
      <div> Fetching data every 10 seconds</div>
    </div>
  );
};

export default NavBar;
