import React, { Component } from "react";
import {ReactComponent as Logo} from "./logos/logo.svg";
class Welcome extends Component {
  render() {
    return (
      <div>
        <center>
          <h1>
            Welcome to{" "}
            <span style={{ fontSize: "45px" }}>
              &lt; Chef&apos;sCamp
              <Logo height={43} width={43} />
              {" "}
              /&gt;
            </span>
          </h1>
        </center>
      </div>
    );
  }
}

export default Welcome;
