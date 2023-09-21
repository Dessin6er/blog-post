/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function CreatePost({ userId }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setcontent] = useState("");
  const fileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3500/posts/allowed", { withCredentials: true })
      .then((res) => console.log(res))
      .catch((e) => {
        console.log(e.message);
        navigate("/login");
      });
  }, []);

  const registerPost = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      content,
      image: selectedImage,
      author: userId,
    };
    try {
      const res = await axios.post(
        "http://localhost:3500/posts/registerpost",
        payload,
        { withCredentials: true }
      );

      alert("new post created");
    } catch (error) {
      if (error.response) {
        console.log("Response data:", error.response.data);
      } else {
        console.log("Error:", error.message);
      }
    }
  };

  const handleFileInputChange = () => {
    if (fileRef.current) {
      const file = fileRef.current.files[0];
      if (file) {
        console.log("Selected file:", file);
        // Do something with the selected file, such as uploading it to a server.
        const reader = new FileReader();

        reader.onload = (e) => {
          setSelectedImage(e.target.result);
        };

        reader.readAsDataURL(file);
      }
    }
  };
  // console.log(content);

  return (
    <div>
      <h2 className="mb-4 text-center leading-8 font-semibold text-xl">
        Create New Post
      </h2>
      <form
        className="flex flex-col lg:w-[70%] mx-auto "
        onSubmit={registerPost}
      >
        <label htmlFor="title" className="mt-3 mb-1">
          title
        </label>
        <input
          className="bg-slate-200 font-semibold rounded-sm p-2 "
          placeholder=""
          type="text"
          name="title"
          id=""
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="content" className="mt-3 mb-1">
          content
        </label>
        <textarea
          className="bg-slate-200  rounded-sm p-2"
          name=""
          id=""
          cols="30"
          rows="10"
          onChange={(e) => setcontent(e.target.value)}
        ></textarea>

        <label htmlFor="image" className="mt-3 mb-1">
          image
        </label>
        <div className="flex">
          <input
            ref={fileRef}
            onChange={handleFileInputChange}
            type="file"
            name="image"
            id=""
            className="   cursor-pointer block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-slate-200 file:text-slate-700 file:cursor-pointer
                        hover:file:bg-slate-100
                        "
          />
          {selectedImage !== null ? (
            <>
              <img src={selectedImage} alt="" className="w-[50%]" />
            </>
          ) : null}
        </div>

        <button
          type="submit"
          className="mt-4 py-2 bg-slate-900 text-white font-semibold rounded-sm"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
