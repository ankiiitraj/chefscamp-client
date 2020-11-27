import React, { Component } from "react";
import { Link } from "react-router-dom";

class NotFound extends Component {
  render() {
    return (
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 0px 15px 5px",
          borderRadius: "10px",
          margin: "15px",
          padding: "15px",
          height: "400px",
          background: "url(./codechef-logo.png) no-repeat",
          backgroundPosition: "left",
          backgroundSize: "55%",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "100%",
            justifyContent: "flex-end",
            paddingRight: "200px",
            alignItems: "center",
          }}
        >
          <div>
            <strong style={{ fontSize: "50px" }}>
              404 <br />
              Not Found
            </strong>
            <br />
            <Link style={{ fontSize: "30px" }} to="/">
              Go back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
