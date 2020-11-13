import React, { Component } from "react";
import "./styles/submissions.css";
import axios from "axios";
import Cookie from "js-cookie";

class SuccessfulSubmissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      data: null,
      message: null,
      showMess: false,
    };
  }
  componentWillReceiveProps(newProps) {
    let userName = Cookie.get("userName");
    if (newProps.probStatus) {
      axios
        .get(`/api/submissions/${newProps.problemCode}/${userName}`)
        .then((res) => {
          if (
            res.data.result.data.message === "submissions fetched successfully"
          ) {
            this.setState({ loaded: true, data: res.data });
          } else {
            this.setState({
              loaded: true,
              showMess: true,
              message: res.data.result.data.message,
            });
          }
        });
    }
  }

  renderTableData() {
    if (this.state.showMess === false) {
      return this.state.data.result.data.content.map((problem, index) => {
        return (
          // eslint-disable-next-line
          <tr key={index} style={(index%2===0 ? this.props.theme == 0  ? {backgroundColor: "#36454f"} : {backgroundColor: '#f8f8f8'} : null)}>
            {/* eslint-disable-next-line */}
            <td><a style={(this.props.theme == 0  ? {color: "#fff"} : {color: '#000'})} href={"https://codechef.com/users/" + problem.username} target="_blank" rel="noopener noreferrer">{problem.username}</a></td>
            <td>{parseFloat(problem.time).toFixed(2)}</td>
            <td>{Math.round((problem.memory / 1024) * 10) / 10}</td>
            <td>{problem.language}</td>
          </tr>
        );
      });
    } else {
      return <strong>{this.state.message}</strong>;
    }
  }

  renderTableHeader() {
    let header = ["user", "time", "mem", "lang"];
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  render() {
    if (this.state.loaded) {
      return (
        <div style={{ border: "solid #b9b9b9 3px" }}>
          <table id="submissions">
            <caption style={{ textAlign: "left", fontSize: "15px" }}>
              <b>Successful Submissions</b>
            </caption>
            <tbody>
              <tr>{this.renderTableHeader()}</tr>
              {this.renderTableData()}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <>
          <div
            style={{
              border: "solid #b9b9b9 3px",
              width: "320px",
              height: "211px",
            }}
          >
            <table id="submissions">
              <caption style={{ textAlign: "left", fontSize: "15px" }}>
                <b>Successful Submissions</b>
              </caption>
              <tbody><tr><td><strong style={{ marginTop: "211px" }}>Loading . . .</strong></td></tr></tbody>
            </table>
          </div>
        </>
      );
    }
  }
}

export default SuccessfulSubmissions;
