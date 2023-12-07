import { useContext, useState } from "react";
import { BlogContext } from "./BlogProvider";
import { useNavigate } from "react-router";

import CountDownInput from "./CountdownInput";
import TabataInput from "./TabataInput";
import XyInput from "./XyInput";
//import CountDownInput from "./CountDownInput";

/* function TimerDurationInput({ children, duration, onSetDuration }) {
  return (
    <div>
      <input
        type="text"
        placeholder={children}
        value={duration}
        onChange={(e) => onSetDuration(Number(e.target.value))}
      />
    </div>
  );
} */

const Editor = () => {
  const navigate = useNavigate();
  const { selectedPost, savePost } = useContext(BlogContext);

 /*  const [title, setTitle] = useState(selectedPost?.title ?? "");
  const [duration, setDuration] = useState(selectedPost?.duration ?? "");
  const [repeat, setNumRepeat] = useState(selectedPost?.repeat ?? "");
  const [pause, setPause] = useState(selectedPost?.pause ?? ""); */

  const [type, setType] = useState(selectedPost?.type ?? "");

  return (
    <>
      <div className="displayResult"></div>
      <div class="counter-container">
        <div className="panel">
          <div className="titleForm">
            {type === "" && (
              <>
                <div className="titleForm">Add a Workout </div>
                <button
                  className="button"
                  onClick={() => {
                    setType("countdown");
                  }}>
                  Countdown
                </button>
                <button
                  className="button"
                  onClick={() => {
                    setType("xy");
                  }}>
                  XY
                </button>
                <button
                  className="button"
                  onClick={() => {
                    setType("tabata");
                  }}>
                  Tabata
                </button>
              </>
            )}
          </div>
          {type === "tabata" && (
            <>
              <TabataInput />
            </>
          )}
          {type === "xy" && (
            <>
              <XyInput />
            </>
          )}

          {type === "countdown" && (
            <>
              <CountDownInput />
            </>
          )}
          {/* Name of the workout:
              <input
                placeholder="title"
                className="input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              Duration :
              <TimerDurationInput
                duration={duration}
                onSetDuration={setDuration}>
                Duration (in seconds)
              </TimerDurationInput>
         
        
              Repetition:
              <TimerDurationInput
                duration={repeat}
                onSetDuration={setNumRepeat}>
                Number of timer repeats
              </TimerDurationInput>
        

         
              Pause :
              <TimerDurationInput
                duration={pause}
                onSetDuration={setPause}>
                pause (in seconds)
              </TimerDurationInput> */}
          <br />
          <br />
          <div className="inputPanelValidate">
            {/* {duration > 0 && repeat > 0 && pause > 0 && (
              <>
                <button
                  className="button"
                  onClick={() => {
                    savePost({
                      id: selectedPost?.id,
                      title,
                      duration,
                      repeat,
                      pause,
                    });
                    navigate("/");
                  }}>
                  Save
                </button>
              </>
            )} */}

            <button
              className="button"
              onClick={() => {
                navigate(-1);
              }}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
