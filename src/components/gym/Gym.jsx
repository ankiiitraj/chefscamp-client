import React, { useEffect, useState } from "react";
import "./gym.css";
import Tagutil from "./tags/Tagutil";
import axios from "axios";
import Cookie from "js-cookie";
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
  const [showTagSwitch, toggle] = useState(0);

  useEffect(() => {
    document.title = "Gym - Chef'sCamp";
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const username = Cookie.get('userName') || null;
        const allData = await Promise.all([
          axios.get(`/api/tags`),
          username !== null ? axios.get(`/api/tags/my`) : null
        ]);
        const { data } = allData[0];
        let privateTags = [];
        if(username !== null){
          const { data } = allData[1];
          privateTags = [...data.result.tags];
        }
        data.sort((a, b) => b.count - a.count);
        const topicTags = data
          .filter((item) => item.tag_type === "actual_tag")
          .slice(0, 10);
        const authorTags = data
          .filter((item) => item.tag_type === "author")
          .slice(0, 10);
        setTags({
          tags: [...data],
          topicTags: [...topicTags],
          authorTags: [...authorTags],
          privateTags: [...privateTags]
        });
        setStatus({ message: "success" });
      } catch (err) {
        setStatus({
          message: "Tags fetching failed, please try later!",
          color: "#d94d65",
        });
      }
    };
    fetchTags();
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
                title="Popular CONCEPT tags"
                tags={tags.topicTags}
                updateSingleTag={updateSingleTag}
              />
              <Tagutil
                status={status}
                type="author"
                title="Popular AUTHOR tags"
                tags={tags.authorTags}
                updateSingleTag={updateSingleTag}
              />
              <Tagutil
                status={status}
                type="private"
                title="Your PRIVATE tags"
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
          <FilterTags privateTags={tags.privateTags} singleTag={singleTag} tags={tags.tags} />
        </div>
      </div>
      <div className="alltags-container">
        <div className="alltags-heading">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div><h1>List all tags?{" "}</h1></div>
            <div style={{ marginLeft: "15px", paddingBottom: "15px" }}>
              <input checked={showTagSwitch} onChange={() => {
								toggle(!showTagSwitch);
							}} type="checkbox" id="switch" />
              <label htmlFor="switch">Toggle</label>{" "}
            </div>
          </div>
          <span>Use search insted, this might be scary {"😨"}</span>
        </div>
				{showTagSwitch === true && <div style={{ display: "flex", justifyContent: "space-evenly" }}>
					<Tagutil
						status={status}
						type="topic"
						title="Category: Concept"
						tags={[...tags.tags.filter((item) => item.tag_type === "actual_tag")]}
						updateSingleTag={updateSingleTag}
					/>
					<Tagutil
						status={status}
						type="author"
						title="Category: Author"
						tags={[...tags.tags.filter((item) => item.tag_type === "author")]}
						updateSingleTag={updateSingleTag}
					/>
				</div>}
      </div>
    </>
  );
};

export default Gym;
