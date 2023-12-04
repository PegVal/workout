import React from "react";
import { BlogContext } from "./BlogProvider";

const DisplayDuration = () => {
  const value = React.useContext(BlogContext);

  const extractTimerValues = value.posts.map((what) => {
    const duration = what.duration;
    const repeat = what.repeat;
    const pause = what.pause;
    const total = (duration + pause) * (repeat + 1);
    return total;
  });

  const totalTiming = extractTimerValues.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return (
    <>
      <div class="container-titre-app">
        <div>
          <div className="csci-e39">CSCI E-39</div>
          <h2>WORKOUT</h2>
        </div>

        <div class="center-align">
          <div className="resultBox">
            <div className="resultNum">{value.postCount}</div>
            <div className="resultTxt">Timer(s) in the workout</div>
          </div>
          <div className="resultBox">
            <div className="resultNum">{totalTiming}</div>
            <div className="resultTxt">Total seconds length</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayDuration;
