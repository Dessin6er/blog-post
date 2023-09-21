/* eslint-disable no-unused-vars */

import axios from "axios";
import { useState } from "react";

/* eslint-disable react/prop-types */
function Comment({ author, text, id, iiiid, userId, setComments, comments }) {
  const handleDelete = (req, res) => {
    try {
      if (iiiid === userId) {
        const res = axios
          .delete("http://localhost:3500/comments/" + id, {
            withCredentials: true,
          })
          .then((data) => {
            console.log(res);
            const newc = comments.filter((c) => c._id !== id);
            setComments(newc);
            alert("item deleted");
          });
      } else {
        alert("not authorized");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="flex gap-2 text-[14px] p-1 my-2 bg-white rounded-sm">
      <span className="font-semibold w-[8%]">{author}</span>
      <span className="w-[90%]  ">{text}</span>
      <span className=" font-semibold cursor-pointer " onClick={handleDelete}>
        x
      </span>
    </div>
  );
}

export default Comment;
