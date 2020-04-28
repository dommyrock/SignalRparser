//NOTE : more data "entities" i have the longer intersection lasts ...(less delay  between 2 rows)
import React from "react";
import LinkButton from "./LinkButton";
import "../../../githubHackatlon.css";

const GithubFeaturedList = () => {
  return (
    <>
      <div id="hackathon-div" className="featured-section" data-v-5aa19bde data-v-19509d32 data-v-2974ba77>
        <div className="featured" data-v-5aa19bde>
          <div className="featured__list featured__list--animated" data-v-5aa19bde>
            {data.map((item) => {
              return <LinkButton {...{ link: item.link, title: item, description: item.description }} />;
            })}
          </div>
          <div className="featured__list featured__list--alt featured__list--animated" data-v-5aa19bde>
            {data.map((item) => {
              return <LinkButton {...{ link: item.link, title: item, description: item.description }} />;
            })}
          </div>
        </div>
        {/* <div className="square" data-v-dfc99e4e data-v-5aa19bde>
          <div className="grid" data-v-dfc99e4e></div>
        </div> */}
      </div>
      {/* 2x just for testing  */}
      <div id="hackathon-div" className="featured-section" data-v-5aa19bde data-v-19509d32 data-v-2974ba77>
        <div className="featured" data-v-5aa19bde>
          <div className="featured__list featured__list--animated" data-v-5aa19bde>
            {data.map((item) => {
              return <LinkButton {...{ link: item.link, title: item, description: item.description }} />;
            })}
          </div>
          <div className="featured__list featured__list--alt featured__list--animated" data-v-5aa19bde>
            {data.map((item) => {
              return <LinkButton {...{ link: item.link, title: item, description: item.description }} />;
            })}
          </div>
        </div>
        <div className="square" data-v-dfc99e4e data-v-5aa19bde>
          <div className="grid" data-v-dfc99e4e></div>
        </div>
      </div>
      {/* //Load site into iframe , exampe, */}
      <h3>Http archive --Last 2 Years , web performance</h3>
      <iframe
        height="700px"
        width="100%"
        src="https://httparchive.org/reports/state-of-the-web?start=2018_04_01&end=latest&view=list"
        name="iframe_a"
      ></iframe>

      <p>
        <a href="https://www.w3schools.com" target="iframe_a">
          Load W3Schools.com into Iframe
        </a>
      </p>
    </>
  );
};

export default GithubFeaturedList;
const data = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
];
