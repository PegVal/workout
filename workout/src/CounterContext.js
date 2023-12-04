import { useContext } from "react";
import { BlogContext } from "./BlogProvider";
import { Link } from "react-router-dom";

const Blog = () => {
  const { posts, openPost, openEditor, deletePost, editorOpen } =
    useContext(BlogContext);

  return (
    <>
      <div className="displayResult"></div>
      <div class="counter-container">
        <div className="panel">
          <div className="header">
            <div className="text">List of Workout </div>

            <Link to="/add">
              <button
                className="button-counter"
                onClick={() => openEditor()}>
                Add a timer
              </button>
            </Link>
          </div>
          {posts.map((p) => (
            <div key={p.id}>
              <div
                style={{
                  backgroundColor: "#f2f2f2",
                  padding: 20,
                  marginBottom: 20,
                }}>
                <div style={{ display: "flex" }}>
                  <div
                    className="title-workout"
                    style={{ flex: 1 }}>
                    {p.title}
                  </div>
                  <Link to="/add">
                    <button
                      onClick={() => openPost({ id: p.id })}
                      className="button-counter">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      deletePost({ id: p.id });
                    }}
                    className="button-counter">
                    Delete
                  </button>
                </div>

                <div>
                  duration: {p.duration}s / pause: {p.pause}s / n° of times:{" "}
                  {p.repeat + 1}
                </div>
              </div>
            </div>
          ))}
          {posts[0] && (
            <div className="footer-counter">
              <Link to="/tabata">
                <button className="button-big">Start Workout</button>
              </Link>
            </div>
          )}
        </div>
        {editorOpen}
      </div>
    </>
  );
};

export default Blog;
