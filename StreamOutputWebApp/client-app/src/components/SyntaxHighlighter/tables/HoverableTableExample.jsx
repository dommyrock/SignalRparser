import React, { useEffect, useRef } from "react";
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
import ".././scrollable.css";

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

// const buildThresholdArray = () => Array.from(Array(100).keys(), (i) => i / 100);

const HoverableTableExample = () => {
  //NOTE : This works only with HashRouter ... because of #tags it breaks without
  //Color elements in view (Table of content elements on right)
  // let observer = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      //if route != /tables observer.disconnect()
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const node = document.querySelector(`nav li a[href="#${id}"]`);
        // {entry.intersectionRatio} threshold can be any ratio from 0 to 1 where 1 means the element is 100% in the viewport and 0 is 100% out of the viewport. By default, the threshold is set to 0.
        if (entry.intersectionRatio > 0) {
          node.classList.add("active_section");
        } else {
          if (node) {
            node.classList.remove("active_section");
          } else observer.disconnect();
        }
      });
    });
    // Track all sections that have an `id` applied
    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });
  }, []);

  return (
    <>
      <h1 style={center_text_inline}>Example of all custom tables I have </h1>
      <h3 style={center_text_inline}>There is also sticky table of contents on the right</h3>
      <main className="main_scrollable">
        <div>
          <section id="algorithms_TC">
            <h3 style={center_text_inline}>Algorithm time complexity</h3>
            <HoverableTable
              {...{ firstHeader: firstHeader, restOfHeaders: restOfHeaders, rowsData: algorithmRows, columns: 6 }}
            />
          </section>
          <section id="data_structures_big-o">
            <h3 style={center_text_inline}>Data Structures Big-O</h3>
            <HoverableTable
              {...{ firstHeader: first10, restOfHeaders: restOfH10, rowsData: dataStructureRows, columns: 10 }}
            />
          </section>
          {/* 3 col example */}
          <section id="common_js_built_in_func">
            <h3 style={center_text_inline}>Common JS Array built-in functions</h3>
            <HoverableTable
              {...{ firstHeader: firstCommonjs, restOfHeaders: restOfCOmmonJS, rowsData: commonJSfunc, columns: 3 }}
            />
          </section>
          <section id="array_operations_tc">
            <h3 style={center_text_inline}>Array operations time complexity</h3>
            <HoverableTable
              {...{
                firstHeader: arrOpsTCFirst,
                restOfHeaders: restarrOpsTC,
                rowsData: arrayOTC,
                columns: 2,
              }}
            />
          </section>
          <section id="big_o_notation">
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
          </section>
          {/* <OriginalTableExample /> */}
        </div>
        <nav className="section_nav">
          <ol className="ol">
            <li>
              <a href="#algorithms_TC">Algorithms time complexity</a>
            </li>
            <li>
              <a href="#data_structures_big-o">Data structures Big-O</a>
            </li>
            <li>
              <a href="#common_js_built_in_func">Common Js functions TC</a>
              <ul>
                <li>
                  <a href="#test_1">Nested example 1</a>
                </li>
                <li>
                  <a href="#test_2">Nested example 2</a>
                </li>
                <li>
                  <a href="#test_3">Nested example 3</a>
                </li>
                <li>
                  <a href="#test_4">Nested example 4</a>
                </li>
                <li>
                  <a href="#test_5">Nested example 5</a>
                  <ul>
                    <li>
                      <a href="#test_6">Double nested example 1</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <a href="#array_operations_tc">Array operations TC</a>
            </li>
            <li>
              <a href="#big_o_notation">Big O notation</a>
            </li>
          </ol>
        </nav>
      </main>
    </>
  );
};

export default HoverableTableExample;
const center_text_inline = {
  textAlign: "center",
};

/* replaced DOMContentLoaded with useEffect because....
 The DOMContentLoaded event is exclusive to when the entire HTML page loads. Therefore, this event is only fired once and only once, throughout the entirety of the web page's lifetime.
*/

/* HOW TO USE  OBSERVERS IN REACT
https://medium.com/the-non-traditional-developer/how-to-use-an-intersectionobserver-in-a-react-hook-9fb061ac6cb5*/

//if i want to hide something form page -->style="visiblity:hidden"

// beutifull dnd table example :https://github.com/atlassian/react-beautiful-dnd/blob/master/stories/src/table/with-fixed-columns.jsx
//scrollinto view nav https://css-tricks.com/sticky-table-of-contents-with-scrolling-active-states/
