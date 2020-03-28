import React from "react";
import { code, jsxcode, csscode } from "./codeContainer";
import SyntaxHighlighterMain from "./SyntaxHighlighterMain";

const ExampleHighlighter = () => {
  return (
    <>
      <div style={inlineCss}>
        <h1>js</h1>
        <SyntaxHighlighterMain {...{ code: code, language: "js" }} />
      </div>
      <div style={inlineCss}>
        <h1>css</h1>

        <SyntaxHighlighterMain {...{ code: csscode, language: "css" }} />
      </div>
      <div style={inlineCss}>
        <h1>jsx</h1>

        <SyntaxHighlighterMain {...{ code: jsxcode, language: "jsx" }} />
      </div>
    </>
  );
};

export default ExampleHighlighter;

const inlineCss = {
  marginBottom: "50px"
};
