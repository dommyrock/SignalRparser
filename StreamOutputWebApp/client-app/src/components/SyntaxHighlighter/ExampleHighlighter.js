import React from "react";
import { jscode, jsxcode, csscode } from "./codeContainer";
import SyntaxHighlighterMain from "./SyntaxHighlighterMain";
import VideoContainer from "./VideoContainer";
import { Link } from "react-router-dom";

const ExampleHighlighter = () => {
  const width = "300";
  const height = "150";
  return (
    <>
      <Link to="/table">
        <h2>-Table example</h2>
      </Link>
      <Link to="/featured">
        <h2>-Animated data example</h2>
      </Link>
      <Link to="/expenses">
        <h2>-Expenses calculator example</h2>
      </Link>
      <Link to="/stream">
        <h2>-stream route</h2>
      </Link>

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
    </>
  );
};

export default ExampleHighlighter;

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
