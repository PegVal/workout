import React from "react";
import { useState, useEffect } from "react";
import { BlogContext } from "./BlogProvider";
import { Link } from "react-router-dom";

const Tabata = () => {
  const value = React.useContext(BlogContext);
  const totalTimer = value.postCount;

  // ----- const pour le timer en cours ---------------------
  //const [btnId, setBtnId] = useState(0);
  const [isActive, setIsActive] = useState(false); // ------------------- OK
  const [isFinish, setIsFinish] = useState(false); // ------------------- OK


  // --------------------- BTN id ----------------------------------------
/*   const btnStartQueue = value.posts.map((what, i) => {
    const repeat = what.repeat;
    const pause = what.pause !== "" ? what.pause : 0;
    const title = what.title;
    const btnId = i;

    function initBtn() {
      setIsActive(false);
      setIsFinish(false);
      setBtnId(btnId + 1);
      setRepeat(repeat + 1);
      setPause(pause);
      setValRepeat(repeat + 1);
      setValPause(pause);
      setTitle(title);
    }

    return (
      <div className="buttonContent">
        {btnId > 0 && (
          <>
            <button
              className="button-elem"
              onClick={initBtn}>
              ({btnId + 1}/{totalTimer}) {title}
            </button>
          </>
        )}
      </div>
    );
  }); */
  // --------------------- end btnStartQueue ----------------------------------------

  // ------------------------##################### durée total #######################-------------------------
  const extractTimerValues = value.posts.map((what) => {
    const total = (what.duration + what.pause) * (what.repeat + 1);
    return total;
  });

  const totalTiming = extractTimerValues.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  // --------------------------------------------------------------------------------------------

  const [totalAllTimers, setTotalAllTimers] = useState(totalTiming); // durée de l'ensemble du workout
  const [msgAction, setMsgAction] = useState("ready?"); // message de fin
  const [numTimer, setNumTimer] = useState(0); // la ref du timer pour le countdown
  const [actualTimer, setActualTimer] = useState(totalTimer); // la ref du timer à appeler
  const [totalAllSeconds, setTotalAllSeconds] = useState(extractTimerValues[0]); // durée pour un timer en particulier
  const [initTotalAllSeconds, setInitTotalAllSeconds] = useState(totalAllSeconds);

  const [title, setTitle] = useState(value.posts[0].title!== "" ? value.posts[0].title : "No title");

  const [valRepeat, setValRepeat] = useState(value.posts[0].repeat + 1); // valeur initiale


  const [repeat, setRepeat] = useState(valRepeat); // valeur à décrémenter

  const [valPause, setValPause] = useState(value.posts[0].pause!== "" ? value.posts[0].pause : 0); // valeur initiale
  const [pause, setPause] = useState(valPause); // valeur à décrémenter

  const [valDuration, setValDuration] = useState(value.posts[0].duration);// valeur initiale
  const [duration, setDuration] = useState(valDuration);// valeur à décrémenter

  const [valDurationAndPause, setValDurationAndPause] = useState(value.posts[0].duration + value.posts[0].pause); // valeur intiale
  const [durationAndPause, setDurationAndPause] = useState(valDurationAndPause); // valeur à décrementer

  const [remaining, setRemaining] = useState(totalTiming);
  const [workout, setWorkout] = useState(totalTimer);


  function toggle() {
    setIsActive(!isActive);
  }

  // --------------------------- use Effect pour l'animation du timer -----------------------------------
  


useEffect(() => {
    const interval = setInterval(() => {
      
      if (totalAllTimers > 0 && isActive) {
        // tant que le timer général n'est pas à zéro
        setTotalAllTimers((totalAllTimers) => totalAllTimers - 1); // décrement sa valeur

        // ---------------------------- dans un des timer
        if (totalAllSeconds > 0) {
          setTotalAllSeconds((duration) => duration - 1); // decrement la valeur du timer en cours

          if (durationAndPause > 1) { 
            setDurationAndPause((durationAndPause) => durationAndPause - 1); // decrement duration + pause
            if (durationAndPause > pause +1) {
              setMsgAction((msgAction) => "work");
            }else{
              setMsgAction((msgAction) => "pause");
              setPause((pause) => pause - 1);
            }
          
          }if (durationAndPause === 1) {
            setRepeat(repeat - 1);
            setDurationAndPause(value.posts[numTimer].duration + value.posts[numTimer].pause);
            setMsgAction((msgAction) => `work:~\n new round`);
            setPause(value.posts[numTimer].pause !== "" ? value.posts[0].pause : 0);
          }

        } else {
          // ------------------------- quand on change de timer
          setMsgAction((msgAction) => `work: next timer`);
          setTitle(value.posts[numTimer + 1].title);
          setNumTimer((numTimer) => numTimer + 1); // decrement ref to timer
          setActualTimer(actualTimer - 1);
          setTotalAllSeconds(extractTimerValues[numTimer + 1] - 1); 
          setInitTotalAllSeconds(extractTimerValues[numTimer + 1]); 
          setDurationAndPause(value.posts[numTimer + 1].duration + value.posts[numTimer + 1].pause); 
          setPause(value.posts[numTimer + 1].pause !== "" ? value.posts[0].pause : 0);
          setValPause(value.posts[numTimer + 1].pause !== "" ? value.posts[0].pause : 0);
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
            <div className="info">
              <p className="titleInfo">times</p>
              <p className="numInfo">
                {repeat}/{valRepeat}
              </p>
              <p className="numInfoSec">num</p>
            </div>
            <div className="info">
              <p className="titleInfo">Pause</p>
              <p className="numInfo">
                {pause}/{valPause}
              </p>
              <p className="numInfoSec">Seconds</p>
            </div>
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
