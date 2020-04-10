import React from "react";
// import OriginalTableExample from "./originalTable";
import HoverableTable from "./HoverableTable";
import {
  algorithmHeaders,
  algorithmRows,
  dataStructureHeaders,
  dataStructureRows,
  commonJSfunc,
  commonJSfuncHeaders,
  arrayOTCHeaders,
  arrayOTC,
  bigONamesHeaders,
  bigONames,
} from "./table_data";
// beutifull dnd table example :https://github.com/atlassian/react-beautiful-dnd/blob/master/stories/src/table/with-fixed-columns.jsx

/*data  @src https://en.wikipedia.org/wiki/Best,_worst_and_average_case */
const HoverableTableExample = () => {
  const firstHeader = algorithmHeaders[0];
  algorithmHeaders.shift(); //remove 1st element
  const restOfHeaders = algorithmHeaders;
  //10 col table data
  const first10 = dataStructureHeaders[0];
  dataStructureHeaders.shift();
  const restOfH10 = dataStructureHeaders;
  //common js func
  const firstCommonjs = commonJSfuncHeaders[0];
  commonJSfuncHeaders.shift();
  const restOfCOmmonJS = commonJSfuncHeaders;
  //array ops tc
  const arrOpsTCFirst = arrayOTCHeaders[0];
  arrayOTCHeaders.shift();
  const restarrOpsTC = arrayOTCHeaders;
  //big O names
  const bigONamesFirst = bigONamesHeaders[0];
  bigONamesHeaders.shift();
  const restOfbigONamesHeaders = bigONamesHeaders;

  return (
    <>
      <HoverableTable
        {...{ firstHeader: firstHeader, restOfHeaders: restOfHeaders, rowsData: algorithmRows, columns: 6 }}
      />
      <h3 style={center_text_inline}>Data Structures Big-O</h3>
      <HoverableTable
        {...{ firstHeader: first10, restOfHeaders: restOfH10, rowsData: dataStructureRows, columns: 10 }}
      />
      {/* 3 col eample */}
      <h3 style={center_text_inline}>Common JS Array built-in functions</h3>
      <HoverableTable
        {...{ firstHeader: firstCommonjs, restOfHeaders: restOfCOmmonJS, rowsData: commonJSfunc, columns: 3 }}
      />
      <h3 style={center_text_inline}>Array operations time complexity</h3>
      <HoverableTable
        {...{
          firstHeader: arrOpsTCFirst,
          restOfHeaders: restarrOpsTC,
          rowsData: arrayOTC,
          columns: 2,
        }}
      />
      <h3 style={center_text_inline}>Big O Notation</h3>
      <HoverableTable
        {...{
          firstHeader: bigONamesFirst,
          restOfHeaders: restOfbigONamesHeaders,
          rowsData: bigONames,
          columns: 3,
          cellColor: { green: "rgb(198, 239, 206)", yellow: "#FFF3E0", red: "#FFEBEE" },
        }}
      />
      {/* <OriginalTableExample /> */}
    </>
  );
};

export default HoverableTableExample;
const center_text_inline = {
  textAlign: "center",
};

//if i want to hide something form page -->style="visiblity:hidden"
