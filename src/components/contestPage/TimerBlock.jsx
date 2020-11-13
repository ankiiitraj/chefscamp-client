import React, { Component } from "react";
import Timer from "./Timer";

class TimerBlock extends Component {
  // constructor(props){
  //     super(props);
  //     this.state = ({
  //         data: data,
  //     });
  // }
  render() {
    if (this.props.data !== null) {
      const endTime = new Date(
        this.props.data.result.data.content.endDate
      ).getTime();
      const startTime = new Date(
        this.props.data.result.data.content.startDate
      ).getTime();
      const curTime = new Date().getTime();
      const diff =
        curTime > endTime
          ? 0
          : curTime > startTime
          ? endTime - curTime
          : startTime - curTime;
      return (
        <div style={{ height: "100px" }}>
          <Timer diff={diff} isRunning={curTime > startTime} />
        </div>
      );
    } else {
      return (
        <div style={{ height: "50px", paddingTop: "50px" }}>
          <strong>Loading . . .</strong>
        </div>
      );
    }
  }
}

export default TimerBlock;
