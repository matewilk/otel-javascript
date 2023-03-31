// require opentelemetry tracing
const setupTracing = require("./otel/tracing");
// Set up tracing before the other imports
setupTracing();
const express = require("express");

// Create a new Express application
const app = express();
const PORT = process.env.PORT || 3000;

let posts = [];

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static("public"));

// Endpoint to fetch all posts
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

// Endpoint to create a new post
app.post("/api/posts", (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: Date.now(), title, content };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Endpoint to delete a post by ID
app.delete("/api/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter((post) => post.id !== postId);
  res.status(204).end();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
