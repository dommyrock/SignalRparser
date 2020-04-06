import React from "react";
import HoverableTableCell from "./HoverableTableCell";
import PropTypes from "prop-types";

const HoverableTableRow = ({ row, columns }) => {
  return (
    /*Map each cell to new component from passed rowDAta  */
    <div className="flex-table row" role="rowgroup">
      {row.map((cell, index) => (
        <HoverableTableCell {...{ cell, columns }} key={index} />
      ))}
    </div>
  );
};
HoverableTableRow.propTypes = {
  row: PropTypes.array.isRequired, //axample of prop type setting
};

export default HoverableTableRow;
