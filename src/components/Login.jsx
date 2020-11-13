import React, { Component } from "react";
import Welcome from "./Welcome";

const style = {
  backgroundColor: "#fad75a",
  borderRadius: "20px",
  border: "medium none",
  padding: "1.2em 1.3em",
  color: "black",
  fontSize: "25px",
  boxShadow: "0 0 5px -1px rgba(0,0,0,0.2)",
  fontWeight: "bold",
  letterSpacing: "3px",
  transition: "background 350ms cubic-bezier(0, 0, 0.25, 1) 0s",
  cursor: "pointer"
};

class login extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      status: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    window.location.href = "/login";
    // let loginData;
    // axios.get('http://localhost:8888/login')
    // .then(res =>{
    //     window.location = res.request.responseURL;
    //     // loginData = res.data;
    //     // this.props.handleLogin({userName:loginData.result.data.content.username, band:loginData.result.data.content.band});
    //     // Cookie.set('userName', loginData.result.data.content.username, { expires: 30 });
    //     // Cookie.set('band', loginData.result.data.content.band, { expires: 30 });
    //   })
    //   .catch(err =>{
    //     console.log(err);
    //   });
    // .catch(function (error) {
    //   console.log(error);
    //   this.setState({status: true});
    // });
  }

  render() {
    return (
      <div
        style={{
          paddingTop: "150px",
          height: "450px",
          border: "solid #b9b9b9 3px"
        }}
      >
        <div>
          <Welcome />
          <button style={style} onClick={this.handleClick}>
            Login With Codechef
          </button>
          {this.state.status && (
            <div style={{ backgroundColor: "#d94d65" }}>
              <strong>Something went wrong ! Please Login again </strong>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default login;
