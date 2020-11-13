import React, { Component } from "react";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";

const ul = {
  overflow: "hidden",
  listStyleType: "none",
  margin: '0px',
  padding: '10px 0px',
  height: "40px",
  lineHeight: "40px"
};

const colors = {
  "N/A": "#fad75a",
  "1★": "#666666",
  "2★": "#1e7d22",
  "3★": "#3366cc",
  "4★": "#684273",
  "5★": "#ffbf00",
  "6★": "#ff7f00",
  "7★": "#d0011b",
};
const style = {
  backgroundColor: "#fad75a",
  borderRadius: "10px",
  border: "medium none",
  padding: "10px 12px",
  // fontSize: "14px",
  fontWeight: "bold",
  letterSpacing: "3px",
  transition: "background 350ms cubic-bezier(0, 0, 0.25, 1) 0s",
  cursor: "pointer",
};
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.handleLogout();
  }

  render() {
    return (
      <React.Fragment>
        <div style={{textAlign: 'left', padding: '10px'}}>
          <Link to="/">
            <strong style={{ fontSize: "30px", color: this.props.color }}>
              &lt; Chef&apos;sCamp
              <svg height="28" xmlnsDc="http://purl.org/dc/elements/1.1/" xmlnsCc="http://creativecommons.org/ns#" xmlnsRdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlnsSvg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 47.5" enableBackground="new 0 0 47.5 47.5" xmlSpace="preserve" version="1.1" id="svg2"><metadata id="metadata8"><rdfRDF><ccWork rdfAbout=""><dcFormat>image/svg+xml</dcFormat><dcType rdfResource="http://purl.org/dc/dcmitype/StillImage"/></ccWork></rdfRDF></metadata><defs id="defs6"><clipPath id="clipPath16" clipPathUnits="userSpaceOnUse"><path id="path18" d="M 0,38 38,38 38,0 0,0 0,38 Z"/></clipPath></defs><g transform="matrix(1.25,0,0,-1.25,0,47.5)" id="g10"><g id="g12"><g clip-path="url(#clipPath16)" id="g14"><g transform="translate(37,5)" id="g20"><path id="path22" fill="#77b255" fillOpacity="1" fillRule="nonzero" stroke="none" d="m 0,0 c 0,-2.209 -1.791,-4 -4,-4 l -28,0 c -2.209,0 -4,1.791 -4,4 l 0,28 c 0,2.209 1.791,4 4,4 l 28,0 c 2.209,0 4,-1.791 4,-4 L 0,0 Z"/></g><g transform="translate(14.5,8)" id="g24"><path id="path26" fill="#ffffff" fillOpacity="1" fillRule="nonzero" stroke="none" d="m 0,0 c -0.64,0 -1.28,0.244 -1.768,0.732 l -6.5,6.5 c -0.976,0.977 -0.976,2.559 0,3.536 0.976,0.976 2.56,0.976 3.536,0 L 0,6.035 13.732,19.768 c 0.977,0.976 2.559,0.976 3.536,0 0.976,-0.977 0.976,-2.559 0,-3.536 L 1.768,0.732 C 1.28,0.244 0.64,0 0,0"/></g></g></g></g></svg>
              {" "}/&gt;
            </strong>
          </Link>
          {this.props.color === "white" && <span style={{float: 'right', marginTop: "20px", fontSize: "20px"}}>
            Welcome to the DarkSide!
          </span>}
        </div>
        <div style={{position: 'absolute', left: '-60px'}}>
          <div style={{position: 'fixed', marginTop: '10px'}}>
            <div
              style={{ float: "right", cursor: "pointer"}}
              onClick={this.props.handleToggle}
            >
              <svg
                height="45px"
                viewBox="0 0 512 512"
                color="white"
                width="45px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill={this.props.color}>
                  <path d="m57.8125 337.492188v57.175781c0 32.425781 26.453125 58.878906 58.878906 58.878906h57.175782l40.53125 40.53125c11.09375 11.09375 26.027343 17.28125 41.601562 17.28125s30.507812-6.1875 41.601562-17.28125l40.53125-40.53125h57.175782c32.425781 0 58.878906-26.453125 58.878906-58.878906v-57.175781l40.53125-40.53125c11.09375-11.09375 17.28125-26.027344 17.28125-41.601563s-6.1875-30.507813-17.28125-41.597656l-40.53125-40.535157v-57.171874c0-32.429688-26.453125-58.882813-58.878906-58.882813h-57.175782l-40.53125-40.53125c-22.1875-22.1875-61.015624-22.1875-83.203124 0l-40.53125 40.53125h-57.175782c-32.425781 0-58.878906 26.453125-58.878906 58.882813v57.171874l-40.53125 40.535157c-11.09375 11.089843-17.28125 26.023437-17.28125 41.597656s6.1875 30.507813 17.28125 41.601563zm198.1875-210.132813c17.066406 0 33.492188 3.199219 48.640625 9.175781 6.1875 2.558594 10.027344 8.53125 10.027344 14.929688 0 6.613281-4.054688 12.589844-10.242188 14.933594-33.707031 13.226562-69.757812 43.523437-69.757812 88.960937 0 45.441406 36.050781 75.734375 69.757812 88.960937 6.1875 2.347657 10.242188 8.320313 10.242188 14.933594 0 6.398438-3.839844 12.371094-10.027344 14.933594-15.148437 5.972656-31.574219 9.171875-48.640625 9.171875-74.238281 0-128-53.757813-128-128 0-74.238281 53.761719-128 128-128zm0 0" />
                </g>
              </svg>
            </div>
          </div>
        </div>
        <nav style={{ border: "solid #b9b9b9 3px", marginBottom: "5px" }}>
          <ul style={ul}>
            {Cookie.get("userName") && ( 
              <li style={{ float: "right", fontSize: "20px", marginRight: "15px" }}>
                <button onClick={this.handleLogout} style={style}>
                  Logout
                </button>
              </li>
            )}
            <li style={{ float: "right", fontSize: "20px", marginRight: "15px" }}>
              Hi{" "}
              <span
                style={{
                  fontSize: "15px",
                  verticalAlign: "middle",
                  color: "white",
                  padding: "1px 8px",
                  backgroundColor: colors[this.props.band],
                }}
              >
                {this.props.band}
              </span>{" "}
              {this.props.userName} !
            </li>
            <li style={{ float: 'left', marginLeft: "15px" }}>
              <Link
                to="/"
                style={{ color: this.props.color, fontSize: "20px" }}
              >
                Home
              </Link>
            </li>
            <li style={{ float: 'left', marginLeft: "15px" }}>
              <Link
                to="/ide"
                style={{ color: this.props.color, fontSize: "20px" }}
              >
                IDE
              </Link>
            </li>
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
