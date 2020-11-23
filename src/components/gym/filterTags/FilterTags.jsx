import React, { useEffect, useState } from "react";
import "./filtertags.css";
import Select from "react-virtualized-select";
import ProblemList from "../problemList/ProblemList";
import Paginate from "../../pagination/Paginate";
import "react-select/dist/react-select.css";
import "react-virtualized-select/styles.css";
import axios from "axios";
import Cookie from "js-cookie";

const FilterTags = ({ tags, singleTag }) => {
  let options = tags.map((item) => {
    return { ...item, value: item.tag, label: `${item.tag} × ${item.count}` };
  });
  const [selected, setSelected] = useState("");
  const [problemList, fillProblemList] = useState([]);
  const [tagList, fillTagList] = useState([]);
  const [message, updateMessage] = useState({
    message: "Problem for selected tags will appear here...",
    color: "",
  });

  const getProblems = async (filter = null, offsetParam = 0) => {
    const username = Cookie.get("userName");
    updateMessage({
      message: "Hold up tight, fetching problems for you!",
      color: "#007eff",
    });
    fillProblemList([]);
    fillTagList([]);
    updateOffset(offsetParam);
    try {
      const result = await axios.get(
        `/api/tags/problems/${username}?offset=${20*offsetParam}&filter=${filter || selected}`
      );
      const problemsObject = result.data.result.data.content;
      const problems = [];
      for (const prob in problemsObject) {
        problems.push(problemsObject[prob]);
      }
      fillProblemList([...problems]);
      console.log(selected);
      const tags = filter?.split(",") || selected.split(",");
      fillTagList([...tags]);
    } catch (err) {
      if (err.response?.data?.result?.errors?.message !== undefined) {
        updateMessage({
          message: err.response.data.result.errors.message,
          color: "#d94d65",
        });
      } else {
        updateMessage({
          message: "Something went wrong try again after sometime",
          color: "#d94d65",
        });
      }
    }
  };

  const [offset, updateOffset] = useState(0);
  const updatePropsOffset = (direction) => {
    if(direction < 0) {
      getProblems(null, offset -1)
    }else if(direction > 0) {
      getProblems(null, offset +1);
    }
  }

  useEffect(() => {
    const singleSelect = (tag) => {
      setSelected(tag);
      getProblems(tag);
    };
    if (singleTag !== "") {
      singleSelect(singleTag);
    }
    // eslint-disable-next-line
  }, [singleTag]);

  return (
    <>
      <div className="filtertags">
        <div className="filtertags-selected">
          <Select
            autofocus
            clearable={true}
            disabled={false}
            labelKey="label"
            multi={true}
            onChange={(e) => {
              setSelected(e);
            }}
            options={options}
            searchable={true}
            simpleValue
            value={selected}
            valueKey="value"
          />
          <div className="filtertags-button">
            <button
              onClick={() => {
                getProblems();
              }}
            >
              Get problems
            </button>
          </div>
        </div>
        <ProblemList
          problemList={problemList}
          tagList={tagList}
          message={message}
        />
      </div>
      <Paginate
        updatePropsOffset={updatePropsOffset}
        disableBackward={offset === 0 ? true : false}
        disableForward={problemList.length < 20 ? true : false}
      />
    </>
  );
};

export default FilterTags;
