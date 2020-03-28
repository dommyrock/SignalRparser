import React from "react";
import { code, jsxcode, csscode } from "./codeContainer";
import SyntaxHighlighterMain from "./SyntaxHighlighterMain";

const ExampleHighlighter = () => {
  return (
    <>
      <div className="two-columns-row" style={margin_bottom}>
        <div className="two-columns-column">
          <h1>js</h1>
          <SyntaxHighlighterMain {...{ code: code, language: "js" }} />
        </div>
        <div className="two-columns-column right-div-highlight" style={margin_top}>
          <h1>title placeholders</h1>
        </div>
      </div>
      <div className="two-columns-row" style={margin_bottom}>
        <div className="two-columns-column">
          <h1>css</h1>
          <SyntaxHighlighterMain {...{ code: csscode, language: "css" }} />
        </div>
        <div className="two-columns-column"></div>
      </div>
      <div className="two-columns-row" style={margin_bottom}>
        <div className="two-columns-column">
          <h1>jsx</h1>
          <SyntaxHighlighterMain {...{ code: jsxcode, language: "jsx" }} />
        </div>
        <div className="two-columns-column">
          <h2>dont even need text</h2>
        </div>
      </div>
    </>
  );
};

export default ExampleHighlighter;

const margin_bottom = {
  marginBottom: "50px"
};
const margin_top = {
  marginTop: "45px",
  marginLeft: "10px"
};
