import React, { useState, useCallback } from "react";
import { jscode, jsxcode, csscode, optimalHMImplementation } from "./codeContainer";
import SyntaxHighlighterMain from "./SyntaxHighlighterMain";
import VideoContainer from "./VideoContainer";
import { Link } from "react-router-dom";

const ExampleHighlighter = () => {
  const width = "300";
  const height = "150";

  const [showOptimalHMBtnState, setShowHMBtnState] = useState(false);
  //memoized callBACK
  const handleClickOptimalHM = useCallback(() => {
    setShowHMBtnState(!showOptimalHMBtnState);
  }, [showOptimalHMBtnState]);
  // TODO: OPTIMIZE RE-RENDERING OF OTHER SyntaxHighlighterMain WHEN STATE CHANGES ONLY "showOptimalHMBtnState"
  return (
    <>
      <div>
        <Link to="/table">
          <h2>-Table example</h2>
        </Link>
        <Link to="/featured">
          <h2>Animated data example</h2>
        </Link>
        <Link to="/expenses">
          <h2>Expenses calculator example</h2>
        </Link>
        <Link to="/drag">
          <h2>Draggable/droppable</h2>
        </Link>
      </div>
      <div className="two-columns-row" style={center_children}>
        <div className="two-columns-column">
          <h1>js</h1>
          <SyntaxHighlighterMain {...{ code: jscode, language: "js" }} />
        </div>
        <VideoContainer {...{ width: width, height: height, src: "https://www.youtube.com/embed/0eJEUOk6eCU" }} />
      </div>
      <div className="two-columns-row" style={center_children}>
        <div className="two-columns-column">
          <h1>css</h1>
          <SyntaxHighlighterMain {...{ code: csscode, language: "css" }} />
        </div>
        <div className="two-columns-column"></div>
      </div>
      <div className="two-columns-row" style={center_children}>
        <div className="two-columns-column">
          <h1>jsx</h1>
          <SyntaxHighlighterMain {...{ code: jsxcode, language: "jsx" }} />
        </div>
        <div className="two-columns-column right-div-highlight" style={margin_top_left_col2}>
          <h2>dont even need text</h2>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <button className="buttonBlue" onClick={handleClickOptimalHM}>
          Show Optimal Hash Map code
        </button>
      </div>
      {showOptimalHMBtnState && (
        <div className="two-columns-row" style={center_children}>
          <div className="two-columns-column">
            <h1>Optimal Hash Map implementation</h1>
            <SyntaxHighlighterMain {...{ code: optimalHMImplementation, language: "js" }} />
          </div>
        </div>
      )}
      <h2>testing img linking(by default react knows they are in pub folder)</h2>
      <img src={process.env.PUBLIC_URL + "/big-o-running-time-complexity.png"} alt="image" />
    </>
  );
};

export default ExampleHighlighter;
/*conditional rendering info :https://reactjs.org/docs/conditional-rendering.html

---passing  params to event handlers -->
---hoooks -->https://stackoverflow.com/questions/55001372/correct-way-to-create-event-handlers-using-hooks-in-react
---classes -->https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method

--preventing all components to rereneder on state change:https://medium.com/@guptagaruda/react-hooks-understanding-component-re-renders-9708ddee9928#204b
--re renderign FAQ :https://stackoverflow.com/questions/55373878/what-are-the-differences-when-re-rendering-after-state-was-set-with-hooks-compar
*/
const center_children = {
  justifyContent: "center",
};
const margin_bottom = {
  marginBottom: "50px",
};
const margin_top_left_col2 = {
  marginTop: "45px",
  marginLeft: "10px",
  paddingLeft: "50px",
};
//rest of container css in index.css
