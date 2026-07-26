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

//array for storing books added
const books = [];


// This code shows what happens when form is submitted
  bookForm.addEventListener("submit", function(event) {
  event.preventDefault();

const newBook = {
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
  bookList.innerHTML = "";

  //Loop for adding book titles to page
  books.forEach(function(book) {
    bookList.innerHTML += '<div class="book-card">' + "<br>" + "Title: " + book.title + "<br>" + "Author: " + book.author + "<br>" + "Pages: " + book.pages + "<br>" + "Reading Status: " + book.readingStatus + "<br>" + "</div>";

});

  console.log(newBook);
  console.log("Book submitted");
  console.log(books);
});