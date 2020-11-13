import React, { Component, Fragment } from "react";
import "./styles/timer.css";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: Math.floor(this.props.diff / (1000 * 60 * 60 * 24)),
      hrs: Math.floor((this.props.diff / (1000 * 60 * 60)) % 24),
      mins: Math.floor((this.props.diff / 1000 / 60) % 60),
      secs: Math.floor((this.props.diff / 1000) % 60),
      stop: false
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.renderTimerComponent = this.renderTimerComponent.bind(this);
  }
  componentDidMount() {
    this.counterInterval = setInterval(() => {
      const { days, hrs, mins, secs } = this.state;
      if (secs > 0) {
        this.setState({ secs: secs - 1 });
      } else {
        if (mins === 0) {
          if (hrs === 0) {
            if (days === 0) {
              this.setState({ stop: true });
            } else {
              this.setState({
                days: days - 1,
                mins: 59,
                secs: 59,
                hrs: 23
              });
            }
          } else {
            this.setState({
              hrs: hrs - 1,
              secs: 59,
              mins: 59
            });
          }
        } else {
          this.setState({
            mins: mins - 1,
            secs: 59
          });
        }
      }
    }, 1000);
    if (this.state.stop) {
      clearInterval(this.counterInterval);
    }
  }
  componentWillUnmount() {
    clearInterval(this.counterInterval);
  }

  renderTimerComponent() {
    let countDown = (
      <ul className="counter">
        <strong>
          <li>
            <span>{this.state.days}</span>Days
          </li>{" "}
        </strong>
        <strong>
          <li>
            <span>{this.state.hrs}</span>Hrs
          </li>
        </strong>
        <strong>
          <li>
            <span>{this.state.mins}</span>Min
          </li>{" "}
        </strong>
        <strong>
          <li>
            <span>{this.state.secs}</span>Sec
          </li>
        </strong>
      </ul>
    );
    if (this.state.stop || this.props.diff <= 0) {
      return (
        <h3 style={{ marginTop: "35px" }} className="counterTitle">
          <u>Contest Ended</u>
        </h3>
      );
    } else if (this.props.isRunning) {
      return (
        <Fragment>
          <h3 className="counterTitle">
            <u>Contest Ends In</u>
          </h3>
          <br />
          {countDown}
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <h3 className="counterTitle">
            <u>Contest Starts In</u>
          </h3>
          <br />
          {countDown}
        </Fragment>
      );
    }
  }

  render() {
    return <Fragment>{this.renderTimerComponent()}</Fragment>;
  }
}

export default Timer;
