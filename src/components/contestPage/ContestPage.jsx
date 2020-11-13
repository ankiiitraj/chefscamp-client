import React, { Component } from "react";
import ListProblems from "./ListProblems";
import TimerBlock from "./TimerBlock";
import RanklistButton from "./RanklistButton";
import "./styles/contestPage.css";

class ContestPage extends Component {
  constructor(props) {
    super(props);
    this.handleLiftContestDetail = this.handleLiftContestDetail.bind(this);
    this.state = {
      data: null
    };
  }
  handleLiftContestDetail(data) {
    this.setState({ data: data });
  }
  render() {
    return (
      <div className="contestPage">
        <ul>
          <li>
            <strong>
              Contest Code : {this.props.match.params.contestCode}
            </strong>
          </li>
          <li style={{ float: "left" }}>
            <ListProblems
              handleLiftContestDetail={this.handleLiftContestDetail}
              data={this.state.data}
              theme={this.props.userDetails.themeBool}
              contestCode={this.props.match.params.contestCode}
            />
          </li>
          <li style={{ float: "right" }}>
            <div style={{ width: "320px" }}>
              <TimerBlock
                data={this.state.data}
                contestCode={this.props.match.params.contestCode}
              />
              <RanklistButton
                contestCode={this.props.match.params.contestCode}
              />
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default ContestPage;
