import { useEffect, useState } from "react";
import Post from "../components/Post";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3500/posts/")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((e) => console.log(e));
  }, []);
  console.log(posts);
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post._id}
          postId={post._id}
          image={post.image}
          title={post.title}
          content={post.content}
          authorName={post.author.username}
          createdAt={post.createdAt}
        />
      ))}
    </div>
  );
}

export default Home;
