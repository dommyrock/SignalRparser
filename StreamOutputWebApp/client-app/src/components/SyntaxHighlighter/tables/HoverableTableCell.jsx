import React from "react";
import PropTypes from "prop-types";

const HoverableTableCell = ({ cell }) => {
  let cellText = cell; /* cellText passed from HoverableTableCell parent*/
  return (
    <div className="flex-row-6 first" role="cell">
      {cellText}
    </div>
  );
};
HoverableTableCell.propTypes = {
  cell: PropTypes.string.isRequired, //axample of prop type setting
};
export default HoverableTableCell;
