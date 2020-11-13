import React, { Component } from "react";
import { a } from "react-router-dom";
import codechefLogo from "./logos/codechef-logo.png";
import codechefFull from "./logos/codechef-full.png";
import gmailLogo from "./logos/gmail.ico";

class Footer extends Component {
  render() {
    return (
      <div style={{border: "3px solid #b9b9b9", marginTop: "5px"}}>
        <ul style={{listStyleType: "none", overflow: "hidden", margin: "0", padding: "0"}}>
          <li style={{padding: "10px", float: "left"}}>
            <div>
              <h2>Special Thanks<br />
              <span>
                <b>
                  <a href="https://codechef.com/" target="_blank" rel="noopener noreferrer"><img width="150" src={codechefFull} alt="codechef.com" /></a>
                </b>
              </span>
							</h2>
            </div>
          </li>
          <li style={{padding: "10px", display: "inline-block", textAlign: "left"}}>
            <h2>Source Code</h2>
						{/* eslint-disable-next-line */}
            <div style={{padding: "5px 0px"}}><a href="https://github.com/ankiiitraj/ChefsCamp/blob/master/README.md" target="_blank" rel="noopener noreferrer" style={(this.props.userDetails.themeBool == 0 ? {color:"white"} : {color:"black"})}><b>Contribte</b></a></div>
						{/* eslint-disable-next-line */}
            <div style={{padding: "5px 0px"}}><a href="https://github.com/ankiiitraj/ChefsCamp/issues" target="_blank" rel="noopener noreferrer" style={(this.props.userDetails.themeBool == 0 ? {color:"white"} : {color:"black"})}><b>Report an issue</b></a></div>
          </li>
          <li style={{padding: "10px", float: "right"}}>
						<h2>Connect here</h2>
						<ul style={{listStyleType: "none", padding: "10px 0px", textAlign: "center"}}>
							{/* eslint-disable-next-line */}
							<li style={{display: "inline-block", marginRight: "10px"}}><a href="https://github.com/ankiiitraj/" target="_blank" rel="noopener noreferrer"><svg width="25px" height="25px" viewBox="0 0 33 33" version="1.1" role="img" xmlns="http://www.w3.org/2000/svg"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g transform="translate(-136.000000, -331.000000)"><path fill={this.props.userDetails.themeBool == 0 ? "white" : "black"} d="M152.608,331.455 C143.614,331.455 136.32,338.748 136.32,347.745 C136.32,354.942 140.987,361.047 147.46,363.201 C148.275,363.351 148.572,362.848 148.572,362.416 C148.572,362.029 148.558,361.005 148.55,359.646 C144.019,360.63 143.063,357.462 143.063,357.462 C142.322,355.58 141.254,355.079 141.254,355.079 C139.775,354.069 141.366,354.089 141.366,354.089 C143.001,354.204 143.861,355.768 143.861,355.768 C145.314,358.257 147.674,357.538 148.602,357.121 C148.75,356.069 149.171,355.351 149.636,354.944 C146.019,354.533 142.216,353.135 142.216,346.893 C142.216,345.115 142.851,343.66 143.893,342.522 C143.725,342.11 143.166,340.453 144.053,338.211 C144.053,338.211 145.42,337.773 148.532,339.881 C149.831,339.519 151.225,339.339 152.61,339.332 C153.994,339.339 155.387,339.519 156.688,339.881 C159.798,337.773 161.163,338.211 161.163,338.211 C162.052,340.453 161.493,342.11 161.326,342.522 C162.37,343.66 163,345.115 163,346.893 C163,353.151 159.191,354.528 155.563,354.931 C156.147,355.434 156.668,356.428 156.668,357.947 C156.668,360.125 156.648,361.882 156.648,362.416 C156.648,362.852 156.942,363.359 157.768,363.2 C164.236,361.041 168.899,354.94 168.899,347.745 C168.899,338.748 161.605,331.455 152.608,331.455"></path></g></g></svg></a></li>
							<li style={{display: "inline-block", marginRight: "10px"}}><a href="https://www.linkedin.com/in/ankiiitraj/" target="_blank" rel="noopener noreferrer"><svg version="1.1" id="Capa_1" width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"	 viewBox="0 0 112.196 112.196" ><g><circle fill="#007AB9" cx="56.098" cy="56.097" r="56.098"/>	<g><path fill="#F1F2F2" d="M89.616,60.611v23.128H76.207V62.161c0-5.418-1.936-9.118-6.791-9.118c-3.705,0-5.906,2.491-6.878,4.903c-0.353,0.862-0.444,2.059-0.444,3.268v22.524H48.684c0,0,0.18-36.546,0-40.329h13.411v5.715c-0.027,0.045-0.065,0.089-0.089,0.132h0.089v-0.132c1.782-2.742,4.96-6.662,12.085-6.662C83.002,42.462,89.616,48.226,89.616,60.611L89.616,60.611z M34.656,23.969c-4.587,0-7.588,3.011-7.588,6.967c0,3.872,2.914,6.97,7.412,6.97h0.087c4.677,0,7.585-3.098,7.585-6.97C42.063,26.98,39.244,23.969,34.656,23.969L34.656,23.969zM27.865,83.739H41.27V43.409H27.865V83.739z"/></g></g></svg></a></li>
							<li style={{display: "inline-block", marginRight: "10px"}}><a href="https://www.codechef.com/users/mkitkat" target="_blank" rel="noopener noreferrer"><img src={codechefLogo} width="25px" height="25px" alt="codechef" /></a></li>
							{/* eslint-disable-next-line */}
							<li style={{display: "inline-block"}}><a href="https://ankiiitraj.github.io/" target="_blank" rel="noopener noreferrer"><svg id="Layer_1" enableBackground="new 0 0 512.418 512.418" height="25" viewBox="0 0 512.418 512.418" width="32" xmlns="http://www.w3.org/2000/svg"><path fill={this.props.userDetails.themeBool == 0 ? "white" : "black"} d="m437.335 75.082c-100.1-100.102-262.136-100.118-362.252 0-100.103 100.102-100.118 262.136 0 362.253 100.1 100.102 262.136 100.117 362.252 0 100.103-100.102 100.117-262.136 0-362.253zm-10.706 325.739c-11.968-10.702-24.77-20.173-38.264-28.335 8.919-30.809 14.203-64.712 15.452-99.954h75.309c-3.405 47.503-21.657 92.064-52.497 128.289zm-393.338-128.289h75.309c1.249 35.242 6.533 69.145 15.452 99.954-13.494 8.162-26.296 17.633-38.264 28.335-30.84-36.225-49.091-80.786-52.497-128.289zm52.498-160.936c11.968 10.702 24.77 20.173 38.264 28.335-8.919 30.809-14.203 64.712-15.452 99.954h-75.31c3.406-47.502 21.657-92.063 52.498-128.289zm154.097 31.709c-26.622-1.904-52.291-8.461-76.088-19.278 13.84-35.639 39.354-78.384 76.088-88.977zm0 32.708v63.873h-98.625c1.13-29.812 5.354-58.439 12.379-84.632 27.043 11.822 56.127 18.882 86.246 20.759zm0 96.519v63.873c-30.119 1.877-59.203 8.937-86.246 20.759-7.025-26.193-11.249-54.82-12.379-84.632zm0 96.581v108.254c-36.732-10.593-62.246-53.333-76.088-88.976 23.797-10.817 49.466-17.374 76.088-19.278zm32.646 0c26.622 1.904 52.291 8.461 76.088 19.278-13.841 35.64-39.354 78.383-76.088 88.976zm0-32.708v-63.873h98.625c-1.13 29.812-5.354 58.439-12.379 84.632-27.043-11.822-56.127-18.882-86.246-20.759zm0-96.519v-63.873c30.119-1.877 59.203-8.937 86.246-20.759 7.025 26.193 11.249 54.82 12.379 84.632zm0-96.581v-108.254c36.734 10.593 62.248 53.338 76.088 88.977-23.797 10.816-49.466 17.373-76.088 19.277zm73.32-91.957c20.895 9.15 40.389 21.557 57.864 36.951-8.318 7.334-17.095 13.984-26.26 19.931-8.139-20.152-18.536-39.736-31.604-56.882zm-210.891 56.882c-9.165-5.947-17.941-12.597-26.26-19.931 17.475-15.394 36.969-27.801 57.864-36.951-13.068 17.148-23.465 36.732-31.604 56.882zm.001 295.958c8.138 20.151 18.537 39.736 31.604 56.882-20.895-9.15-40.389-21.557-57.864-36.951 8.318-7.334 17.095-13.984 26.26-19.931zm242.494 0c9.165 5.947 17.942 12.597 26.26 19.93-17.475 15.394-36.969 27.801-57.864 36.951 13.067-17.144 23.465-36.729 31.604-56.881zm26.362-164.302c-1.249-35.242-6.533-69.146-15.452-99.954 13.494-8.162 26.295-17.633 38.264-28.335 30.84 36.225 49.091 80.786 52.497 128.289z"/></svg></a></li>
							<br />
							<li style={{display: "inline-block", marginRight: "10px"}}><a href="https://www.facebook.com/ankiiitraj" target="_blank" rel="noopener noreferrer"><svg version="1.1" id="Capa_1" width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"	 viewBox="0 0 112.196 112.196" enableBackground="new 0 0 112.196 112.196"><g>	<circle fill="#3B5998" cx="56.098" cy="56.098" r="56.098"/>	<path fill="#FFFFFF" d="M70.201,58.294h-10.01v36.672H45.025V58.294h-7.213V45.406h7.213v-8.34		c0-5.964,2.833-15.303,15.301-15.303L71.56,21.81v12.51h-8.151c-1.337,0-3.217,0.668-3.217,3.513v7.585h11.334L70.201,58.294z"/></g></svg></a></li>
							<li style={{display: "inline-block"}}><a href="mailto:ankitatiiitr@gmail.com" target="_blank" rel="noopener noreferrer"><img alt="mail" src={gmailLogo} width="25px" height="25px" /></a></li>
						</ul>
					</li>
        </ul>
				<hr width="700px"  style={{margin: "0px"}}/>
				{/* eslint-disable-next-line */}
				<div style={{padding: "10px"}}><small>Made with <span style={{color: "#ff0000"}}>❤</span> by <a href="https://github.com/ankiiitraj/" target="_blank" rel="noopener noreferrer" style={(this.props.userDetails.themeBool == 0 ? {color:"white"} : {color:"black"})}>Ankit</a> © 2020</small></div>
      </div>
    );
  }
}

export default Footer;