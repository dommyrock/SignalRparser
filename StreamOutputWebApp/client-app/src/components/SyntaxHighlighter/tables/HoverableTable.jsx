import React from "react";
import { headers, rows } from "./table_data";
import HoverableTableRow from "./HoverableTableRow";
import HoverableTableCell from "./HoverableTableCell";
const HoverableTable = () => {
  return (
    <div className="table-container" role="table" aria-label="Destinations">
      <div className="flex-table header" role="rowgroup">
        <div className="flex-row first" role="columnheader">
          Algorithm
        </div>
        {headers.map((header, index) => (
          <div className="flex-row" role="columnheader" key={index}>
            {header}
          </div>
        ))}
      </div>
      {/*Each row has cell's data for its row   */}
      {rows.map((row) => (
        <HoverableTableRow {...{ row }} />
      ))}
      {/* <div className="flex-table row" role="rowgroup">
        <div className="flex-row first" role="cell">
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
        </div>
      </div>
      <div className="flex-table row" role="rowgroup">
        <div className="flex-row first" role="cell">
          {" "}
          Australia
        </div>
        <div className="flex-row" role="cell">
          Blue Mountains Tours
        </div>
        <div className="flex-row" role="cell">
          9 Sep, 2p.m.
        </div>
        <div className="flex-row" role="cell">
          US$400
        </div>
        <div className="flex-row" role="cell">
          US$400
        </div>
        <div className="flex-row" role="cell">
          US$655
        </div>
      </div> */}
    </div>
  );
};

export default HoverableTable;
