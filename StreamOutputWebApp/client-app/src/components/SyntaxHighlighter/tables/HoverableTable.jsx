import React from "react";
import HoverableTableRow from "./HoverableTableRow";
import PropTypes from "prop-types";
//css from index.css

//if i make this reusable , props would be : {string:firstHeader, array:headers, array:rows}
const HoverableTable = ({ firstHeader, restOfHeaders, rowsData }) => {
  return (
    <div className="table-container" role="table" aria-label="Destinations">
      <div className="flex-table header" role="rowgroup">
        <div className="flex-row-6 first" role="columnheader">
          {firstHeader}
          <br />
          <a className="a-wiki-custom" href="https://en.wikipedia.org/wiki/Best,_worst_and_average_case">
            Wiki
          </a>
        </div>
        {restOfHeaders.map((header, index) => (
          <div className="flex-row-6" role="columnheader" key={index}>
            {header}
          </div>
        ))}
      </div>
      {/*Each row has cell's data for its row   */}
      {rowsData.map((row, index) => (
        <HoverableTableRow {...{ row, columns: 6 }} key={index} />
      ))}
    </div>
  );
};
HoverableTable.propTypes = {
  firstHeader: PropTypes.string.isRequired,
  restOfHeaders: PropTypes.array.isRequired,
  rowsData: PropTypes.array.isRequired,
};
export default HoverableTable;
