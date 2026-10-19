const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

const db = require("./database");

const corsOptions = {
  origin: [
    "http://localhost:8080",
    "https://zackbrisson.github.io"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", function(req, res) {
  res.send("StoryTime API is running");
});

app.get("/books", function(req, res) {
  db.all("SELECT * FROM books", function(error, rows) {
    if (error) {
      return res.status(500).json({
        message: "Could not load books"
      });
    }

    res.json(rows);
  });
});

app.post("/books", function(req, res) {
  const {
    title,
    author,
    genre,
    subGenre,
    bookCover,
    series,
    readingStatus,
    pages
  } = req.body;

if (!title || !author) {
  return res.status(400).json({
    message: "Title and author are required"
  });
}

  db.run(
    `
    INSERT INTO books (
      title,
      author,
      genre,
      sub_genre,
      book_cover,
      series,
      reading_status,
      pages
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      title,
      author,
      genre,
      subGenre,
      bookCover,
      series,
      readingStatus,
      pages
    ],
    function(error) {
      if (error) {
        return res.status(500).json({
          message: "Could not add book"
        });
      }

      res.json({
        id: this.lastID,
        title,
        author,
        genre,
        subGenre,
        bookCover,
        series,
        readingStatus,
        pages
      });
    }
  );
});

app.delete("/books/:id", function(req, res) {
  const bookId = Number(req.params.id);

  db.run(
    "DELETE FROM books WHERE id = ?",
    [bookId],
    function(error) {
      if (error) {
        return res.status(500).json({
          message: "Could not delete book"
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          message: "Book not found"
        });
      }

      res.json({
        message: "Book deleted",
        id: bookId
      });
    }
  );
});

app.put("/books/:id", function(req, res) {
  const bookId = Number(req.params.id);

  const {
    title,
    author,
    genre,
    subGenre,
    bookCover,
    series,
    readingStatus,
    pages
  } = req.body;

  if (!title || !author) {
  return res.status(400).json({
    message: "Title and author are required"
  });
}

  db.run(
    `
    UPDATE books
    SET
      title = ?,
      author = ?,
      genre = ?,
      sub_genre = ?,
      book_cover = ?,
      series = ?,
      reading_status = ?,
      pages = ?
    WHERE id = ?
    `,
    [
      title,
      author,
      genre,
      subGenre,
      bookCover,
      series,
      readingStatus,
      pages,
      bookId
    ],
    function(error) {
      if (error) {
        return res.status(500).json({
          message: "Could not update book"
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          message: "Book not found"
        });
      }

      res.json({
        id: bookId,
        title,
        author,
        genre,
        subGenre,
        bookCover,
        series,
        readingStatus,
        pages
      });
    }
  );
});

app.listen(PORT, function() {
  console.log("StoryTime backend running on http://localhost:" + PORT);
});