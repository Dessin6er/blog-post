const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {
  registerUser,
  loginUser,
  logoutUser,
  profile,
  getUser,
} = require("./controller/userAuthController");
const { registerPost, getPosts } = require("./controller/postController");

const app = express();
const dbUrl = "mongodb://127.0.0.1/blogDB";

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cookieParser());

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// app.post("/register", registerUser);
// app.post("/login", loginUser);
// app.post("/registerpost", registerPost);
// app.get("/posts", getPosts);
// app.get("/logout", logoutUser);
// app.get("/profile", profile);
// app.get("/users/:id", getUser);

// routes
// app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/Auth"));
app.use("/posts", require("./routes/postRoutes"));
app.use("/comments", require("./routes/commentRout"));

app.all("*", (req, res) => {
  res.status(404);

  res.send("404");
});

app.listen(3500, () => {
  console.log("server listening on port 3500...");
});
