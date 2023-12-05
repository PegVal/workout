import React from "react";
import { useState, useEffect } from "react";
import { BlogContext } from "./BlogProvider";
import { Link } from "react-router-dom";

//const Tabata = ({ duration }) => {
const Tabata = () => {
  const duration = 0;
  const value = React.useContext(BlogContext);
  const btnNum = value.postCount;

  const btnTimer = value.posts.map((what, i) => {
    const duration = what.duration;
    const repeat = what.repeat;
    const pause = what.pause !== "" ? what.pause : 0;
    const title = what.title;

    const timerTotal = (duration + pause) * (repeat + 1);

    const btnId = i;

    function initBtn() {
      setIsActive(false);
      setIsFinish(false);
      setpauseActif(false);
      setBtnId(btnId + 1);

      setSeconds(duration);
      setRepeat(repeat + 1);
      setPause(pause);
      setTotal(timerTotal);

      setRemaining(timerTotal);
      setValInitial(duration);
      setValRepeat(repeat + 1);
      setValPause(pause);

      setTitle(title);
    }

    return (
      <div className="buttonContent">
        {btnId === 0 && (
          <>
            <button
              className="button-big"
              onClick={initBtn}>
              Load first timer
            </button>
          </>
        )}
        {btnId > 0 && (
          <>
            <button
              className="button-elem"
              onClick={initBtn}>
              ({btnId + 1}/{btnNum}) {title}
            </button>
          </>
        )}
      </div>
    );
  });

  const valFinal = duration;
  const [btnId, setBtnId] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [total, setTotal] = useState(remaining + 1);
  const [repeat, setRepeat] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [pause, setPause] = useState(0);
  const [title, setTitle] = useState("nothing yet");
  const [valRepeat, setValRepeat] = useState(0);
  const [valPause, setValPause] = useState(0);
  const [valInitial, setValInitial] = useState(0);

  const [isActive, setIsActive] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [pauseActif, setpauseActif] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(valInitial);
    setIsActive(false);
    setIsFinish(false);
    setRepeat(valRepeat);
    setPause(valPause);
    setpauseActif(false);
    setTotal(remaining);
  }

  useEffect(() => {
    if (repeat > 0) {
      let interval = setInterval(() => {
        // with pause
        if (pause === 0) {
          if (seconds <= 1) {
            setSeconds((seconds) => valInitial - 1);
            setTotal(total - 1);
            if (seconds === 1) {
              setRepeat((repeat) => repeat - 1);
            }
          }
        }
        // without pause
        if (pause > 0 && pauseActif !== false) {
          setPause(pause - 1);
          setTotal(total - 1);

          if (pause === 1) {
            setSeconds((seconds) => valInitial);
            setPause((pause) => valPause);
            setpauseActif(false);
            setRepeat((repeat) => repeat - 1);
          }
        } else if (isActive && !pauseActif && pause !== valPause) {
          setpauseActif(true);
          clearInterval(interval);
        }

        if (isActive && seconds !== valFinal) {
          setSeconds(seconds - 1);
          setTotal(total - 1);
          if (seconds === valFinal + 1) {
            setpauseActif(true);
          }
        } else if (!isActive && pauseActif && seconds !== valInitial) {
          setpauseActif(false);
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    } else {
      // at the end, btn must disappear
      setIsFinish(true);
      setRepeat(0);
      setSeconds(0);
      setPause(0);
      setTotal(0);
      setValRepeat(0);
      setRemaining(0);
    }
  }, [
    isActive,
    seconds,
    repeat,
    valFinal,
    valInitial,
    pause,
    pauseActif,
    valPause,
    total,
    remaining,
  ]);

  return (
    <>
      <div className="counter-content">
        <div className="counterBoxContent">
          <div className="info">
            <h3>
              {title} ({btnId}/{btnNum})
            </h3>
            <h4>Total timing: {remaining} seconds</h4>
          </div>
          <div className="counterBox">
            <div className="timerTitle">Timer</div>
            <div className="timerDisplaySecond">{seconds} </div>
            <div className="timerSecond">seconds</div>
          </div>
          <div className="infoBoxContent">
            <div className="info">
              <p className="titleInfo">n° times</p>
              <p className="numInfo">
                {repeat}/{valRepeat}
              </p>
              <p className="numInfoSec">Times</p>
            </div>
            <div className="info">
              <p className="titleInfo">Pause</p>
              <p className="numInfo">{pause}</p>
              <p className="numInfoSec">Seconds</p>
            </div>
            <div className="info">
              <p className="titleInfo">Remaining</p>
              <p className="numInfo">
                {total}/{remaining}
              </p>
              <p className="numInfoSec">Seconds</p>
            </div>
          </div>
          <div className="buttonContent">
            {!isFinish && (
              <>
                <button
                  className={`button-nav button-nav-${
                    isActive ? "active" : "inactive"
                  }`}
                  onClick={toggle}>
                  {isActive ? "Pause" : "Start"}
                </button>
              </>
            )}
            {isActive && !isFinish && (
              <>
                <button
                  className="button"
                  onClick={reset}>
                  Reset
                </button>
              </>
            )}
            <div>{btnTimer[btnId]}</div>
          </div>
        </div>

        <div class="timerMenu">
          <Link to="/">
            <button className="button-nav">Back to config</button>
          </Link>
          {btnTimer}
        </div>
      </div>
    </>
  );
};

export default Tabata;
