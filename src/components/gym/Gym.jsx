import React, { useEffect, useState } from "react";
import "./gym.css";
import Tagutil from "./tags/Tagutil";
import axios from "axios";
import FilterTags from "./filterTags/FilterTags";

const Gym = () => {
  const [status, setStatus] = useState({
    message: "loading . . .",
    color: "#fad75a",
  });
  const [tags, setTags] = useState({
    tags: [],
    topicTags: [],
    authorTags: [],
    privateTags: [],
  });
  const [singleTag, updateSingleTag] = useState("");

  const fetchTags = async () => {
    try {
      const { data } = await axios.get(`/api/tags`);
      data.sort((a, b) => b.count - a.count);
      const topicTags = data
        .filter((item) => item.tag_type === "actual_tag")
        .slice(0, 10);
      const authorTags = data
        .filter((item) => item.tag_type === "author")
        .slice(0, 10);
      setTags({
        ...tags,
        tags: [...data],
        topicTags: [...topicTags],
        authorTags: [...authorTags],
      });
      setStatus({ message: "success" });
    } catch (err) {
      setStatus({
        message: "Tags fetching failed, please try later!",
        color: "#d94d65",
      });
    }
  };
  useEffect(() => {
    document.title = "Gym - Chef'sCamp";
    fetchTags();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="gym">
        <div className="gym-popular-tags">
          {status.message === "success" ? (
            <>
              <Tagutil
                status={status}
                type="topic"
                title="Popular topic tags"
                tags={tags.topicTags}
                updateSingleTag={updateSingleTag}
              />
              <Tagutil
                status={status}
                type="author"
                title="Popular author tags"
                tags={tags.authorTags}
                updateSingleTag={updateSingleTag}
              />
              <Tagutil
                status={status}
                type="private"
                title="Your private tags"
                tags={tags.privateTags}
                updateSingleTag={updateSingleTag}
              />
            </>
          ) : (
            <div
              style={{
                color: "#1b1b1b",
                borderRadius: "10px",
                padding: "10px",
                margin: "10px",
                backgroundColor: status.color,
                textAlign: "center",
              }}
            >
              <span>{status.message}</span>
            </div>
          )}
        </div>
        <div className="gym-tags-select">
          <FilterTags singleTag={singleTag} tags={tags.tags} />
        </div>
      </div>
    </>
  );
};

export default Gym;
