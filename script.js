const bookForm = document.getElementById("book-form");
const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const pagesInput = document.getElementById("pages-input");
const genreInput = document.getElementById("genre-input");
const subGenreInput = document.getElementById("sub-genre-input");
const bookCoverInput = document.getElementById("book-cover-input");
const seriesInput = document.getElementById("series-input");
const readingStatusInput = document.getElementById("reading-status-input");
const bookList = document.getElementById("book-list");

// array for storing books added
let books = [];

// This function displays all books on the page
function renderBooks() {
  bookList.innerHTML = "";

  books.forEach(function(book) {
    bookList.innerHTML +=
      '<div class="book-card">' +
      "<br>" +
      "Title: " + book.title + "<br>" +
      "Author: " + book.author + "<br>" +
      "Pages: " + book.pages + "<br>" +
      "Genre: " + book.genre + "<br>" +
      "Sub Genre: " + book.subGenre + "<br>" +
      "Book Cover: " + book.bookCover + "<br>" +
      "Series: " + book.series + "<br>" +
      "Reading Status: " + book.readingStatus + "<br>" +
      '<button class="delete-button" data-id="' + book.id + '">Delete</button>' +
      "</div>";
  });
}

// This code runs when the form is submitted
bookForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const newBook = {
    id: Date.now(),
    title: titleInput.value,
    author: authorInput.value,
    pages: pagesInput.value,
    genre: genreInput.value,
    subGenre: subGenreInput.value,
    bookCover: bookCoverInput.value,
    series: seriesInput.value,
    readingStatus: readingStatusInput.value
  };

  books.push(newBook);

  renderBooks();

  bookForm.reset();
});

// This code runs when a Delete button is clicked
bookList.addEventListener("click", function(event) {
  if (event.target.classList.contains("delete-button")) {
    const bookId = Number(event.target.dataset.id);

    books = books.filter(function(book) {
      return book.id !== bookId;
    });

    renderBooks();
  }
});