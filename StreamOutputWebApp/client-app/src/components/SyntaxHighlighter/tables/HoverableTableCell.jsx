import React from "react";
// import proptypes from "prop-types";

const HoverableTableCell = (cellText) => {
  return (
    /* cellText passed from HoverableTableCell parent*/
    <div className="flex-row first" role="cell">
      {cellText}
    </div>
  );
};

export default HoverableTableCell;
