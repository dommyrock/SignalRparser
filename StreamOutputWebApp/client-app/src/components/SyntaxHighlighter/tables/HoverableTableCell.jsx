import React from "react";
import PropTypes from "prop-types";

//TODO:pass another param number:columnNumber for className
const HoverableTableCell = ({ cell, columns, cellColor, rowIndex }) => {
  let cellText = cell; /* cellText passed from HoverableTableCell parent*/
  // console.log(rowIndex);

  return (
    <div
      className={`flex-row-${columns} first`}
      role="cell"
      style={cellColor ? { backgroundColor: `${colorCell(cellColor, rowIndex)}` } : null}
    >
      {/* If row has color passed to it print it as link */}
      {cellColor ? <a>{cellText}</a> : cellText}
    </div>
  );
};
HoverableTableCell.propTypes = {
  cell: PropTypes.string.isRequired,
  columns: PropTypes.number.isRequired,
  cellColor: PropTypes.object,
  rowIndex: PropTypes.number,
};
// HoverableTableCell.defaultProps={} default
export default HoverableTableCell;

/**
 * Calculate color for each passed cell.
 * @param {*} color
 * Cell color
 * @param {*} rowIndex
 * Cell index
 */
function colorCell(color, rowIndex) {
  console.log(rowIndex);
  if (rowIndex < 4) return color.green;
  else if (rowIndex > 3 && rowIndex < 6) return color.yellow;
  else return color.red;
}
//NOTE :each cell print will have passed row index same
