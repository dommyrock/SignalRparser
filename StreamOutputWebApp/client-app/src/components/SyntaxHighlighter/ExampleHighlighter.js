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
          {" "}
          //extract this div to separate component ...
          <h1>title placeholders</h1>
          <iframe
            class="IRDadbHkJGPfjbO4QZWKA"
            style={{ margin: "10px" }}
            width="300"
            height="150"
            src="https://www.youtube.com/embed/0eJEUOk6eCU"
            frameborder="0"
            allowfullscreen=""
          ></iframe>
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
        <div className="two-columns-column right-div-highlight" style={margin_top}>
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
