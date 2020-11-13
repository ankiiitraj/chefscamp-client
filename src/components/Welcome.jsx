import React, { Component } from "react";
class Welcome extends Component {
  render() {
    return (
      <div>
        <center>
          <h1>
            Welcome to{" "}
            <span style={{ fontSize: "45px" }}>
              &lt; Chef&apos;sCamp
              <svg height="43" xmlnsDc="http://purl.org/dc/elements/1.1/" xmlnsCc="http://creativecommons.org/ns#" xmlnsRdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlnsSvg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 47.5" enableBackground="new 0 0 47.5 47.5" xmlSpace="preserve" version="1.1" id="svg2"><metadata id="metadata8"><rdfRDF><ccWork rdfAbout=""><dcFormat>image/svg+xml</dcFormat><dcType rdfResource="http://purl.org/dc/dcmitype/StillImage"/></ccWork></rdfRDF></metadata><defs id="defs6"><clipPath id="clipPath16" clipPathUnits="userSpaceOnUse"><path id="path18" d="M 0,38 38,38 38,0 0,0 0,38 Z"/></clipPath></defs><g transform="matrix(1.25,0,0,-1.25,0,47.5)" id="g10"><g id="g12"><g clip-path="url(#clipPath16)" id="g14"><g transform="translate(37,5)" id="g20"><path id="path22" fill="#77b255" fillOpacity="1" fillRule="nonzero" stroke="none" d="m 0,0 c 0,-2.209 -1.791,-4 -4,-4 l -28,0 c -2.209,0 -4,1.791 -4,4 l 0,28 c 0,2.209 1.791,4 4,4 l 28,0 c 2.209,0 4,-1.791 4,-4 L 0,0 Z"/></g><g transform="translate(14.5,8)" id="g24"><path id="path26" fill="#ffffff" fillOpacity="1" fillRule="nonzero" stroke="none" d="m 0,0 c -0.64,0 -1.28,0.244 -1.768,0.732 l -6.5,6.5 c -0.976,0.977 -0.976,2.559 0,3.536 0.976,0.976 2.56,0.976 3.536,0 L 0,6.035 13.732,19.768 c 0.977,0.976 2.559,0.976 3.536,0 0.976,-0.977 0.976,-2.559 0,-3.536 L 1.768,0.732 C 1.28,0.244 0.64,0 0,0"/></g></g></g></g></svg>
              {" "}
              /&gt;
            </span>
          </h1>
          <h3>
            Hit <i>login</i> to get started!
          </h3>
        </center>
      </div>
    );
  }
}

export default Welcome;
