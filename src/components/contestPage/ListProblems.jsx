import React, { Component } from "react";
import "./styles/listProblems.css";
import { Link } from "react-router-dom";
import axios from "axios";

class ListProblems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      contestCode: this.props.contestCode,
      imgLoaded: false,
      is404: false,
      message: "",
    };
    this.renderTableData = this.renderTableData.bind(this);
    this.renderTableHeader = this.renderTableHeader.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    document.title = `${this.props.contestCode}-Chef'sCamp`;
    axios.get(`/api/contests/${this.props.contestCode}`)
      .then((res) => {
        this.props.handleLiftContestDetail(res.data);
        if (res.data.result.data.content.problemsList.length > 0) {
          this.setState({ loaded: true });
        }
      })
      .catch(() => {
        this.setState({
          loaded: true,
          message: "Problems not currently available . . .",
          is404: true,
        });
      });
  }
  renderTableData() {
    return this.props.data.result.data.content.problemsList.map(
      (problem, index) => {
        return (
          // eslint-disable-next-line
          <tr key={index} style={(index%2===0 ? this.props.theme == 0  ? {backgroundColor: "#36454f"} : {backgroundColor: '#f8f8f8'} : null)}>
            <td><Link to={`${this.props.contestCode}/problem/${problem.problemCode}`}>{problem.problemCode}</Link></td>
            <td>{problem.successfulSubmissions}</td>
          </tr>
        );
      }
    );
  }
  
  renderTableHeader() {
    let header = ["problem code", "submissions"];
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  render() {
    if (this.state.is404) {
      return (
        <div style={{ height: "150px", width: "620px", paddingTop: "150px" }}>
          <center>
            <strong>{this.state.message}</strong>
          </center>
        </div>
      );
    } else {
      if (!this.state.loaded) {
        return (
          <div style={{ height: "150px", width: "620px", paddingTop: "150px" }}>
            <strong>Loading . . .</strong>
          </div>
        );
      }
      return (
        <div>
          <div
            style={{
              padding: "10px",
              marginBottom: "-5px",
              paddingBottom: "2px",
              border: "none",
            }}
          >
          <div
            style={{height: "auto", width: "580px", border: "1px solid #b8b8b8"}}
          >
            <img
              src={this.props.data.result.data.content.bannerFile}
              alt="banner"
              style={{width: "580px", display: this.state.imgLoaded ? "block" : "none"}}
              onLoad={() => {this.setState({imgLoaded: true})}}
            />
            <h1 style={{marginTop: "50px", display: this.state.imgLoaded ? "none" : "block"}}>Loading . . .</h1>
          
          </div> 
          </div>
          <table id="students">
            <caption style={{ textAlign: "left" }}>Problems</caption>
            <tbody>
              <tr>{this.renderTableHeader()}</tr>
              {this.renderTableData()}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default ListProblems;
