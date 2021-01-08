import React, { Component } from "react";
import Cookie from "js-cookie";
import "./ide.css";
import axios from "axios";
var CodeMirror = require("react-codemirror");
require("codemirror/lib/codemirror.css");

const languages = ["C", "C++14", "JAVA", "PYTH 3.6"];

class Ide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "/*Start Writing Your Code*/",
      output: "",
      input: "",
      lang: Cookie.get("lang"),
      disabled: false,
      link: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
    this.handleClickRun = this.handleClickRun.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.numRequests = 0;
  }

  handleClickSubmit() {
    alert("Dummy button!");
  }

  handleClickRun() {
    this.setState({ disabled: !this.state.disabled });
    let code = this.state.code;
    let input = this.state.input;
    let lang = this.state.lang;
    let payload = {
      sourceCode: code,
      language: lang,
      input: input,
    };
    axios
      .post(`/api/ide/run`, payload)
      .then((res) => {
        this.setState({ link: res.data.result.data.link });
        this.intervalID = setInterval(this.getStatus, 4000);
      })
      .catch((err) => {
        console.log(err.data);
        this.setState({
          disabled: !this.state.disabled,
          output: "Something went wrong, try again!",
        });
      });
  }
  getStatus() {
    this.numRequests += 1;
    axios.get(`/api/ide/status/${this.state.link}`)
    .then((res) => {
      if (this.numRequests > 3) {
        this.setState({
          output: "Timed Out, try again!",
          disabled: !this.state.disabled,
        });
        this.numRequests = 0;
        clearInterval(this.intervalID);
      } else if (res.data.result.data.output.length > 0) {
        this.setState({
          output: res.data.result.data.output,
          disabled: !this.state.disabled,
        });
        this.numRequests = 0;
        clearInterval(this.intervalID);
      } else if (res.data.result.data.cmpinfo.length > 0) {
        this.setState({
          output: res.data.result.data.cmpinfo,
          disabled: !this.state.disabled,
        });
        this.numRequests = 0;
        clearInterval(this.intervalID);
      } else if (res.data.result.data.stderr.length > 0) {
        this.setState({
          output: res.data.result.data.stderr,
          disabled: !this.state.disabled,
        });
        this.numRequests = 0;
        clearInterval(this.intervalID);
      }
    })
    .catch(() => {
      clearInterval(this.intervalID);
      this.setState({
        output: "Internal server error, try again later!",
        disabled: !this.state.disabled,
      });
    });
  }
  componentDidMount(){
    document.title = `IDE-Chef'sCamp`;
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }
  handleSelect(event) {
    Cookie.set("lang", event.target.value, { expires: 30 });
    this.setState({ lang: event.target.value });
  }

  render() {
    let options = {
      lineNumbers: true,
    };
    let langs = languages.map((elem) => (
      <option key={elem.toString()}> {elem}</option>
    ));
    return (
      <div className="ide">
        <div style={{ textAlign: "left", border: "solid #b9b9b9 1px" }}>
          <CodeMirror
            style={{ height: "auto" }}
            value={this.state.code}
            onChange={(code) => this.setState({ code })}
            options={options}
          />
        </div>
        <ul>
          <li style={{ float: "left" }}>
            <textarea
              value={this.state.input}
              onChange={this.handleChange}
              placeholder="custom input goes here"
            ></textarea>
          </li>
          <li style={{ float: "right" }}>
            <textarea
              readOnly
              value={this.state.output}
              placeholder="Output will be here"
            />
          </li>
        </ul>
        <div style={{ display: "flex" }}>
          <div>
            <select value={this.state.lang} onChange={this.handleSelect}>
              {langs}
            </select>
          </div>
          <button disabled={this.state.disabled} onClick={this.handleClickRun}>
            {this.state.disabled ? "Running . . ." : "Run"}
          </button>
          <button onClick={this.handleClickSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

export default Ide;
