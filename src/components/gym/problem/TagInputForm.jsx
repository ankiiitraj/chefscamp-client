import React, { useState } from "react";

const TagInputForm = ({ disabled, addTag, showTagInput }) => {
  const [tag, handleTagChange] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addTag(tag);
      }}
      style={{
        display: "flex",
      }}
    >
      <input
				type="text"
				required
        value={tag}
        placeholder={"Tag-name..."}
        onChange={(e) => {
          handleTagChange(e.target.value);
        }}
      />
      <button
				disabled={disabled}
				title={disabled ? "Disabled" : ""}
        style={{ fontSize: "2em", background: "none", border: "none", cursor: "pointer" }}
        type="submit"
      >
        {"✅"}
      </button>
      <button
				disabled={disabled}
				title={disabled ? "Disabled" : ""}
        style={{ fontSize: "2em", background: "none", border: "none", cursor: "pointer" }}
        onClick={() => {
          showTagInput(false);
        }}
      >
        {"❌"}
      </button>
    </form>
  );
};

export default TagInputForm;
