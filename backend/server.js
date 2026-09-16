const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const books = [
  {
    id: 1,
    title: "The Hobbit",
    author: "J.R.R. Tolkien"
  },
  {
    id: 2,
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

app.delete("/books/:id", function(req, res) {
  const bookId = Number(req.params.id);

  const bookIndex = books.findIndex(function(book) {
    return book.id === bookId;
  });

  if (bookIndex === -1) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  const deletedBook = books.splice(bookIndex, 1);

  res.json(deletedBook[0]);
});

app.put("/books/:id", function(req, res) {

    const bookId = Number(req.params.id);

  const book = books.find(function(book) {
    return book.id === bookId;
  });

  if (!book) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  book.title = req.body.title;
  book.author = req.body.author;

  res.json(book);
});

app.listen(PORT, function() {
  console.log("StoryTime backend running on http://localhost:" + PORT);
});