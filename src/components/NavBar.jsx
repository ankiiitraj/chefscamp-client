import React from "react";
import { ReactComponent as Logo } from "./logos/logo.svg";
import Cookie from "js-cookie";
import { colors } from "./bandColors";
import { Link } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';

const ul = {
  overflow: "hidden",
  listStyleType: "none",
  margin: "0px",
  padding: "10px 0px",
  height: "40px",
  lineHeight: "40px",
};

const style = {
  backgroundColor: "#fad75a",
  borderRadius: "10px",
  border: "medium none",
  padding: "10px 12px",
  fontWeight: "bold",
  letterSpacing: "3px",
  transition: "background 350ms cubic-bezier(0, 0, 0.25, 1) 0s",
  cursor: "pointer",
};

const NavBar = ({ handleLogout, handleToggle, color, userName, band }) => {
  const { addToast } = useToasts();
  return (
    <React.Fragment>
      <div style={{ textAlign: "center", padding: "10px" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <strong style={{ fontSize: "30px", color: color }}>
            &lt; Chef&apos;sCamp
            <Logo /> /&gt;
          </strong>
        </Link>
      </div>
      <div style={{ position: "absolute", left: "-60px" }}>
        <div style={{ position: "fixed", marginTop: "25px" }}>
          <div
            style={{ float: "right", cursor: "pointer" }}
            onClick={handleToggle}
          >
            <svg
              height="45px"
              viewBox="0 0 512 512"
              color="white"
              width="45px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill={color}>
                <path d="m57.8125 337.492188v57.175781c0 32.425781 26.453125 58.878906 58.878906 58.878906h57.175782l40.53125 40.53125c11.09375 11.09375 26.027343 17.28125 41.601562 17.28125s30.507812-6.1875 41.601562-17.28125l40.53125-40.53125h57.175782c32.425781 0 58.878906-26.453125 58.878906-58.878906v-57.175781l40.53125-40.53125c11.09375-11.09375 17.28125-26.027344 17.28125-41.601563s-6.1875-30.507813-17.28125-41.597656l-40.53125-40.535157v-57.171874c0-32.429688-26.453125-58.882813-58.878906-58.882813h-57.175782l-40.53125-40.53125c-22.1875-22.1875-61.015624-22.1875-83.203124 0l-40.53125 40.53125h-57.175782c-32.425781 0-58.878906 26.453125-58.878906 58.882813v57.171874l-40.53125 40.535157c-11.09375 11.089843-17.28125 26.023437-17.28125 41.597656s6.1875 30.507813 17.28125 41.601563zm198.1875-210.132813c17.066406 0 33.492188 3.199219 48.640625 9.175781 6.1875 2.558594 10.027344 8.53125 10.027344 14.929688 0 6.613281-4.054688 12.589844-10.242188 14.933594-33.707031 13.226562-69.757812 43.523437-69.757812 88.960937 0 45.441406 36.050781 75.734375 69.757812 88.960937 6.1875 2.347657 10.242188 8.320313 10.242188 14.933594 0 6.398438-3.839844 12.371094-10.027344 14.933594-15.148437 5.972656-31.574219 9.171875-48.640625 9.171875-74.238281 0-128-53.757813-128-128 0-74.238281 53.761719-128 128-128zm0 0" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          width: "300px",
          right: "-355px",
          top: "55px",
          textAlign: "left",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 0px 15px 5px",
          borderRadius: "10px",
          margin: "15px",
          padding: "15px"
        }}
      >
        See more projects:
        <div style={{ fontSize: "large", padding: "3px 0px" }} > - <a rel="noopener noreferrer" target="_blank" href="https://dotodsa.netlify.app/">Doto - Progress Tracker</a></div>
        <div style={{ fontSize: "large", padding: "3px 0px" }} > - <a rel="noopener noreferrer" target="_blank" href="https://visualrithms.netlify.app/">Visualrithms - Algorithmic Visualizer</a></div>
        <div style={{ fontSize: "large", padding: "3px 0px" }} > - <a rel="noopener noreferrer" target="_blank" href="https://github.com/ankiiitraj/remindingYou">Reminding You</a></div>
        <div style={{ fontSize: "large", padding: "3px 0px" }} > - <a rel="noopener noreferrer" target="_blank" href="https://ankiiitraj.github.io/SnakeGame/">Snake Game</a></div>
      </div>
      <nav
        style={{
          boxShadow: "0px 0px 15px 5px rgba(0,0,0,.35)",
          borderRadius: "10px",
          margin: "15px",
          padding: "5px",
        }}
      >
        <ul style={ul}>
          {Cookie.get("userName") && (
            <li
              style={{ float: "right", fontSize: "20px", marginRight: "15px" }}
            >
              <Link
                onClick={() => {
                  addToast("Logout successful!", {
                    appearance: 'info',
                    autoDismiss: true,
                  })
                  handleLogout();
                }}
                to="/"
              >
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  style={style}
                >
                  Logout
                </button>
              </Link>
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
                backgroundColor: colors[band],
              }}
            >
              {band}
            </span>{" "}
            {userName} !
          </li>
          <li style={{ float: "left", marginLeft: "15px" }}>
            <Link to="/" style={{ color: color, fontSize: "20px" }}>
              Home
            </Link>
          </li>
          <li style={{ float: "left", marginLeft: "15px" }}>
            <Link to="/gym" style={{ color: color, fontSize: "20px" }}>
              Gym
            </Link>
          </li>
          {userName !== "User" && <><li style={{ float: "left", marginLeft: "15px" }}>
            <Link to="/ide" style={{ color: color, fontSize: "20px" }}>
              IDE
            </Link>
          </li>
          <li style={{ float: "left", marginLeft: "15px" }}>
            <Link to="/" style={{ color: color, fontSize: "20px" }}>
              ContestSearch
            </Link>
          </li></>}
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
