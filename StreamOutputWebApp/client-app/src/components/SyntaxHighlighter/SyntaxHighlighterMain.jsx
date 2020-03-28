//prismjs import is only thing needed for now-->works with Regex in background
import React, { useEffect } from "react";
import "prismjs";
import "prismjs/components/prism-jsx.min";
import "../../prism.css";

const SyntaxHighlighterMain = props => {
  // useEffect(() => {
  //   // Use setTimeout to push onto callback queue so it runs after the DOM is updated ---NOTE : works without hook too
  //   Prism.highlightAll();
  // }, []);
  console.log(props);

  return (
    <>
      <div className="gatsby-highlight">
        <pre>
          <code className={"language-" + props.language}>{props.code}</code>
        </pre>
      </div>
    </>
  );
};
export default SyntaxHighlighterMain;
