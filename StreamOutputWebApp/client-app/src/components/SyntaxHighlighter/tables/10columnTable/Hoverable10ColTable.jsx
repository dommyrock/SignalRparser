import React from "react";
import HoverableTableRow from "../HoverableTableRow";
import PropTypes from "prop-types";
//css from index.css

//if i make this reusable , props would be : {string:firstHeader, array:headers, array:rows}
const Hoverable10ColTable = ({ firstHeader, restOfHeaders, rowsData }) => {
  return (
    <div className="table-container-10" role="table" aria-label="Destinations">
      <div className="flex-table header" role="rowgroup">
        <div className="flex-row-10 first" role="columnheader">
          {firstHeader}
        </div>
        {restOfHeaders.map((header, index) => (
          <div className="flex-row-10" role="columnheader" key={index}>
            {header}
          </div>
        ))}
      </div>
      {/*Each row has cell's data for its row   */}
      {rowsData.map((row, index) => (
        <HoverableTableRow {...{ row, columns: 10 }} key={index} />
      ))}
    </div>
  );
};
Hoverable10ColTable.propTypes = {
  firstHeader: PropTypes.string.isRequired,
  restOfHeaders: PropTypes.array.isRequired,
  rowsData: PropTypes.array.isRequired,
};
export default Hoverable10ColTable;
