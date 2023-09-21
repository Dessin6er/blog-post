/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";

import axios from "axios";
import { Navigate } from "react-router-dom";

function Login({ setLogedIn, logedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3500/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setLogedIn(!logedIn);
      setRedirect(true);
    } catch (error) {
      setRedirect(false);
      alert(error.message);
    }
  };

  if (redirect) return <Navigate to={"/"} />;
  return (
    <div>
      <div className=" ">
        <h1 className="font-semibold text-2xl text-center mb-4 mt-8">Login</h1>
        <form
          method="post"
          className="lg:w-[70%] mx-auto  w-full  flex  flex-col gap-2 "
          onSubmit={(e) => loginUser(e)}
        >
          <input
            className="outline-none text-black p-2  border-2 border-b-slate-600  rounded-sm"
            type="text"
            name="username"
            id=""
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className=" outline-none text-black p-2 border-2 border-b-slate-600  rounded-sm"
            type="password"
            name="password"
            id=""
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-black mt-4 text-white py-2 rounded-sm">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
