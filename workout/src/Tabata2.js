import React from "react";
import { useState, useEffect } from "react";
import { BlogContext } from "./BlogProvider";
import { Link } from "react-router-dom";

const Tabata = () => {
  const value = React.useContext(BlogContext);
  const totalTimer = value.postCount;
  const [isActive, setIsActive] = useState(false);
  const [isFinish, setIsFinish] = useState(false);


  const [type, setType] = useState(value.posts[0].type);

  const extractTimerValues = value.posts.map((what) => {
    const total = (what.duration + what.pause) * (what.repeat + 1);
    return total;
  });

  const totalTiming = extractTimerValues.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const [totalAllTimers, setTotalAllTimers] = useState(totalTiming); // durée de l'ensemble du workout
  const [msgAction, setMsgAction] = useState("ready?"); // message de fin
  const [numTimer, setNumTimer] = useState(0); // la ref du timer pour le countdown
  const [actualTimer, setActualTimer] = useState(totalTimer); // la ref du timer à appeler
  const [totalAllSeconds, setTotalAllSeconds] = useState(extractTimerValues[0]); // durée pour un timer en particulier
  const [initTotalAllSeconds, setInitTotalAllSeconds] =
    useState(totalAllSeconds);
  const [title, setTitle] = useState(
    value.posts[0].title !== "" ? value.posts[0].title : "No title"
  );
  const [valRepeat, setValRepeat] = useState(value.posts[0].repeat + 1); // valeur initiale
  const [repeat, setRepeat] = useState(valRepeat); // valeur à décrémenter
  const [valPause, setValPause] = useState(
    value.posts[0].pause !== "" ? value.posts[0].pause : 0
  ); // valeur initiale
  const [pause, setPause] = useState(valPause); // valeur à décrémenter
  const [remaining, setRemaining] = useState(totalTiming);
  const [workout, setWorkout] = useState(totalTimer);

  const valDuration = useState(value.posts[0].duration); // valeur initiale
  const duration = useState(valDuration); // valeur à décrémenter
  const valDurationAndPause = useState(value.posts[0].duration + value.posts[0].pause); // valeur intiale */

  const [durationAndPause, setDurationAndPause] = useState(valDurationAndPause); // valeur à décrementer

  function toggle() {
    setIsActive(!isActive);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (totalAllTimers > 0 && isActive) {
        // tant que le timer général n'est pas à zéro: décrement sa valeur
        setTotalAllTimers((totalAllTimers) => totalAllTimers - 1);
        setMsgAction((msgAction) => "work");
        // -- dans un des timer: decrement la valeur du timer en cours
        if (totalAllSeconds > 0) {
          setTotalAllSeconds((duration) => duration - 1);

          // decrement duration + pause
          if (durationAndPause > 1) {
            setDurationAndPause((durationAndPause) => durationAndPause - 1);
            if (durationAndPause > pause + 1) {
              setMsgAction((msgAction) => "work");
            } else {
              setMsgAction((msgAction) => "pause");
              setPause((pause) => pause - 1);
            }
          }
          if (durationAndPause === 1) {
            setRepeat(repeat - 1);
            setDurationAndPause(
              value.posts[numTimer].duration + value.posts[numTimer].pause
            );
            setMsgAction((msgAction) => `work:~\n new round`);
            setPause(
              value.posts[numTimer].pause !== "" ? value.posts[0].pause : 0
            );
          }
        } else {
          // --- quand on change de timer
          setType(value.posts[numTimer + 1].type);
          setMsgAction((msgAction) => `work: next timer`);
          setTitle(value.posts[numTimer + 1].title);
          setNumTimer((numTimer) => numTimer + 1); // decrement ref to timer
          setActualTimer(actualTimer - 1);
          setTotalAllSeconds(extractTimerValues[numTimer + 1] - 1);
          setInitTotalAllSeconds(extractTimerValues[numTimer + 1]);
          setDurationAndPause(
            value.posts[numTimer + 1].duration + value.posts[numTimer + 1].pause
          );
          setPause(
            value.posts[numTimer + 1].pause !== "" ? value.posts[0].pause : 0
          );
          setValPause(
            value.posts[numTimer + 1].pause !== "" ? value.posts[0].pause : 0
          );
          setValRepeat(value.posts[numTimer + 1].repeat + 1);
          setRepeat(value.posts[numTimer + 1].repeat + 1);
        }
      } else if (totalAllTimers === 0) {
        // end
        setMsgAction((msgAction) => "workout completed!");
        setInitTotalAllSeconds(0);
        setActualTimer(0);
        setIsActive(false);
        setIsFinish(true);
        setDurationAndPause(0);
        setPause(0);
        setValPause(0);
        setValRepeat(0);
        setRepeat(0);
        setTitle("");
        setRemaining(0);
        setWorkout(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [
    isActive,
    actualTimer,
    extractTimerValues,
    numTimer,
    totalTimer,
    totalAllTimers,
    totalAllSeconds,
    pause,
    repeat,
    duration,
    valDurationAndPause,
    durationAndPause,
    value.posts,
  ]);

  return (
    <>
      <div className="counter-content">
        <div className="counterBoxContent">
          <div className="info">
            <h3> {title} </h3>
          </div>
          <div className="counterBox">
            <div className="timerDisplaySecond">
              {totalAllSeconds}/{initTotalAllSeconds}
            </div>
            <div class="infoCounter">{msgAction}</div>
          </div>
          <div className="infoBoxContent">

            {(type === "xy" || type === "tabata") && (
              <>
                <div className="info">
                  <p className="titleInfo">times</p>
                  <p className="numInfo">
                    {repeat}/{valRepeat}
                  </p>
                  <p className="numInfoSec">num</p>
                </div>
              </>
            )}

           

            {type === "tabata" && (
              <>
                <div className="info">
                  <p className="titleInfo">Pause</p>
                  <p className="numInfo">
                    {pause}/{valPause}
                  </p>
                  <p className="numInfoSec">Seconds</p>
                </div>
              </>
            )}

            <div className="info">
              <p className="titleInfo">Total</p>
              <p className="numInfo">
                {totalAllTimers}/{remaining}
              </p>
              <p className="numInfoSec">Seconds</p>
            </div>
            <div className="info">
              <p className="titleInfo">workout</p>
              <p className="numInfo">
                {actualTimer}/{workout}
              </p>
              <p className="numInfoSec">num</p>
            </div>
          </div>
          <div className="buttonContent">
            <div>
              <Link to="/">
                <button className="button-elem">Back to config</button>
              </Link>
            </div>
            {!isFinish && (
              <>
                <button
                  className={`button-big button-big-${
                    isActive ? "active" : "inactive"
                  }`}
                  onClick={toggle}>
                  {isActive ? "Pause" : "Start"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};


export default Tabata;
