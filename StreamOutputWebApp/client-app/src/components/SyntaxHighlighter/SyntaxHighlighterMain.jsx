import React, { useEffect } from "react";
import "prismjs";
import "../../prism.css";
//prismjs import is only thing needed for now-->works with Regex in background

const code = `const dictionary = {the: 22038615, be: 12545825, and: 10741073, 
  of: 10343885, a: 10144200, in: 6996437, to: 6332195 /* ... */};

function etWordFrequency(dictionary, word) {
  return dictionary[word];
}

console.log(getWordFrequency(dictionary, 'the'));
console.log(getWordFrequency(dictionary, 'in'));
`;
const csscode = `
.archive {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  grid-gap: 32px;
  grid-auto-flow: dense;
}

/* Extra-wide grid-posts */
.article:nth-child(31n + 1) {
  grid-column: 1 / -1;
}
.article:nth-child(16n + 2) {
  grid-column: -3 / -1;
}
.article:nth-child(16n + 10) {
  grid-column: 1 / -2;
}

/* Single column display for phones */
@media (max-width: 459px) {
  .archive {
    display: flex;
    flex-direction: column;
  }
}
`;

const SyntaxHighlighterMain = () => {
  //   useEffect(() => {
  //     // Use setTimeout to push onto callback queue so it runs after the DOM is updated ---NOTE : works without hook too
  //     // setTimeout(() => Prism.highlightAll(), 0);
  //   }, []);
  return (
    <>
      <div className="gatsby-highlight">
        <pre>
          <code className="language-js">{code}</code>
        </pre>
      </div>
      <h1>css</h1>
      <div className="gatsby-highlight">
        <pre>
          <code className="language-css">{csscode}</code>
        </pre>
      </div>
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
