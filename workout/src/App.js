import "./App.css";

import BlogProvider from "./BlogProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Blog from "./CounterContext";
import DisplayDuration from "./DisplayDuration";
import Tabata from "./Tabata2";
import Editor from "./Editor";
import Documentation from "./DocumentationView";

const Inner = () => {
  const commonRoutes = (
    <>
      <Route
        path="/"
        element={[<DisplayDuration />, <Blog />]}
      />
      <Route
        path="/tabata"
        element={[<DisplayDuration />, <Tabata />]}
      />
      <Route
        path="/document"
        element={<Documentation />}
      />
      <Route
        path="/add"
        element={[<DisplayDuration />, <Editor />]}
      />
    </>
  );
  return <Routes>{commonRoutes}</Routes>;
};

const App = () => {
  return (
    <BlogProvider>
      <BrowserRouter>
        <Inner />
      </BrowserRouter>
    </BlogProvider>
  );
};

export default App;
