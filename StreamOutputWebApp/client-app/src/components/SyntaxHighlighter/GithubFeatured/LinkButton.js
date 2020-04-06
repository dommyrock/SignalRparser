import React from "react";

const LinkButton = props => {
  return (
    <a href={props.link} target="_blank" className="action" data-v-b770a5e2 data-v-5aa19bde>
      <div className="action__icon" data-v-b770a5e2>
        <span data-v-b770a5e2></span>
      </div>
      <div className="action__content" data-v-b770a5e2>
        <h4 className="action__title" data-v-b770a5e2>
          {props.title}
        </h4>
        <p data-v-b770a5e2>{props.description}</p>
      </div>
    </a>
  );
};

export default LinkButton;
