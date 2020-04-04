import React from "react";
import HoverableTableCell from "./HoverableTableCell";
const HoverableTableRow = (row) => {
  return (
    /*Map each cell to new component from passed row.cells  */
    <div className="flex-table row" role="rowgroup">
      {row.cells.map((cell) => (
        <HoverableTableCell {...{ cell }} />
      ))}

      {/* <div className="flex-row first" role="cell">
        United Kingdom
      </div>
      <div className="flex-row" role="cell">
        Stonehenge, Windsor and Bath with Pub Lunch{" "}
      </div>
      <div className="flex-row" role="cell">
        19 Sep, 1p.m.
      </div>
      <div className="flex-row" role="cell">
        US$500
      </div>
      <div className="flex-row" role="cell">
        US$500
      </div>
      <div className="flex-row" role="cell">
        US$50
      </div> */}
    </div>
  );
};

export default HoverableTableRow;
