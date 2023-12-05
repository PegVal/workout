import { useContext, useState } from "react";
import { BlogContext } from "./BlogProvider";
import { useNavigate } from "react-router";

function TimerDurationInput({ children, duration, onSetDuration }) {
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
}

const Editor = () => {
  const navigate = useNavigate();
  const { selectedPost, savePost } = useContext(BlogContext);
  const [title, setTitle] = useState(selectedPost?.title ?? "");
  const [duration, setDuration] = useState(selectedPost?.duration ?? "");
  const [repeat, setNumRepeat] = useState(selectedPost?.repeat ?? "");
  const [pause, setPause] = useState(selectedPost?.pause ?? "");

  return (
    <>
      <div className="displayResult"></div>
      <div class="counter-container">
        <div className="panel">
          <div className="titleForm">Add a Workout </div>
          Name of the workout:
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
          </TimerDurationInput>
          <br />
          <br />
          <div className="inputPanelValidate">
            {duration > 0 && (
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
            )}


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
