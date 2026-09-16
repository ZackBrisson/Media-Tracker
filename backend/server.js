const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = 5000;

app.get("/", function(req, res) {
  res.send("StoryTime API is running");
});

app.get("/books", function(req, res) {
  res.json([
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien"
    },
    {
      title: "Dune",
      author: "Frank Herbert"
    }
  ]);
});

app.listen(PORT, function() {
  console.log("StoryTime backend running on http://localhost:" + PORT);
});