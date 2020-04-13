import React, { useState, useCallback } from "react";
import { jscode, jsxcode, csscode, optimalHMImplementation } from "./codeContainer";
import SyntaxHighlighterMain from "./SyntaxHighlighterMain";
import VideoContainer from "./VideoContainer";
import { Link } from "react-router-dom";
import {
  Bubble_sort_rnd_20_gif,
  Bubble_sort_nr_20_gif,
  Bubble_sort_rev_20_gif,
  Bubble_sort_fu_20_gif,
  Temp_static_file_img,
  Big_o_TC_png,
} from "../../assets";

const ExampleHighlighter = () => {
  const width = "300";
  const height = "150";

  const [showOptimalHMBtnState, setShowHMBtnState] = useState(false);
  const [gif, setGif] = useState(Temp_static_file_img);

  const handleGifSrcReplace = (value) => {
    const gif = document.getElementById(value.id);
    switch (value.id) {
      case "gif1":
        gif.src = Bubble_sort_fu_20_gif;
        break;
      case "gif2":
        gif.src = Bubble_sort_rnd_20_gif;
        break;
      case "gif3":
        gif.src = Bubble_sort_nr_20_gif;
        break;
      case "gif4":
        gif.src = Bubble_sort_rev_20_gif;
        break;
      default:
        break;
    }

    console.log(gif);
  };
  //memoized callBACK
  const handleClickOptimalHM = useCallback(() => {
    setShowHMBtnState(!showOptimalHMBtnState);
  }, [showOptimalHMBtnState]);
  // TODO: OPTIMIZE RE-RENDERING OF OTHER SyntaxHighlighterMain WHEN STATE CHANGES ONLY "showOptimalHMBtnState"
  return (
    <>
      <div className="nav-buttons-flex-container" style={center_children}>
        <Link to="/table">
          <button className="buttonBlue">Table example</button>
        </Link>

        <Link to="/featured">
          <button className="buttonBlue">Animated data example</button>
        </Link>

        <Link to="/expenses">
          <button className="buttonBlue">Expenses calculator example</button>
        </Link>

        <Link to="/drag">
          <button className="buttonBlue">Draggable/droppable</button>
        </Link>
      </div>
      <div className="display-flex" style={center_children}>
        <div className="two-columns-row">
          <h1>js</h1>
          <SyntaxHighlighterMain {...{ code: jscode, language: "js" }} />
        </div>
        <VideoContainer {...{ width: width, height: height, src: "https://www.youtube.com/embed/0eJEUOk6eCU" }} />
      </div>
      {/* Example without right div container */}
      <div className="display-flex" style={center_children}>
        <div className="two-columns-row">
          <h1>css</h1>
          <SyntaxHighlighterMain {...{ code: csscode, language: "css" }} />
        </div>
        <div className="two-columns-row"></div>
      </div>
      <div className="display-flex" style={center_children}>
        <div className="two-columns-row">
          <h1>jsx</h1>
          <SyntaxHighlighterMain {...{ code: jsxcode, language: "jsx" }} />
        </div>
        <div className="two-columns-row right-div-highlight" style={margin_top_left_col2}>
          <h2>dont even need text</h2>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <button className="buttonBlue" onClick={handleClickOptimalHM}>
          Show Optimal Hash Map code
        </button>
      </div>
      {showOptimalHMBtnState && (
        <div className="display-flex" style={center_children}>
          <div className="two-columns-row">
            <h1>Optimal Hash Map implementation</h1>
            <SyntaxHighlighterMain {...{ code: optimalHMImplementation, language: "js" }} />
          </div>
        </div>
      )}
      <div className="display-flex" style={center_children}>
        <div className="two-columns-row">
          <h2>testing img linking(by default react knows they are in pub folder)</h2>
          <img src={Big_o_TC_png} className="img-aspect-ratio-kept" alt="image" />
        </div>
        <div className="two-columns-row">
          <button onClick={(e) => handleGifSrcReplace(e.target)}>
            <img id="gif1" className="img-aspect-ratio-kept" src={gif} />
          </button>
          <button onClick={(e) => handleGifSrcReplace(e.target)}>
            <img id="gif2" className="img-aspect-ratio-kept" src={gif} />
          </button>
          <button onClick={(e) => handleGifSrcReplace(e.target)}>
            <img id="gif3" className="img-aspect-ratio-kept" src={gif} />
          </button>
          <button onClick={(e) => handleGifSrcReplace(e.target)}>
            <img id="gif4" className="img-aspect-ratio-kept" src={gif} />
          </button>
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
/*conditional rendering info :https://reactjs.org/docs/conditional-rendering.html

---passing  params to event handlers -->
---hoooks -->https://stackoverflow.com/questions/55001372/correct-way-to-create-event-handlers-using-hooks-in-react
---classes -->https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method

--preventing all components to rereneder on state change:https://medium.com/@guptagaruda/react-hooks-understanding-component-re-renders-9708ddee9928#204b
--re renderign FAQ :https://stackoverflow.com/questions/55373878/what-are-the-differences-when-re-rendering-after-state-was-set-with-hooks-compar

useCallack() mostly to watch props change in chuld components to not re render them all if their state stayed the same
useMemo() on expensive compoenets to render ....dont overuse 

throttle,debounce hooks https://stackoverflow.com/questions/54666401/how-to-use-throttle-or-debounce-with-react-hook
*/
