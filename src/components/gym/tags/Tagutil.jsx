import React from "react";
import "./tagutil.css";
import Cookie from 'js-cookie';
import { Link } from "react-router-dom";

const Tagutil = ({ style, type, tags, title }) => {
  let username = 'user';
  if(type === 'private'){
    username = Cookie.get('userName') || null;
  }
  return (
    <>
      <div style={{ ...style }} className="tagutil">
        <h3>{title}</h3>
        {username !== null && 
          <div className="taglist-popular">
            {tags.length > 0 &&
              tags.map((tag, idx) => {
                return (
                  <div key={idx} className="taglist-tag">
                    {tag.tag} <span className="taglist-tag-count">×{tag.count}</span>
                  </div>
                );
              })}
            {tags.length === 0 && (
              <span style={{ fontSize: "medium" }}>
                Whoops! tags not available right now ...
              </span>
            )}
          </div>
        }
        {(username === null && type === 'private') && <span><Link to='/'>Login</Link> to see your private tags.</span>}
      </div>
    </>
  );
};

export default Tagutil;
