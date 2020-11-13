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
          <h3>
            Hit <i>login</i> to get started!
          </h3>
        </center>
      </div>
    );
  }
}

export default Welcome;
