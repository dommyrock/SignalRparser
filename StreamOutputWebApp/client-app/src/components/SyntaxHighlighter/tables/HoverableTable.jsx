import React from "react";
import { headers, rows } from "./table_data";
import HoverableTableRow from "./HoverableTableRow";
//css from index.css

//first header is
const HoverableTable = () => {
  return (
    <div className="table-container" role="table" aria-label="Destinations">
      <div className="flex-table header" role="rowgroup">
        <div className="flex-row-6 first" role="columnheader">
          Algorithm
        </div>
        {headers.map((header, index) => (
          <div className="flex-row-6" role="columnheader" key={index}>
            {header}
          </div>
        ))}
      </div>
      {/*Each row has cell's data for its row   */}
      {rows.map((row, index) => (
        <HoverableTableRow {...{ row }} key={index} />
      ))}
    </div>
  );
};

export default HoverableTable;
