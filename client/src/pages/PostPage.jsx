/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Comment from "../components/Comment";

function PostPage({ userId }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [modified, setModified] = useState(false);
  const [comments, setComments] = useState([]);
  const inputRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      text: inputRef.current.value,
      author: userId,
      postId: id,
    };

    const res = axios
      .post("http://localhost:3500/comments/addcomment", payload, {
        withCredentials: true,
      })
      .then((data) => {
        setModified(!modified);
        inputRef.current.value = "";
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:3500/posts/allowed", { withCredentials: true })
      .then((res) => console.log(res))
      .catch((e) => {
        console.log(e.message);
        navigate("/login");
      });
  }, []);

  useEffect(() => {
    console.log("posts");
    const res = axios
      .get("http://localhost:3500/posts/" + id, {
        withCredentials: true,
      })
      .then((data) => {
        setPost(data.data);
        // console.log(data.data);
      });
  }, []);
  useEffect(() => {
    console.log("comments");
    const res = axios
      .get(
        "http://localhost:3500/comments/" + id,

        {
          withCredentials: true,
        }
      )
      .then((data) => {
        setComments(data.data);
        console.log(data.data);
        // console.log(data.data);
      });
  }, [modified]);

  return (
    <div className="mt-4">
      <h1 className="text-xl font-semibold mb-2">{post?.title}</h1>
      <span className="flex gap-2">
        <span className=" text-sm font-semibold">{post?.author?.username}</span>
        <span className=" text-sm">{post?.createdAt?.slice(0, 10)}</span>
      </span>
      <img className="w-full object-cover mb-4" src={post?.image} alt="image" />
      <p className=" text-base">{post?.content}</p>

      <form className="flex gap-1 w-full mt-3 " onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="comment.."
          className="bg-slate-100 w-[89%] text-sm p-2 rounded-sm"
        />
        <button className="bg-slate-400 text-sm text-white p-1 rounded-sm">
          send
        </button>
      </form>

      <div className="w-full bg-slate-100 p-2 mt-4 mb-4 ">
        <h2 className="font-semibold">Comment :</h2>
        {/* <Comment />
         */}
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            id={comment._id}
            text={comment.text}
            author={comment.author.username}
            iiiid={comment.author._id}
            userId={userId}
            setComments={setComments}
            comments={comments}
          />
        ))}
      </div>
    </div>
  );
}

export default PostPage;
