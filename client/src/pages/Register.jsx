/* eslint-disable no-unused-vars */
import { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3500/auth/register", {
        username,
        password,
      });
      alert("new user added ");
      setUsername("");
      setPassword("");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div>
      <div className=" ">
        <h1 className="font-semibold text-2xl text-center mb-4 mt-8">
          Register
        </h1>
        <form
          method="post"
          className="  w-full lg:w-[70%] mx-auto flex  flex-col gap-2 "
          onSubmit={(e) => registerUser(e)}
        >
          <input
            className="outline-none text-black p-2  border-2  border-b-black rounded-sm"
            type="text"
            name="username"
            id=""
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className=" outline-none text-black p-2 border-2 border-b-black rounded-sm"
            type="password"
            name="password"
            id=""
            value={password}
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="bg-black mt-4 text-white py-2 rounded-sm">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
