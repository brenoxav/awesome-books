const booksWrapper = document.querySelector('.books-wrapper');
const titleInput = document.querySelector('#new-book-title');
const authorInput = document.querySelector('#new-book-author');
const addBtn = document.querySelector('.add-btn');

let books = [
  {
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
  },
  {
    title: 'Homo Deus',
    author: 'Yuval Noah Harari',
  },
];

function setStorage() {
  localStorage.setItem('books', JSON.stringify(books));
}

function getStorage() {
  books = JSON.parse(localStorage.getItem('books'));
}

function updateStorage() {
  if (localStorage.length > 0) {
    getStorage();
  } else {
    setStorage();
  }
}

function addBook(title, author) {
  const newBook = {
    title,
    author,
  };

  books.push(newBook);
  setStorage();
  renderBooks(books);// eslint-disable-line
}

function removeBook(id) {
  books.splice(id, 1);
  setStorage();
  renderBooks(books);// eslint-disable-line
}

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
      removeBook(bookId);
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
  addBook(newBookTitle, newBookAuthor);
  titleInput.value = '';
  authorInput.value = '';
});

updateStorage();
renderBooks(books);
