import React from "react";
import { ReactComponent as Forward } from "../logos/forward.svg";
import { ReactComponent as Backward } from "../logos/backward.svg";
import "./paginate.css";

const Paginate = ({ disableForward, disableBackward, updatePropsOffset }) => {
  return (
    <>
      <div className="paginate">
        <div
          onClick={() => {
						if(!disableBackward)
            updatePropsOffset(-1);
          }}
          title={disableBackward ? "Initial" : "Previous"}
          disabled={disableBackward}
          style={{ cursor: disableBackward ? "" : "pointer" }}
        >
          <Backward height={60} width={60} />
        </div>
        <div
          onClick={() => {
						if(!disableForward)
            	updatePropsOffset(1);
          }}
          title={disableForward ? "End" : "Next"}
          disabled={disableForward}
          style={{ cursor: disableForward ? "" : "pointer" }}
        >
          <Forward height={60} width={60} />
        </div>
      </div>
    </>
  );
};

export default Paginate;
