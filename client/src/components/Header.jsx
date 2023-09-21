/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header({ logedIn, setLogedIn, setUserId, userId }) {
  const [username, setUsername] = useState(null);

  const handleLogout = async () => {
    const res = await axios.get("http://localhost:3500/auth/logout", {
      withCredentials: true,
    });

    setLogedIn(!logedIn);
  };

  const verifyAuth = async () => {
    try {
      const res = await axios.get("http://localhost:3500/auth/profile", {
        withCredentials: true,
      });
      if (res.status === 200) {
        setUsername(res.data.username);
        setUserId(res.data.id);
      } else {
        setUsername(null);
      }

      // console.log(res);
    } catch (error) {
      setUsername(null);
      if (error.response) {
        console.log("Response data:", error.response.data.error);
      } else {
        console.log("Error:", error.message);
      }
    }
  };
  // console.log(username);
  useEffect(() => {
    verifyAuth();
  }, [logedIn]);

  return (
    <div className="flex items-center bg-white justify-between h-16">
      <div className="text-xl font-semibold">
        {username === null ? (
          <Link to="/">MyBlog</Link>
        ) : (
          <Link to="/">{`${username} `}Blog</Link>
        )}
      </div>
      <div className=" flex justify-end gap-4 w-[50%]">
        {username === null ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link
              to="/createpost"
              className="text-2xl text-white bg-slate-500 duration-300 transition-all hover:bg-slate-400 w-[30px] h-[30px] rounded-full flex justify-center"
            >
              +
            </Link>
            <Link to="/login" onClick={handleLogout}>
              logout
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
