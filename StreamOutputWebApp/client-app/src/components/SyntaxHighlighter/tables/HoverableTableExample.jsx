import React from "react";
// beutifull dnd table example :https://github.com/atlassian/react-beautiful-dnd/blob/master/stories/src/table/with-fixed-columns.jsx

/*data  @src https://en.wikipedia.org/wiki/Best,_worst_and_average_case */
const HoverableTableExample = () => {
  return (
    <div className="table-container" role="table" aria-label="Destinations">
      <div className="flex-table header" role="rowgroup">
        <div className="flex-row first" role="columnheader">
          Country
        </div>
        <div className="flex-row" role="columnheader">
          Events
        </div>
        <div className="flex-row" role="columnheader">
          Time
        </div>
        <div className="flex-row" role="columnheader">
          Fees
        </div>
        <div className="flex-row" role="columnheader">
          tax
        </div>
        <div className="flex-row" role="columnheader">
          over paid tax
        </div>
      </div>
      <div className="flex-table row" role="rowgroup">
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
      {/*aditional grids inside row example */}
      {/* <div className="flex-table row" role="rowgroup">
        <div className="flex-row rowspan first">United States</div>
        <div className="column">
          <div className="flex-row">
            <div className="flex-cell" role="cell">
              Napa and Sonoma Wine Country Tour
            </div>
            <div className="flex-cell" role="cell">
              5 Sep, 9p.m.
            </div>
            <div className="flex-cell" role="cell">
              US$600
            </div>
            <div className="flex-cell" role="cell">
              US$600
            </div>
          </div>
          <div className="flex-row" role="rowgroup">
            <div className="flex-cell" role="cell">
              Day Trip to Martha's Vineyard
            </div>
            <div className="flex-cell" role="cell">
              12 Sep, 5p.m.
            </div>
            <div className="flex-cell" role="cell">
              US$600
            </div>
            <div className="flex-cell" role="cell">
              US$600
            </div>
          </div>
          <div className="flex-row" role="rowgroup">
            <div className="flex-cell" role="cell">
              Grand Canyon West Rim and Hoover Dam Tour
            </div>
            <div className="flex-cell" role="cell">
              5 Sep, 2p.m.
            </div>
            <div className="flex-cell" role="cell">
              US$550
            </div>
            <div className="flex-cell" role="cell">
              US$550
            </div>
          </div>
        </div>
      </div> */}
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
      </div>
    </div>
  );
};

export default HoverableTableExample;