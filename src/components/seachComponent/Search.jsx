import React, { Component } from "react";
import "./style.css";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      selected: "",
      indexSelected: 0,
      suggestions: [],
      message: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  componentDidMount() {
    document.title = `Search-Chef'sCamp`;
    let userName = Cookie.get("userName");
    console.log(this.props.contests && 1);
    if (!this.props.contests && userName) {
      axios
        .get(`/api/contests`)
        .then((res) => {
          this.props.handleLiftContests(res.data);
        })
        .catch(() => {
          this.setState({ message: "Contest loading failed! try reloading!" });
        });
    }
  }

  handleChange(event) {
    if (event.keyCode !== 13) {
      this.setState({ value: event.target.value, indexSelected: 0 });
      if (this.props.contests) {
        this.populateSuggestions(event.target.value);
      }
    }
  }

  handleClick(event) {
    this.setState({
      suggestions: [],
      value: event.target.innerText,
      selected: event.target.getAttribute("data-code"),
      indexSelected: 0,
      redirect: true,
    });
  }

  handleKeyDown(event) {
    //User pressed Enter
    if (event.keyCode === 13) {
      if (this.state.suggestions.length === 0) {
        alert("Enter valid input!");
      } else {
        this.props.history.push(
          `/contest/${this.state.suggestions[this.state.indexSelected].code}`
        );
      }
    }

    // User pressed the up arrow, decrement the index
    else if (event.keyCode === 38) {
      if (this.state.indexSelected === 0) {
        return;
      }

      this.setState({ indexSelected: this.state.indexSelected - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (event.keyCode === 40) {
      if (this.state.indexSelected - 1 === this.state.suggestions.length) {
        return;
      }

      this.setState({ indexSelected: this.state.indexSelected + 1 });
    }
  }

  populateSuggestions(val) {
    if (val.length === 0) {
      this.setState({ suggestions: [] });
    } else {
      let suggests = [],
        curVal = val;
      let { contests } = this.props;
      for (let i = 0; i < contests.length; ++i) {
        if (suggests.length === 10) {
          //allows on 10 items at a time
          break;
        }
        let element = contests[i].detail.toLowerCase();
        let reg = new RegExp(curVal.toLowerCase(), "g");
        var res = element.match(reg);
        if (res) {
          suggests.push(contests[i]);
        }
      }
      this.setState({ suggestions: suggests });
    }
  }

  render() {
    const textBox = {
      height: "30px",
      width: "500px",
      boxShadow: "0px 0px 15px 5px rgba(0,0,0,.35)",
      borderRadius: "10px",
    };
    const searchList = {
      width: "calc(508px)",
    };

    let renderList;
    if (this.props.contests) {
      if (this.state.suggestions.length > 0) {
        renderList = (
          <ul style={searchList} className="suggestions">
            {this.state.suggestions.map((suggestion, index) => {
              let className;
              if (index === this.state.indexSelected) {
                className = "suggestion-active";
              }
              return (
                <li key={suggestion.code} className={className}>
                  <Link to={`/contest/${suggestion.code}`}>
                    {suggestion.detail}
                  </Link>
                </li>
              );
            })}{" "}
          </ul>
        );
      } else {
        renderList = null;
      }
    } else if (!this.state.message) {
      renderList = (
        <ul style={searchList} className="suggestions">
          <li>
            <strong>Loading . . .</strong>
          </li>
        </ul>
      );
    }

    return (
      <div
        style={{
          boxShadow: "0px 0px 15px 5px rgba(0,0,0,.35)",
          borderRadius: "10px",
          margin: "15px",
          height: "480px",
          paddingTop: "50px",
        }}
      >
        <div
          style={{
            margin: "10px 0px",
            width: "500px",
            fontSize: "xxx-large",
          }}
        >
          {" "}
          Go to <Link to="/gym">Gym</Link>
        </div>
        <div
          style={{
            margin: "10px 0px",
            width: "500px",
            fontSize: "large",
          }}
        >
          OR
        </div>
        <div
          style={{
            textAlign: "left",
            margin: "10px 0px",
            width: "500px",
            fontSize: "large",
          }}
        >
          Search for a contest:
        </div>
        <input
          type="text"
          style={textBox}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          value={this.state.value}
          placeholder="e.g. JAN17, january long"
        />
        {renderList}
        {this.state.message && (
          <div
            style={{
              backgroundColor: "#d94d65",
              margin: "1em",
              padding: "1em",
              width: "250px",
              borderRadius: "20px",
              textAlign: "center",
            }}
          >
            <strong>{this.state.message}</strong>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Search);
