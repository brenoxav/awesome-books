const booksWrapper = document.querySelector('.books-wrapper');
const titleInput = document.querySelector('#new-book-title');
const authorInput = document.querySelector('#new-book-author');
const addBtn = document.querySelector('.add-btn');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Library {
  constructor(){
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
    return this.books;
  }

  removeBook(id) {
    this.books = this.books.filter((book, index) => index !== id);
    return this.books;
  }

  getBooks() {
    return this.books;
  }

}

let book1 = new Book('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari');
let book2 = new Book('Homo Deus', 'Yuval Noah Harari');

let library = new Library;

library.addBook(book1);
library.addBook(book2);

console.log(library.books);

function setStorage(libraryArr) {
  localStorage.setItem('library', JSON.stringify(libraryArr));
}

function getStorage() {
  books = JSON.parse(localStorage.getItem('library'));
}

function checkStorage() {
  if (localStorage.length > 0) {
    getStorage();
  } else {
    setStorage();
  }
}

// function addBook(title, author) {
//   const newBook = {
//     title,
//     author,
//   };

//   books.push(newBook);
//   setStorage();
//   renderBooks(books);// eslint-disable-line
// }

// function removeBook(id) {
//   books.splice(id, 1);
//   setStorage();
//   renderBooks(books);// eslint-disable-line
// }

function renderBooks(arr) {
  booksWrapper.innerHTML = '';
  arr.forEach((book, index) => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');

    const bookTitle = document.createElement('p');
    bookTitle.textContent = book.title;
    bookTitle.classList.add('book-title');

    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('book-author');
    bookAuthor.textContent = book.author;

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = 'Remove';
    removeBtn.setAttribute('data-id', index);

    removeBtn.addEventListener('click', () => {
      const bookId = index;
      library.removeBook(bookId);
      renderBooks(library.getBooks());
    });

    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(bookAuthor);
    bookDiv.appendChild(removeBtn);

    booksWrapper.appendChild(bookDiv);
  });
}

addBtn.addEventListener('click', () => {
  const newBookTitle = titleInput.value;
  const newBookAuthor = authorInput.value;
  library.addBook(new Book(newBookTitle, newBookAuthor));
  titleInput.value = '';
  authorInput.value = '';
  renderBooks(library.getBooks());
});

//checkStorage();
renderBooks(library.getBooks());
