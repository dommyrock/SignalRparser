import React from "react";

const margin_top_left_col2 = {
  marginTop: "45px",
  marginLeft: "10px",
  paddingLeft: "50px",
};

const VideoContainer = (props) => {
  return (
    <div className="two-columns-column right-div-highlight" style={margin_top_left_col2}>
      <h1>title placeholders</h1>
      <div style={{ position: "relative" }}>
        <iframe
          style={{ margin: "10px" }}
          width={props.width}
          height={props.height}
          src={props.src}
          frameBorder="0"
          allowFullScreen=""
        ></iframe>
      </div>
    </div>
  );
};

export default VideoContainer;

/*NOTE :Sometimes the content of the iframe has absolutely positioned elements inside that due to css positioning might 
take up the whole screen if the iframe is not positioned relative to some container.

So it seems in this case this is the problem.

So try to wrap the iframe in a container and set its position:relative to fix it.*/
