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
      {/* <h1>css</h1>
      <div className="gatsby-highlight">
        <pre>
          <code className="language-css">{props.csscode}</code>
        </pre>
      </div>
      <h1>jsx</h1>
      <div className="gatsby-highlight">
        <pre>
          <code className="language-jsx">{props.jsxcode}</code>
        </pre>
      </div> */}
    </>
  );
};
export default SyntaxHighlighterMain;

// css example with class component ---(also didnt need .babelrc file)
// const code = `
// const foo = 'foo';
// const bar = 'bar';
// console.log(foo + bar);
// `.trim();
// export default class SyntaxHighlighterMain extends React.Component {
//   componentDidMount() {
//     // You can call the Prism.js API here
//     // Use setTimeout to push onto callback queue so it runs after the DOM is updated
//     setTimeout(() => Prism.highlightAll(), 0);
//   }
//   render() {
//     return (
//       <pre>
//         <code className="language-js">{code}</code>
//       </pre>
//     );
//   }
// }
