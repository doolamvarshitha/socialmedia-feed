import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Feed from "./components/Feed";
import CreatePost from "./components/CreatePost";
import MyPosts from "./components/MyPosts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Feed />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/my-posts" element={<MyPosts userId="USER_ID" />} />
      </Routes>
    </Router>
  );
}

export default App;
