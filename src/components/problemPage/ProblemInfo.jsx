import React, { Component } from "react";
import { Link } from "react-router-dom";
import MarkdownRender from "../../MarkdownRender.js";
import SuccessfulSubmissions from "./SuccessfulSubmissions";
import ErrorBoundary from "../errorBoundary";
import axios from "axios";
import "./styles/problemDescription.css";

class ProblemInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      loaded: false,
      data: null,
      message: "",
      path: `/contest/${this.props.match.params.contestCode}`,
      submissions: false
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    document.title = `${this.props.match.params.problemCode}-Chef'sCamp`;
    axios
      .get(
        `/api/contests/${this.props.match.params.contestCode}/problems/${this.props.match.params.problemCode}`
      )
      .then(res => {
        if (res.data.result.data.content.body) {
          this.setState({ loaded: true, data: res.data });
        } else {
          this.setState({
            loaded: true,
            message: "Problems statement not currently available . . ."
          });
        }
      })
      .catch(() => {
        this.setState({
          message: "Problems statement not currently available . . .",
          submissions: true
        });
      });
  }

  render() {
    if (this.state.loaded) {
      let data = this.state.data.result.data.content.body;
      data = data.replace(/`/g, "");
      data = data.replace(/###/g, "");
      let renderProblemStatement = (
        <ErrorBoundary><MarkdownRender source={data} /></ErrorBoundary>
      );
      return (
        <ul className="problemPage">
          <li style={{ float: "left", width: "610px" }}>
            <div className="problemDescription">
              <ul style={{ boxShadow: "0px 0px 15px 5px rgba(0,0,0,.35)", borderRadius: "10px" }}>
                <li style={{ float: "left" }}>
                  <h2>
                    {this.state.data.result.data.content.problemName} |{" "}
                    <small>
                      {this.state.data.result.data.content.problemCode}
                    </small>
                  </h2>
                </li>
                <li style={{ float: "right" }}>
                  <Link
                    to={{
                      pathname: `/ide`,
                      state: { from: this.props.location }
                    }}
                  >
                    <button>Submit</button>
                  </Link>
                </li>
              </ul>
              <div style={{ textAlign: "left" }}>{renderProblemStatement}</div>
            </div>
          </li>
          <li style={{ float: "right", width: "320px" }}>
            <SuccessfulSubmissions
              theme={this.props.userDetails.themeBool}
              probStatus = {this.state.loaded}
              problemCode={this.props.match.params.problemCode}
            />
          </li>
        </ul>
      );
    } else {
      if (this.state.message === "") {
        return (
          <ul className="problemPage">
            <li style={{ float: "left", width: "610px", paddingTop: "50px" }}>
              <div className="problemDescription">
                <center>
                  <strong style={{ fontSize: "x-large" }}>Loading . . .</strong>
                </center>
              </div>
            </li>
            <li style={{ float: "right", width: "320px" }}>
              <SuccessfulSubmissions
                theme={this.props.userDetails.themeBool}
                probStatus = {this.state.loaded}
                problemCode={this.props.match.params.problemCode}
              />
            </li>
          </ul>
        );
      } else {
        return (
          <ul className="problemPage">
            <li style={{ float: "left", width: "610px", paddingTop: "50px" }}>
              <div className="problemDescription">
                <center>
                  <strong style={{ fontSize: "x-large" }}>
                    Some thing went wrong . . . <Link to={`/contest/${this.props.match.params.contestCode}`}>Go back</Link>
                  </strong>
                </center>
              </div>
            </li>
            <li style={{ float: "right", width: "320px" }}>
              <SuccessfulSubmissions
                theme={this.props.userDetails.themeBool}
                probStatus = {this.state.loaded} 
                submissions = {this.state.submissions}
              />
            </li>
          </ul>
        );
      }
    }
  }
}

export default ProblemInfo;
