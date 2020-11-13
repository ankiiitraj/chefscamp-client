import React, { Component } from "react";
import { Link } from "react-router-dom";

class NotFound extends Component {
  render() {
    return (
      <div
        style={{
          border: "solid 4px",
          height: "300px",
          padding: "150px 0px"
        }}
      >
        <strong style={{ fontSize: "50px" }}>
          404 <br />
          Not Found
        </strong>
        <br />
        <Link style={{ fontSize: "30px" }} to="/">
          Go back to home
        </Link>
      </div>
    );
  }
}

export default NotFound;
