import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
function Post({ image, title, content, authorName, createdAt, postId }) {
  const navigate = useNavigate();
  let summary = "";
  content.length > 200
    ? (summary = content.slice(0, 200) + ". . .")
    : (summary = content);

  return (
    <div
      onClick={() => navigate("/posts/" + postId)}
      className="flex gap-4 my-4 lg:my-6 cursor-pointer shadow-md  shadow-slate-500/20 hover:shadow-slate-500/50 duration-400 transition-all"
    >
      <img src={image} alt="image" className="min-w-[50%]" />
      <div>
        <h2 className="sm:text-xl ld:text-2xl  leading-7 font-semibold">
          {title}
        </h2>
        <p className="text-xs flex gap-3">
          <span>{"" + createdAt.split(":")[0].slice(0, -3)}</span>
          <span className="font-semibold">{authorName}</span>
        </p>
        <p className="text-sm lg:text-base mt-2 leading-5">{summary}</p>
      </div>
    </div>
  );
}

export default Post;
