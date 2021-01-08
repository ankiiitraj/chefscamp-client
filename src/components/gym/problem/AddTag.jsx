import React, { useState } from "react";
import TagInputForm from "./TagInputForm";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookie from "js-cookie";
import { useToasts } from 'react-toast-notifications';

const AddTag = ({ problemData, addPrivateTag }) => {
	const [tagInputbool, showTagInput] = useState(false);
	const [status, updateStatus] = useState({message: "", color: ""});
  const history = useHistory();
  const { addToast } = useToasts();

  const addTag = async (tag) => {
		updateStatus({message: "Creating...", color: "#fff"});
    const username = Cookie.get("userName") || null;
    if (username === null) {
      addToast("Login expired, Signin again!", {
        appearance: 'error',
        autoDismiss: true,
      })
      history.push("/");
    }
    let tags = "";
    for (const tag in problemData.tags) {
      tags += `${problemData.tags[tag]},`;
    }
    tags = tags.slice(0, -1);
    const payload = {
      tag: tag,
      problemCode: problemData.problemCode,
      successfulSubmissions: problemData.successfulSubmissions,
      totalSubmissions: problemData.totalSubmissions,
      problemTags: tags,
    };
		try{
			await axios.post(`/api/tags`, payload);
			updateStatus({message: "Created...", color: "#96ff8d"});
			addPrivateTag(tag);
		}catch(err){
			updateStatus({message: err?.response?.data?.error || "Error! Not Created...", color: "#ff7a00"});
		}
		
  };

  return (
    <>
      <div
        style={{ backgroundColor: "#da5555", cursor: "pointer", fontSize: "x-large" }}
        className="problem-container-tag-pill"
        onClick={() => {
          showTagInput(!tagInputbool);
        }}
      >
        <strong>+ Add tag </strong>
      </div>
      {tagInputbool && (
				<>
					<TagInputForm disabled={status.color === "#fff"} showTagInput={showTagInput} addTag={addTag} />
					<span style={{ color: status.color }}>{status.message}</span>
				</>
      )}
    </>
  );
};

export default AddTag;
