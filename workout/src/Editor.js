import { useContext, useState } from "react";
import { BlogContext } from "./BlogProvider";
import { useNavigate } from "react-router";
import CountDownInput from "./CountdownInput";
import TabataInput from "./TabataInput";
import XyInput from "./XyInput";


const Editor = () => {
  const navigate = useNavigate();


  // Have to keep 'savePost'. if not, doesn't find the 'type'. Why?
  const { selectedPost, savePost } = useContext(BlogContext);

  const [type, setType] = useState(selectedPost?.type ?? "");

  return (
    <>
      <div className="displayResult"></div>
      <div class="counter-container">
        <div className="panel">
          <div className="titleForm">
            <div class="btn-close">
              <button
                className="button"
                onClick={() => {
                  navigate(-1);
                }}>
                Close
              </button>
            </div>
            {type === "" && (
              <>
                <div className="titleForm">
                  Add a Workout xxx{selectedPost?.type}
                </div>
                <button
                  className="button-nav"
                  onClick={() => {
                    setType("countdown");
                  }}>
                  Countdown
                </button>
                <button
                  className="button-nav"
                  onClick={() => {
                    setType("xy");
                  }}>
                  XY
                </button>
                <button
                  className="button-nav"
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
        </div>
      </div>
    </>
  );
};

export default Editor;
