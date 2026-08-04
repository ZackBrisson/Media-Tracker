const bookForm = document.getElementById("book-form");
const submitButton = bookForm.querySelector("button");
const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const pagesInput = document.getElementById("pages-input");
const genreInput = document.getElementById("genre-input");
const subGenreInput = document.getElementById("sub-genre-input");
const bookCoverInput = document.getElementById("book-cover-input");
const seriesInput = document.getElementById("series-input");
const readingStatusInput = document.getElementById("reading-status-input");
const bookList = document.getElementById("book-list");
const searchInput = document.getElementById("search-input");
const statusFilter = document.getElementById("status-filter");


// array for storing books added
let books = [];

let editingBookId = null;

// function used to search books
function applyFilters() {
  const searchText = searchInput.value.toLowerCase();
  const selectedStatus = statusFilter.value;

  const filteredBooks = books.filter(function(book) {
    const matchesSearch =
      book.title.toLowerCase().includes(searchText) ||
      book.author.toLowerCase().includes(searchText);

    const matchesStatus =
      selectedStatus === "All" || book.readingStatus === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  renderBooks(filteredBooks);
}

// function used to store books
function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

// function used to load books
function loadBooks() {
  const savedBooks = localStorage.getItem("books");

  if (savedBooks) {
    books = JSON.parse(savedBooks);
  }
}

searchInput.addEventListener("input", applyFilters);

statusFilter.addEventListener("change", applyFilters);

// This function displays all books on the page
function renderBooks(booksArray) {
  bookList.innerHTML = "";
  
 if (booksArray.length === 0) {
    bookList.innerHTML = "<p>No books found.</p>";
    return;
  }

  booksArray.forEach(function(book) {
    bookList.innerHTML +=
  '<div class="book-card">' +
    '<h3>' + book.title + '</h3>' +
    '<p><strong>Author:</strong> ' + book.author + '</p>' +
    '<p><strong>Pages:</strong> ' + book.pages + '</p>' +
    '<p><strong>Genre:</strong> ' + book.genre + '</p>' +
    '<p><strong>Sub Genre:</strong> ' + book.subGenre + '</p>' +
    (book.bookCover
  ? '<img class="book-cover" src="' + book.bookCover + '" alt="Cover for ' + book.title + '">'
  : ''
) +
    '<p><strong>Series:</strong> ' + book.series + '</p>' +
    '<p><strong>Reading Status:</strong> ' + book.readingStatus + '</p>' +

    '<select class="status-select" data-id="' + book.id + '">' +
      '<option value="Not Read"' + (book.readingStatus === "Not Read" ? " selected" : "") + '>Not Read</option>' +
      '<option value="Reading"' + (book.readingStatus === "Reading" ? " selected" : "") + '>Reading</option>' +
      '<option value="Read"' + (book.readingStatus === "Read" ? " selected" : "") + '>Read</option>' +
    '</select>' +

    '<button class="delete-button" data-id="' + book.id + '">Delete</button>' + '<button class="edit-button" data-id="' + book.id + '">Edit</button>' +
  '</div>';
  });
}

// This code runs when the form is submitted
bookForm.addEventListener("submit", function(event) {
  event.preventDefault();

  if (editingBookId === null) {
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
} else {
  const bookToUpdate = books.find(function(book) {
    return book.id === editingBookId;
  });

  bookToUpdate.title = titleInput.value;
  bookToUpdate.author = authorInput.value;
  bookToUpdate.pages = pagesInput.value;
  bookToUpdate.genre = genreInput.value;
  bookToUpdate.subGenre = subGenreInput.value;
  bookToUpdate.bookCover = bookCoverInput.value;
  bookToUpdate.series = seriesInput.value;
  bookToUpdate.readingStatus = readingStatusInput.value;

  editingBookId = null;
}

saveBooks();
applyFilters();
bookForm.reset();
submitButton.textContent = "Add Book";
});

// Event for dropdown menu for reading status changes in the Card
bookList.addEventListener("change", function(event) {
  if (event.target.classList.contains("status-select")) {
   const bookId = Number(event.target.dataset.id);
const newStatus = event.target.value;

const bookToUpdate = books.find(function(book) {
  return book.id === bookId;
});

bookToUpdate.readingStatus = newStatus;

saveBooks();

applyFilters();

  }
});

// This code runs when a Delete/Edit button is clicked
bookList.addEventListener("click", function(event) {
  if (event.target.classList.contains("delete-button")) {
    const bookId = Number(event.target.dataset.id);

  
    books = books.filter(function(book) {
      return book.id !== bookId;
    });
    
    applyFilters();

    saveBooks();
  }

  if (event.target.classList.contains("edit-button")) {
  const bookId = Number(event.target.dataset.id);

  const bookToEdit = books.find(function(book) {
    return book.id === bookId;
  });

  titleInput.value = bookToEdit.title;
  authorInput.value = bookToEdit.author;
  pagesInput.value = bookToEdit.pages;
  genreInput.value = bookToEdit.genre;
  subGenreInput.value = bookToEdit.subGenre;
  bookCoverInput.value = bookToEdit.bookCover;
  seriesInput.value = bookToEdit.series;
  readingStatusInput.value = bookToEdit.readingStatus;

  editingBookId = bookId;
  submitButton.textContent = "Update Book";
}
});

loadBooks();
applyFilters();