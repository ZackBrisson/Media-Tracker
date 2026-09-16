const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const books = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien"
  },
  {
    title: "Dune",
    author: "Frank Herbert"
  }
];

app.get("/", function(req, res) {
  res.send("StoryTime API is running");
});

app.get("/books", function(req, res) {
  res.json(books);
});

app.post("/books", function(req, res) {
  const newBook = req.body;

  books.push(newBook);

  res.json(newBook);
});

app.listen(PORT, function() {
  console.log("StoryTime backend running on http://localhost:" + PORT);
});