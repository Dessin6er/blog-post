import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserAuthContext from "./userAuthContext";
import { useState } from "react";
import Header from "./components/Header";
import CreatePost from "./pages/CreatePost";

import PostPage from "./pages/PostPage";

function App() {
  const userInfoState = useState({});
  const [logedIn, setLogedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  return (
    <div className=" w-[80%] md:w-[70%] lg:w-[65%] mx-auto min-h-[100vh] ">
      <UserAuthContext.Provider value={userInfoState}>
        <Header
          logedIn={logedIn}
          setLogedIn={setLogedIn}
          setUserId={setUserId}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login logedIn={logedIn} setLogedIn={setLogedIn} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/createpost" element={<CreatePost userId={userId} />} />
          <Route path="/posts/:id" element={<PostPage userId={userId} />} />
        </Routes>
      </UserAuthContext.Provider>
    </div>
  );
}

export default App;
