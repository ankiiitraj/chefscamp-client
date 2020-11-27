import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ExternalLink } from "../../logos/externalLink.svg";
import "./problemlist.css";

const ProblemList = ({ problemList, tagList, message }) => {
  const getUniqueTags = (items) => {
    let tags = [];
    if (typeof items === "string") {
      tags = [...new Set(items.split(","))];
      tags = [...tags, ...tagList];
      tags = [...new Set(tags)];
    } else {
      tags = [...new Set(items)];
    }
    tags.sort((a, b) => a.length - b.length);
    const uniqueTags = tags.map((tag) => {
      return (
        <div
          key={tag}
          style={{
            backgroundColor:
              tagList.indexOf(tag) !== -1
                ? tag.indexOf("@") !== -1
                  ? "#77b255"
                  : "#ebf5ff"
                : "",
          }}
          className="problemlist-tag-pill"
        >
          {tag}
        </div>
      );
    });
    return uniqueTags;
  };
  return (
    <>
      <div className="problemlist">
        {problemList.length === 0 ? (
          <div
            style={{
              padding: "20px 0px",
              fontSize: "large",
              color: message.color,
            }}
          >
            {message.message}
          </div>
        ) : (
          problemList.map((item, idx) => {
            return (
              <div key={idx} className="problemlist-problem">
                <div className="problemlist-heading">
                  <div style={{ fontSize: "x-large" }}>
                    <Link
                      to={`/gym/problem/${item?.code || item?.problemCode}`}
                      target="_blank"
                    >
                      <b>{item?.code || item?.problemCode}</b>
                      <ExternalLink height={25} width={25} />
                    </Link>
                  </div>
                  <div style={{}}>
                    Submissions: {item?.attempted || item?.totalSubmissions} |
                    Accuracy:{" "}
                    {`${parseInt(
                      ((item?.solved || item?.successfulSubmissions) /
                        (item?.attempted || item?.totalSubmissions)) *
                        100
                    )}%`}{" "}
                  </div>
                </div>
                <div className="problemlist-tags">
                  <span style={{ marginRight: "5px" }}>Tags: </span>
                  {getUniqueTags(item?.tags || item?.problemTags).map((tag) => {
                    return tag;
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default ProblemList;
