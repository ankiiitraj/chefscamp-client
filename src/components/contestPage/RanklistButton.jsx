import React, { Component } from "react";
import "./styles/rankButton.css";
import { Link } from "react-router-dom";

class RanklistButton extends Component {

  render() {
    return (
      <div className="rankButton">
        <b>
          <u>Contest Ranks</u>
        </b>
        <button><Link style={{color: "#1b1b1b", textDecoration: "none"}} to={`/ranklist/${this.props.contestCode}`}>Go to Contest Ranks</Link></button>
      </div>
    );
  }
}

export default RanklistButton;
