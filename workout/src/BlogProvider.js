import React from "react";
import { makeId } from "./util";
import { useState } from "react";

export const BlogContext = React.createContext({});

const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const closeEditor = () => {
    setSelectedPost(null);
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        editorOpen: !!selectedPost,
        selectedPost,
        closeEditor,
        postCount: posts.length,

        deletePost: ({ id }) => setPosts(posts.filter((x) => x.id !== id)),
        openEditor: () => setSelectedPost({}),

        openPost: ({ id }) => {
          const p = posts.find((p) => p.id === id);
          setSelectedPost(p);
        },

        savePost: ({ id, title, duration, repeat, pause, type }) => { // ---------------------
          const updatedPost = {
            id,
            title,
            duration,
            repeat,
            pause,
            type, // ----------------------
          };

          if (id) {
            const updatedPosts = posts.map((p) =>
              p.id === id ? updatedPost : p
            );
            setPosts(updatedPosts);
          } else {
            // create a new post
            setPosts([
              ...posts,
              {
                ...updatedPost,
                id: makeId(),
              },
            ]);
          }

          closeEditor();
        },
      }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
