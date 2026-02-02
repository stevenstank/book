const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const libraryDisplay = document.getElementById('libraryDisplay');
    libraryDisplay.innerHTML = '';

    if (myLibrary.length === 0) {
        libraryDisplay.innerHTML = `
            <div class="empty-state">
                <h2>Your library is empty</h2>
                <p>Click the "New Book" button to add your first book!</p>
            </div>
        `;
        return;
    }

    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.dataset.bookId = book.id;

        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <div class="book-info">
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Pages:</strong> ${book.pages}</p>
            </div>
            <span class="read-status ${book.read ? 'read' : 'not-read'}">
                ${book.read ? '✓ Read' : '✗ Not Read'}
            </span>
            <div class="card-buttons">
                <button class="btn ${book.read ? 'btn-warning' : 'btn-success'} toggle-read-btn">
                    ${book.read ? 'Mark Unread' : 'Mark Read'}
                </button>
                <button class="btn btn-danger remove-btn">Remove</button>
            </div>
        `;

        libraryDisplay.appendChild(bookCard);
    });
}

function removeBook(bookId) {
    const index = myLibrary.findIndex(book => book.id === bookId);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
    }
}

function toggleBookRead(bookId) {
    const book = myLibrary.find(book => book.id === bookId);
    if (book) {
        book.toggleRead();
        displayBooks();
    }
}

const newBookBtn = document.getElementById('newBookBtn');
const bookDialog = document.getElementById('bookDialog');
const bookForm = document.getElementById('bookForm');
const cancelBtn = document.getElementById('cancelBtn');

newBookBtn.addEventListener('click', () => {
    bookDialog.showModal();
});

cancelBtn.addEventListener('click', () => {
    bookDialog.close();
    bookForm.reset();
});

bookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value);
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read);

    bookDialog.close();
    bookForm.reset();
});

document.getElementById('libraryDisplay').addEventListener('click', (event) => {
    const bookCard = event.target.closest('.book-card');
    if (!bookCard) return;

    const bookId = bookCard.dataset.bookId;

    if (event.target.classList.contains('remove-btn')) {
        removeBook(bookId);
    } else if (event.target.classList.contains('toggle-read-btn')) {
        toggleBookRead(bookId);
    }
});

addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, false);
addBookToLibrary('1984', 'George Orwell', 328, true);
