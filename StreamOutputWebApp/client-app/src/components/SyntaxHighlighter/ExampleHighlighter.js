import React from "react";
import { code, jsxcode, csscode } from "./codeContainer";
import SyntaxHighlighterMain from "./SyntaxHighlighterMain";

const ExampleHighlighter = () => {
  return (
    <>
      <div style={inlineCss}>
        <SyntaxHighlighterMain {...{ code: code, language: "js" }} />
      </div>
      <div style={inlineCss}>
        <SyntaxHighlighterMain {...{ code: csscode, language: "css" }} />
      </div>
      <div style={inlineCss}>
        <SyntaxHighlighterMain {...{ code: jsxcode, language: "css" }} />
      </div>
    </>
  );
};

export default ExampleHighlighter;

const inlineCss = {
  marginBottom: "50px"
};
