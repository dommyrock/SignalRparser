import React from "react";
import { code, jsxcode, csscode } from "./codeContainer";
import SyntaxHighlighterMain from "./SyntaxHighlighterMain";

const ExampleHighlighter = () => {
  return (
    <>
      <SyntaxHighlighterMain {...{ code: code, language: "js" }} />
      <SyntaxHighlighterMain {...{ code: csscode, language: "css" }} />
      <SyntaxHighlighterMain {...{ code: jsxcode, language: "css" }} />
    </>
  );
};

export default ExampleHighlighter;
