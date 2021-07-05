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
}

function removeBook(title){
    const newArray = books.filter(function(book) {
        return book.title != title
    })
    books = newArray
}