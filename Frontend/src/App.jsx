import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Feed from "./pages/Feed"
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="feed" element={<Feed />} />
        <Route path="/feed/:id" element={<Feed />} /> {/* For update with ID */}
        </Routes>
    </BrowserRouter>
  );
};

export default App;
