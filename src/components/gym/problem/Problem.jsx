import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MarkdownRender from "../../../MarkdownRender";
import ErrorBoundary from "../../errorBoundary";
import Cookie from "js-cookie";
import axios from "axios";
import "./problem.css";
import AddTag from "./AddTag";

const Problem = () => {
  const { problemCode } = useParams();
  const [status, updateStatus] = useState({
    message: "Hold up tight, fetching problem details 🚀",
    color: "#fad75a",
    loaded: false,
    data: null,
    privateTags: [],
  });
  
  const user = Cookie.get("userName") || "codechef";
  useEffect(() => {
    document.title = `${problemCode}-Chef'sCamp`;
    const username = Cookie.get("userName") || "codechef";
    const fetchProblem = async () => {
      try {
        const result = await Promise.all([
          axios.get(
            `/api/contests/PRACTICE/problems/${problemCode}`
          ),
          username !== "codechef" ? axios.get(
            `/api/tags/${problemCode}/my`
          ) : []
        ]);
        updateStatus({
          ...status,
          message: "Problem fetched 🎉",
          color: "",
          loaded: true,
          data: result[0].data.result.data.content,
          privateTags: result[1]?.data?.result?.tags || []
        });
      } catch (err) {
        // console.log(err, {...err})
        updateStatus({
          ...status,
          message: "Problem fetching failed, please try again later 🤕",
          color: "#d94d65",
          data: null,
          loaded: false,
        });
      }
    };

    fetchProblem();
    // eslint-disable-next-line
  }, []);

  const addPrivateTag = (tag) => {
    updateStatus({...status, privateTags: [...status.privateTags, tag]});
  }

  const getStatement = (statement) => {
    statement = statement.replace(/`/g, "");
    statement = statement.replace(/###/g, "");
    // statement = statement.replace(/(<br \/>)/g, "");
    return statement;
  };

  return (
    <>
      <div className="problem-container">
        {status.data === null ? (
          <div
            style={{
              margin: "300px 1em 1em 1em",
              padding: "1em",
              width: "400px",
              fontSize: "x-large",
              borderRadius: "20px",
              backgroundColor: status.color,
            }}
          >
            <strong>{status.message}</strong>
          </div>
        ) : (
          <>
            <div className="problem-container-title">
              <div>
                <h2>
                  {status.data.problemName} | <small>{problemCode}</small>
                </h2>
              </div>
              <div>
                <Link
                  to={{
                    pathname: `/ide`,
                  }}
                >
                  <button className="problem-container-button">Submit</button>
                </Link>
              </div>
            </div>
            <div className="problem-container-details">
              <div className="problem-container-statement">
                <ErrorBoundary>
                  <MarkdownRender source={getStatement(status.data.body)} />
                </ErrorBoundary>
              </div>
              <div className="problem-container-meta">
                <h5>Tags: </h5>
                {status.data.tags.length === 0 ? (
                  <span style={{ color: "red" }}>No tags available</span>
                ) : (
                  status.data.tags
                    .sort((a, b) => a.length - b.length)
                    .map((item, idx) => {
                      return (
                        <div className="problem-container-tag-pill" key={idx}>
                          {item}
                        </div>
                      );
                    })
                )}
                <hr className="problem-container-hr" />
                <h5>Private tags: </h5>
                {user === "codechef" ? (
                  <span style={{ color: "red" }}>
                    <Link to="/">Login</Link> to see your private tags.
                  </span>
                ) : (
                  <>
                    {status.privateTags.length === 0 ? (
                      <span style={{ color: "red" }}>No tags available</span>
                    ) : (
                      status.privateTags
                        .sort((a, b) => a.length - b.length)
                        .map((item, idx) => {
                          return (
                            <div
                              style={{ backgroundColor: "#bada55" }}
                              className="problem-container-tag-pill"
                              key={idx}
                            >
                              {item}
                            </div>
                          );
                        })
                    )}
                    <br />
                    <br />
                    <AddTag problemData={status.data} addPrivateTag={addPrivateTag} />
                  </>
                )}
                <hr className="problem-container-hr" />
                <h5>
                  Date added: <span>{status.data.dateAdded}</span>
                </h5>
                <h5>
                  Author:{" "}
                  <span>
                    {status.data.author}{" "}
                    <span role="img" aria-label="img">
                      📝
                    </span>
                  </span>
                </h5>
                <h5>
                  Submissions: <span>{status.data.totalSubmissions}</span>
                </h5>
                <h5>
                  Accuracy:{" "}
                  <span>
                    {parseInt(
                      (status.data.successfulSubmissions /
                        status.data.totalSubmissions) *
                        100
                    )}
                    {"%"}{" "}
                    <span role="img" aria-label="img">
                      🎯
                    </span>
                  </span>
                </h5>
                <h5>
                  Time limit:{" "}
                  <span>
                    {status.data.maxTimeLimit} secs{" "}
                    <span role="img" aria-label="img">
                      ⌛
                    </span>
                  </span>
                </h5>
                <h5>
                  Source limit: <span>{status.data.sourceSizeLimit} bytes</span>
                </h5>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Problem;
