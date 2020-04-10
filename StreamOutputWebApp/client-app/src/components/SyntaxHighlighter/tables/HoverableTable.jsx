import React from "react";
import HoverableTableRow from "./HoverableTableRow";
import PropTypes from "prop-types";
//css from index.css

//TODO : here i have same problem with rendering as in ExampleHighlighter.jsx... use react dev tools -->profiler for help!!
//  <div className={`flex-row-${columns} first`} role="columnheader"> "flex-row-6 first".... doesnt
//get all data so each time i back out i lose 1 table header value

//if i make this reusable , props would be : {string:firstHeader, array:headers, array:rows}
const HoverableTable = ({ firstHeader, restOfHeaders, rowsData, columns, cellColor }) => {
  return (
    <div className={`table-container-${columns}`} role="table" aria-label="Destinations">
      <div className="flex-table header" role="rowgroup">
        <div className={`flex-row-${columns} first`} role="columnheader">
          {firstHeader}
          <br />
          <a className="a-wiki-custom" href="https://en.wikipedia.org/wiki/Best,_worst_and_average_case">
            Wiki
          </a>
        </div>
        {restOfHeaders.map((header, index) => (
          <div className={`flex-row-${columns}`} role="columnheader" key={index}>
            {header}
          </div>
        ))}
      </div>
      {/*Each row has cell's data for its row   */}
      {rowsData.map((row, index) => (
        <HoverableTableRow {...{ row, columns: columns, cellColor, rowIndex: index }} key={index} />
      ))}
    </div>
  );
};
HoverableTable.propTypes = {
  firstHeader: PropTypes.string.isRequired,
  restOfHeaders: PropTypes.array.isRequired,
  rowsData: PropTypes.array.isRequired,
  columns: PropTypes.number.isRequired,
  cellColor: PropTypes.object,
};
// HoverableTableRow.defaultProps={firstHeader:'Ananas'}
export default HoverableTable;
