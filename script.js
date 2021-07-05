const booksWrapper = document.querySelector('.books-wrapper');
const titleInput = document.querySelector('#new-book-title');
const authorInput = document.querySelector('#new-book-author');
const addBtn = document.querySelector('.add-btn');
const removeBtn = document.querySelector('.remove-btn')


let books = [
    {
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari"
    },
    {
        title: "Homo Deus",
        author: "Yuval Noah Harari"
    }
]

function addBook(title, author) {
    let newBook = {
        title: title,
        author: author
    }

    books.push(newBook)
    renderBooks(books);
}

function removeBook(id) {
    books.splice(id, 1)
    renderBooks(books);
}

function renderBooks(arr) {
    booksWrapper.innerHTML = '';
    arr.forEach(function (book, index) {
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
        removeBtn.setAttribute('data-id', index)

        removeBtn.addEventListener('click', function() {
            const bookId = index
            removeBook(bookId)

        });

        bookDiv.appendChild(bookTitle);
        bookDiv.appendChild(bookAuthor);
        bookDiv.appendChild(removeBtn);

        booksWrapper.appendChild(bookDiv);
    });
}

addBtn.addEventListener('click', function () {
    const newBookTitle = titleInput.value;
    const newBookAuthor = authorInput.value;
    addBook(newBookTitle, newBookAuthor);
    titleInput.value = '';
    authorInput.value = '';
});

renderBooks(books);