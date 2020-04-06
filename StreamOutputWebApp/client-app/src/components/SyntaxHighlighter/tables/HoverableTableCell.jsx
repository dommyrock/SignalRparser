import React from "react";
import PropTypes from "prop-types";

//TODO:pass another param number:columnNumber for className
const HoverableTableCell = ({ cell, columns }) => {
  let cellText = cell; /* cellText passed from HoverableTableCell parent*/
  return (
    <div className={`flex-row-${columns} first`} role="cell">
      {cellText}
    </div>
  );
};
HoverableTableCell.propTypes = {
  cell: PropTypes.string.isRequired,
  columns: PropTypes.number.isRequired,
};
export default HoverableTableCell;
