const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./storytime.db", function(error) {
  if (error) {
    console.error("Database connection failed:", error.message);
  } else {
    console.log("Connected to StoryTime database");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    genre TEXT,
    sub_genre TEXT,
    book_cover TEXT,
    series TEXT,
    reading_status TEXT,
    pages INTEGER
  )
`, function(error) {
  if (error) {
    console.error("Could not create books table:", error.message);
  } else {
    console.log("Books table is ready");
  }
});
module.exports = db;