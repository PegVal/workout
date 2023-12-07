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

const CountdownInput = () => {
  const navigate = useNavigate();
  const { selectedPost, savePost } = useContext(BlogContext);
  const [title, setTitle] = useState(selectedPost?.title ?? "");
  const [duration, setDuration] = useState(selectedPost?.duration ?? "");
  const repeat = 0;
  const pause= 0;
  //const [repeat, setNumRepeat] = useState(selectedPost?.repeat ?? "");
  //const [pause, setPause] = useState(selectedPost?.pause ?? "");

  const type = "countdown";

  return (
    <>
      <div className="titleForm">Change your {type} </div>
      <input
        type="hidden"
        value={type}
      />
      <br />
      <br />
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
      {/* Repetition:
      <TimerDurationInput
        duration={repeat}
        onSetDuration={setNumRepeat}>
        Number of timer repeats
      </TimerDurationInput> */}
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
                  type,
                });
                navigate("/");
              }}>
              Save
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default CountdownInput;
