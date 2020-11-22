import React, { useEffect, useState } from "react";
import "./gym.css";
import Tagutil from "./tags/Tagutil";
import axios from "axios";

const Gym = () => {
	const [status, setStatus] = useState({message: "loading . . .", color: "#fad75a"});
	const [tags, setTags] = useState({tags: [], topicTags: [], authorTags: [], privateTags: []});
  
  const fetchTags = async () => {
    try{
      const { data } = await axios.get(`/api/tags`);
      data.sort((a, b) => b.count - a.count);
      const topicTags = data.filter((item) => item.tag_type === 'actual_tag').slice(0, 10);
      const authorTags = data.filter((item) => item.tag_type === 'author').slice(0, 10);
      setTags({...tags, tags: [...data], topicTags: [...topicTags], authorTags: [...authorTags]});
      setStatus({message: "success"});
    }catch(err){
      setStatus({message: "Tags fetching failed, please try later!", color: "#d94d65"});
    }
  }

  useEffect(fetchTags, []);

  return (
    <>
      <div className="gym">
				<div className="gym-tags-select"></div>
        <div className="gym-popular-tags">
          {status.message === "success" ?
            <>
              <Tagutil status={status} style={{borderRight: "solid 1px #b9b9b980"}} type="topic" title="Popular topic tags" tags={tags.topicTags} />
              <Tagutil status={status} type="author" title="Popular author tags" tags={tags.authorTags} />
              <Tagutil status={status} style={{borderLeft: "solid 1px #b9b9b980"}} type="private" title="Your private tags" tags={tags.privateTags} />
            </>
            : <span  style={{color: "#1b1b1b", borderRadius: "10px", padding: "10px", margin: "10px", backgroundColor: status.color}}>{status.message}</span>
          }
        </div>
      </div>
    </>
  );
};

export default Gym;
