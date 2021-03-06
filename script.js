/* eslint-disable max-classes-per-file */
const { DateTime } = luxon; // eslint-disable-line

const listPageLink = document.querySelector('.list-page-link');
const addPageLink = document.querySelector('.add-page-link');
const contactPageLink = document.querySelector('.contact-page-link');

const listPage = document.querySelector('.list-page');
const addPage = document.querySelector('.add-page');
const contactPage = document.querySelector('.contact-page');

const booksWrapper = document.querySelector('.books-wrapper');
const titleInput = document.querySelector('#new-book-title');
const authorInput = document.querySelector('#new-book-author');
const addBtn = document.querySelector('.add-btn');

const currentTime = document.querySelector('.current-time');
const dt = DateTime.now();

currentTime.textContent = dt.toLocaleString(DateTime.DATETIME_MED);

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Library {
  constructor(booksArr = []) {
    this.books = booksArr;
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

const book1 = new Book('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari');
const book2 = new Book('Homo Deus', 'Yuval Noah Harari');

let library = new Library();

library.addBook(book1);
library.addBook(book2);

function setStorage(libraryArr) {
  localStorage.setItem('library', JSON.stringify(libraryArr));
}

function getStorage() {
  const libraryArr = JSON.parse(localStorage.getItem('library'));
  const localLibrary = libraryArr.map((book) => new Book(book.title, book.author));
  library = new Library(localLibrary);
}

function checkStorage() {
  if (localStorage.length > 0) {
    getStorage();
  } else {
    setStorage(library.getBooks());
  }
}

function renderBooks(arr) {
  booksWrapper.innerHTML = '';
  arr.forEach((book, index) => {
    const bookRow = document.createElement('tr');
    bookRow.classList.add('book');
    const bookTitle = document.createElement('td');
    bookTitle.textContent = `"${book.title}" by ${book.author}`;
    const btnWrapper = document.createElement('td');
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('btn', 'btn-sm', 'btn-danger');
    removeBtn.textContent = 'Remove';
    removeBtn.setAttribute('data-id', index);

    removeBtn.addEventListener('click', () => {
      const bookId = index;
      library.removeBook(bookId);
      renderBooks(library.getBooks());
      setStorage(library.getBooks());
    });

    btnWrapper.appendChild(removeBtn);
    bookRow.appendChild(bookTitle);
    bookRow.appendChild(btnWrapper);
    booksWrapper.appendChild(bookRow);
  });
}

addBtn.addEventListener('click', () => {
  const newBookTitle = titleInput.value;
  const newBookAuthor = authorInput.value;
  library.addBook(new Book(newBookTitle, newBookAuthor));
  titleInput.value = '';
  authorInput.value = '';
  renderBooks(library.getBooks());
  setStorage(library.getBooks());
});

function displayPage(currentPage) {
  if (currentPage.classList.contains('d-none')) {
    currentPage.classList.remove('d-none');
    switch (currentPage) {
      case listPage:
        addPage.classList.add('d-none');
        contactPage.classList.add('d-none');
        break;
      case addPage:
        listPage.classList.add('d-none');
        contactPage.classList.add('d-none');
        break;
      case contactPage:
        addPage.classList.add('d-none');
        listPage.classList.add('d-none');
        break;
      default:
        break;
    }
  }
}

listPageLink.addEventListener('click', () => displayPage(listPage));
addPageLink.addEventListener('click', () => displayPage(addPage));
contactPageLink.addEventListener('click', () => displayPage(contactPage));

checkStorage();
renderBooks(library.getBooks());
